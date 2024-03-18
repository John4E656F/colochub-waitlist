'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joinWaitlistFormResolver, type JoinWaitlistFormInputs } from './joinWaitlistFormResolver';

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);
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
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (response.ok) {
      setMessage(responseData.message);
    } else {
      responseData.error || 'An error occurred. Please try again.';
    }

    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} type='email' placeholder='Enter your email' required className='font-black text-black' />
        <button type='submit'>Join Waitlist</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}
