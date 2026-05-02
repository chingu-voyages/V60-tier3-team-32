import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  AccountCircleOutlined,
  EmailOutlined,
  LockOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
  LanguageOutlined,
  TranslateOutlined,
  DeleteOutlineOutlined,
  AddOutlined,
} from '@mui/icons-material';
import { useFieldArray, useForm, Controller, useWatch } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth, signUpThunk } from '@/features/auth';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import logo from '@/assets/Logo-Mobile.svg';

import { signUpSchema } from '../schema/signUpSchema';

import { LANGUAGES, FLUENCY_LEVELS } from '@/lib/constants/languages';

const defaultValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  nativeLanguage: '',
  learningLanguages: [{ language: '', level: '' }],
};

export default function SignUpForm() {
  const { register, loading, error } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'learningLanguages',
  });

  const nativeLanguage = useWatch({ control, name: 'nativeLanguage' });
  const learningLanguages = useWatch({ control, name: 'learningLanguages' });

  const selectedLearningCodes = new Set(
    (learningLanguages || []).map((item) => item?.language).filter(Boolean),
  );

  const handleNext = async () => {
    const valid = await trigger([
      'username',
      'email',
      'password',
      'confirmPassword',
    ]);

    if (valid) setStep(2);
  };
  const onSubmit = async (values) => {
    const payload = {
      username: values.username,
      email: values.email,
      password: values.password,
      native_language: values.nativeLanguage,
      learning_languages: values.learningLanguages,
    };
    // console.log('dispatch', payload);
    const res = await register(payload);
    // console.log('result', res);
    // console.log('Result payload:', res.payload);

    if (signUpThunk.fulfilled.match(res)) {
      reset();
      navigate('/dashboard');
    }
  };

  return (
    <div className='flex flex-col w-full max-w-2xl gap-10'>
      <div className='flex flex-col items-center gap-4'>
        <div>
          <img src={logo} alt='LinguaLoop' className='h-16 w-auto' />
        </div>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Create account
        </h1>
        <h2 className='text-center'>
          Welcome! Please fill in your details to start your journey
        </h2>
        <p className='text-sm text-gray-600'>Step {step} of 2</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && step === 1) {
            e.preventDefault();
            handleNext();
          }
        }}
        noValidate
      >
        {step === 1 && (
          <FieldSet>
            <FieldLegend className='sr-only'>Account details</FieldLegend>
            <FieldGroup>
              <Controller
                name='username'
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                    <div className='relative'>
                      <AccountCircleOutlined className='absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300' />
                      <Input
                        {...field}
                        id={field.name}
                        className='rounded-full pl-12'
                        placeholder='user123'
                        aria-invalid={fieldState.invalid}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/\s/g, ''))
                        }
                      />
                    </div>
                    <FieldDescription className='text-gray-400 pl-5'>
                      Enter a unique username between 3-12 characters.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError className='text-red-500'>
                        {fieldState.error?.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name='email'
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <div className='relative'>
                      <EmailOutlined className='absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300' />
                      <Input
                        {...field}
                        className='rounded-full pl-12'
                        id={field.name}
                        type='email'
                        placeholder='you@example.com'
                        aria-invalid={fieldState.invalid}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError className='text-red-500'>
                        {fieldState.error?.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name='password'
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <div className='relative'>
                      <LockOutlined className='absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300' />
                      <Input
                        {...field}
                        id={field.name}
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'
                        className='rounded-full pl-12 pr-10'
                        aria-invalid={fieldState.invalid}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword((prev) => !prev)}
                        className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-300'
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                      >
                        {showPassword ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError className='text-red-500'>
                        {fieldState.error?.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name='confirmPassword'
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm password
                    </FieldLabel>
                    <div className='relative'>
                      <LockOutlined className='absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300' />
                      <Input
                        {...field}
                        id={field.name}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Re-enter password'
                        className='rounded-full pl-14 pr-10'
                        aria-invalid={fieldState.invalid}
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-300'
                        aria-label={
                          showConfirmPassword
                            ? 'Hide confirm password'
                            : 'Show confirm password'
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError className='text-red-500'>
                        {fieldState.error?.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              className=' w-full mt-8 bg-indigo-600 text-gray-100'
              type='button'
              onClick={handleNext}
            >
              Next
            </Button>
            <p className='text-center text-sm'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='text-foreground font-medium text-indigo-700 hover:underline'
              >
                Login
              </Link>
            </p>
          </FieldSet>
        )}

        {/* FORM 2  */}
        {/* {step === 2 &&  */}

        {step === 2 && (
          <FieldSet>
            <FieldLegend className='sr-only'>Language profile</FieldLegend>
            <FieldGroup className='space-y-10'>
              <Controller
                name='nativeLanguage'
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='nativeLanguage'>
                      Native language
                    </FieldLabel>
                    <p className='text-sm text-gray-600'>
                      This will help match you with posts to correct.
                    </p>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id='nativeLanguage'
                        aria-invalid={fieldState.invalid}
                      >
                        <div className='flex items-center gap-2'>
                          <LanguageOutlined className='h-4 w-4' />
                          <SelectValue placeholder='Select a language' />
                        </div>
                      </SelectTrigger>
                      <SelectContent className='opacity-100 bg-white'>
                        {LANGUAGES.map((language) => (
                          <SelectItem key={language.code} value={language.code}>
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError className='text-red-500'>
                        {fieldState.error?.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />

              <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                  <div>
                    {/* <h3 className='text-sm md:text-base font-medium'>
                    Learning languages
                  </h3> */}
                    <p className='text-sm text-gray-600 mt-1'>
                      Add up to two languages you are studying.
                    </p>
                  </div>
                </div>

                {fields.map((item, index) => (
                  <div key={item.id} className='flex flex-col gap-4'>
                    <Controller
                      name={`learningLanguages.${index}.language`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Learning Language</FieldLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              id={`learning-language-${index}`}
                              aria-invalid={fieldState.invalid}
                            >
                              <div className='flex items-center gap-2'>
                                <TranslateOutlined />
                                <SelectValue placeholder='Select a language' />
                              </div>
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                              {LANGUAGES.map((language) => {
                                const selectedElsewhere =
                                  selectedLearningCodes.has(language.code) &&
                                  language.code !== field.value;

                                const isNative =
                                  language.code === nativeLanguage;

                                return (
                                  <SelectItem
                                    key={language.code}
                                    value={language.code}
                                    disabled={selectedElsewhere || isNative}
                                  >
                                    {language.label}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError className='text-red-500'>
                              {fieldState.error?.message}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name={`learningLanguages.${index}.level`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Proficiency Level</FieldLabel>
                          <div className='space-y-2'>
                            {FLUENCY_LEVELS.map((level) => (
                              <div
                                key={level.value}
                                className='flex items-center gap-3'
                              >
                                <input
                                  type='radio'
                                  id={`level-${index}-${level.value}`}
                                  value={level.value}
                                  checked={field.value === level.value}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    field.onChange(level.value);
                                  }}
                                  className='accent-black h-4 w-4 cursor-pointer'
                                />
                                <label
                                  htmlFor={`level-${index}-${level.value}`}
                                  className='text-sm cursor-pointer'
                                >
                                  {level.label}
                                </label>
                              </div>
                            ))}
                          </div>
                          {fieldState.invalid && (
                            <FieldError>{fieldState.error?.message}</FieldError>
                          )}
                        </Field>
                      )}
                    />
                    {fields.length > 1 && (
                      <div className='flex justify-end'>
                        <Button
                          type='button'
                          variant='outline'
                          onClick={() => remove(index)}
                        >
                          <DeleteOutlineOutlined className='mr-2 h-4 w-4' />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  type='button'
                  variant='outline'
                  className='w-full'
                  disabled={fields.length >= 2}
                  onClick={() => append({ language: '', level: '' })}
                >
                  <AddOutlined className='mr-2 h-4 w-4' />
                  Add language
                </Button>

                {typeof errors.learningLanguages?.message === 'string' && (
                  <FieldError className='text-red-500'>
                    {errors.learningLanguages.message}
                  </FieldError>
                )}
              </div>
            </FieldGroup>
            {/*           
              <Button
                type='button'
                variant='outline'
                onClick={() => setStep(1)}
              >
                Back
              </Button> */}
            <Button
              className='w-full mt-6 bg-indigo-600 text-gray-100'
              type='submit'
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading
                ? 'Creating account...'
                : 'Create account'}
            </Button>
          </FieldSet>
        )}
      </form>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
}
