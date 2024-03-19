'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joinWaitlistFormResolver, type JoinWaitlistFormInputs } from './joinWaitlistFormResolver';
import waitlistImage from '@/assets/waitlist.svg';
import logo from '@/assets/logo.svg';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('app');
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
  const onSubmit: SubmitHandler<JoinWaitlistFormInputs> = async (data) => {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);

    if (response.ok) {
      setMessage(t('home.emailSuccess')); // Success message from server
    } else {
      if (responseData.error === 'Exist') {
        setMessage(t('home.emailAlreadyExist'));
      } else {
        setMessage(t('home.emailFailed'));
      }
    }

    reset(); // Reset form fields after submission
  };

  return (
    <div className='flex flex-col lg:flex-row justify-center items-center h-screen text-white font-white '>
      <div className='flex flex-col items-center max-w-lg gap-5 '>
        <div className='flex flex-col items-center gap-1'>
          <Image src={logo} alt='Picture of the author' className='w-auto max-w-sm h-auto max-h-lg object-fill ' />
          <h1 className='text-4xl text-center lg:text-5xl font-medium'>{t('home.title')}</h1>
        </div>
        <p className='text-center text-2xl'>{t('home.description')}</p>
        <div className='w-full px-5 sm:p-0'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex items-center'>
            <input
              {...register('email')}
              type='email'
              placeholder={t('home.email')}
              required
              className='flex-grow text-black p-2 rounded-l-lg h-12 text-xs sm:text-sm'
            />
            <button type='submit' className='px-4 bg-blue-500 hover:bg-blue-300 text-white font-bold rounded-r-lg h-12 text-xs sm:text-sm'>
              {t('home.button')}
            </button>
          </form>
          {message && <p className='text-center mt-4'>{message}</p>}
        </div>

        {/* <div>
          <p>Choose your language:</p>
        </div> */}
      </div>
      <Image src={waitlistImage} alt={t('home.alt')} className='w-auto max-w-sm h-auto max-h-lg object-fill' />
    </div>
  );
}
