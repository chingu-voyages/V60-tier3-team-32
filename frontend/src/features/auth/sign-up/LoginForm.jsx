import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/hooks/useAuth.js';
import { loginThunk } from '@/store/authSlice.js';

import { loginSchema } from './loginSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field';
import logo from '@/assets/Logo.png';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();

  const navigate = useNavigate();

  // console.log({ login, loading, error });

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    const result = await login({
      identifier: values.identifier,
      password: values.password,
    });
    if (loginThunk.fulfilled.match(result)) {
      reset();
      navigate('/dashboard');
    }
  };
  return (
    <div className='flex flex-col w-full max-w-2xl gap-16'>
      <div className='flex flex-col items-center gap-3'>
        <div>
          <img src={logo} alt='LinguaLoop' className='h-16 w-auto' />
        </div>
        <h1 className='text-2xl md:text-3xl font-semibold'>
          Login to your Account
        </h1>
        <p className='text-stone-600 text-sm md:text-xl mb-6 text-center'>
          Welcome back! Please login to your account to continue where you left
          off.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='md:text-base'>
        <FieldSet>
          <FieldLegend className='sr-only'>Login</FieldLegend>
          <FieldGroup className='space-y-7'>
            <Controller
              control={control}
              name='identifier'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='identifier'>
                    Email or Username
                  </FieldLabel>
                  <Input
                    {...field}
                    className='rounded-full'
                    id='identifier'
                    placeholder='you@example.com or @username'
                    autoComplete='username'
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError className='text-red-500'>
                      {fieldState.error?.message}
                    </FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name='password'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <div className='relative'>
                    <Input
                      {...field}
                      className='rounded-full'
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      autoComplete='current-password'
                      aria-invalid={fieldState.invalid}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-xs'
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className='flex justify-between items-center'>
                    {fieldState.invalid && (
                      <FieldError className='text-red-500'>
                        {fieldState.error?.message}
                      </FieldError>
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <Button
          type='submit'
          className='w-full mt-6 bg-indigo-600 text-gray-100'
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>

      <p className='text-center text-sm mb-24'>
        Don't have an account?{' '}
        <Link
          to='/sign-up'
          className='text-foreground font-medium text-indigo-700 hover:underline'
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
