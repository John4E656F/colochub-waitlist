'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joinWaitlistFormResolver, type JoinWaitlistFormInputs } from './joinWaitlistFormResolver';
import waitlistImage from '@/assets/waitlist.svg';

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
    <div className='flex flex-col lg:flex-row justify-center items-center h-screen text-white font-white'>
      <div className='flex flex-col items-center max-w-lg gap-5 '>
        <div className='flex flex-col items-center gap-1'>
          <h2 className='text-brand-primary text-3xl lg:text-4xl font-medium'>ColocHub</h2>
          <h1 className='text-4xl text-center lg:text-5xl font-medium'>Join Our Exclusive Waitlist</h1>
        </div>
        <p className='text-center text-2xl'>Be the first to know when we launch and gain early access to our groundbreaking platform.</p>
        <form onSubmit={handleSubmit(onSubmit)} className='flex items-center'>
          <input {...register('email')} type='email' placeholder='Enter your email' required className='text-black p-2 rounded-l-lg ' />
          <button type='submit' className='p-2 bg-blue-500 text-white font-bold rounded-r-lg'>
            Join Waitlist
          </button>
        </form>
        {message && <p className='text-center mt-4'>{message}</p>}
      </div>
      <div className='max-w-lg'>
        <Image src={waitlistImage} width={500} height={500} alt='Picture of the author' />
      </div>
    </div>
  );
}
