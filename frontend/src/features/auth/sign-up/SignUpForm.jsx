//TODO: add color to errors
//FIXME: fix dropdown. temporary fix added bg color but positioning is also off.
//FIXME: choosing learning language change from dropdown to radio button

import { useMemo, useState } from 'react';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

import { signUpSchema } from './signUpSchema';
import { LANGUAGES, FLUENCY_LEVELS } from '@/lib/constants/languages';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const defaultValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  nativeLanguage: '',
  learningLanguages: [{ language: '', level: '' }],
};

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'learningLanguages',
  });

  const nativeLanguage = watch('nativeLanguage');
  const learningLanguages = watch('learningLanguages');

  const selectedLearningCodes = useMemo(() => {
    return new Set(
      (learningLanguages || []).map((item) => item?.language).filter(Boolean),
    );
  }, [learningLanguages]);

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
      nativeLanguage: values.nativeLanguage,
      learningLanguages: values.learningLanguages,
    };

    console.log('submit payload', payload);
  };

  return (
    <div className='mx-auto w-full max-w-2xl rounded-2xl border bg-background p-6 shadow-sm'>
      <div className='mb-6 space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Create account
        </h1>
        <h2>Welcome! Please fill in your details to start your journey</h2>
        <p className='text-sm text-muted-foreground'>Step {step} of 2</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6' noValidate>
        {step === 1 && (
          <FieldSet>
            <FieldLegend>Account details</FieldLegend>
            <FieldGroup>
              <Controller
                name='username'
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder='user123'
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      Enter a unique username between 3-12 characters.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
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
                    <Input
                      {...field}
                      id={field.name}
                      type='email'
                      placeholder='you@example.com'
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
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
                      <Input
                        {...field}
                        id={field.name}
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'
                        className='pr-10'
                        aria-invalid={fieldState.invalid}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword((prev) => !prev)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </button>
                    </div>
                    <FieldDescription>
                      TODO: add password requirements here
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
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
                      <Input
                        {...field}
                        id={field.name}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Re-enter password'
                        className='pr-10'
                        aria-invalid={fieldState.invalid}
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                        aria-label={
                          showConfirmPassword
                            ? 'Hide confirm password'
                            : 'Show confirm password'
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className='flex justify-end'>
              <Button
                className=' bg-violet-300'
                type='button'
                onClick={handleNext}
              >
                Next
              </Button>
            </div>
          </FieldSet>
        )}

        {step === 2 && (
          <FieldSet>
            <FieldLegend>Language profile</FieldLegend>
            <FieldGroup>
              <Controller
                name='nativeLanguage'
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='nativeLanguage'>
                      Native language
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id='nativeLanguage'
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder='Select your native language' />
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
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='text-base font-medium'>
                      Learning languages
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                      Add one or more languages you are studying.
                    </p>
                  </div>

                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => append({ language: '', level: '' })}
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    Add language
                  </Button>
                </div>

                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className='space-y-4 rounded-xl border p-4'
                  >
                    <Controller
                      name={`learningLanguages.${index}.language`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={`learning-language-${index}`}>
                            Language
                          </FieldLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              id={`learning-language-${index}`}
                              aria-invalid={fieldState.invalid}
                            >
                              <SelectValue placeholder='Select a language' />
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
                            <FieldError>{fieldState.error?.message}</FieldError>
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name={`learningLanguages.${index}.level`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={`learning-level-${index}`}>
                            Level
                          </FieldLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              id={`learning-level-${index}`}
                              aria-invalid={fieldState.invalid}
                            >
                              <SelectValue placeholder='Select your level' />
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                              {FLUENCY_LEVELS.map((level) => (
                                <SelectItem
                                  key={level.value}
                                  value={level.value}
                                >
                                  {level.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError>{fieldState.error?.message}</FieldError>
                          )}
                        </Field>
                      )}
                    />

                    {fields.length > 1 && (
                      <div className='flex justify-end'>
                        <Button type='button' onClick={() => remove(index)}>
                          <Trash2 className='mr-2 h-4 w-4' />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {typeof errors.learningLanguages?.message === 'string' && (
                  <FieldError>{errors.learningLanguages.message}</FieldError>
                )}
              </div>
            </FieldGroup>

            <div className='flex justify-between'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className='bg-violet-300'
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>
            </div>
          </FieldSet>
        )}
      </form>
    </div>
  );
}
