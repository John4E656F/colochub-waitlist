'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joinWaitlistFormResolver, type JoinWaitlistFormInputs } from './joinWaitlistFormResolver';

export default function Home() {
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<JoinWaitlistFormInputs>({
    resolver: joinWaitlistFormResolver,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = async (data: JoinWaitlistFormInputs) => {
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    reset(); // Reset form fields after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type='email' placeholder='Enter your email' required className='font-black text-black' />
      <button type='submit'>Join Waitlist</button>
    </form>
  );
}
