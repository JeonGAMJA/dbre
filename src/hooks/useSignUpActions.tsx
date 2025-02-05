import React, { useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

const useSignUpActions = (watch: UseFormWatch<any>, setValue: UseFormSetValue<any>) => {
  const [isPhoneAuthDisabled, setIsPhoneAuthDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const checkEmailForSignup = async () => {
    const email = watch('email');
    if (!email.includes('@')) return;

    try {
      // API 호출 시뮬레이션
      const isAvailable = true;
      setValue('isEmailAvailable', isAvailable, { shouldValidate: true });
    } catch (error) {
      setValue('isEmailAvailable', false, { shouldValidate: true });
      console.error(error);
    }
  };

  const startPhoneAuth = () => {
    setIsPhoneAuthDisabled(true);
    setTimeLeft(239);

    setTimeout(() => {
      setIsPhoneAuthDisabled(false);
      setTimeLeft(null);
    }, 239000);
  };

  return {
    checkEmailForSignup,
    startPhoneAuth,
    isPhoneAuthDisabled,
    timeLeft,
    setIsPhoneAuthDisabled,
    setTimeLeft,
  };
};

export default useSignUpActions;
