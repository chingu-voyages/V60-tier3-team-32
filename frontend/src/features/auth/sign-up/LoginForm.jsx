import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = (values) => {
    const payload = {
      identifier: values.identifier,
      password: values.password,
    };
    setIsLoading(true);
    console.log(payload);
    setIsLoading(false);
  };

  return (
    <div className='mx-auto w-full max-w-2xl rounded-2xl border bg-background p-6'>
      <h1 className='text-2xl font-semibold mb-1'>Login to your Account</h1>
      <p className='text-muted-foreground text-sm mb-6'>
        Welcome back! Please login to your account to continue where you left
        off.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldLegend className='sr-only'>Login</FieldLegend>
          <FieldGroup>
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

        <Button
          type='submit'
          className='w-full mt-6 bg-violet-400'
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>

      <p className='text-center text-sm mt-6'>
        Don't have an account?{' '}
        <a
          href='/register'
          className='text-foreground font-medium hover:underline'
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
