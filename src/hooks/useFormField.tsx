import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

// hooks/useFormField.ts
export const useEmailField = () => {
  const { watch, setValue } = useFormContext();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setValue('email', email, { shouldValidate: true });
  };

  const checkEmailAvailability = () => {
    const email = watch('email');
    if (!email.includes('@')) return;

    // 이메일 중복 체크 로직
    const isAvailable = true; // API 호출 결과
    setValue('isEmailAvailable', isAvailable, { shouldValidate: true });
  };

  return {
    handleEmailChange,
    checkEmailAvailability,
  };
};

export const usePhoneField = () => {
  const { setValue, setError } = useFormContext();

  const [isPhoneAuthStarted, setIsPhoneAuthStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const startPhoneAuth = () => {
    setIsPhoneAuthStarted(true);
    setTimeLeft(239);

    setTimeout(() => {
      setIsPhoneAuthStarted(false);
      setTimeLeft(null);
    }, 239000);
  };

  const verifyPhoneAuth = (code: string) => {
    if (code === '123456') {
      setValue('isPhoneVerified', true, { shouldValidate: true });
      return true;
    }
    setError('phone_auth', { message: '인증번호가 올바르지 않습니다.' });
    return false;
  };

  return {
    isPhoneAuthStarted,
    timeLeft,
    startPhoneAuth,
    verifyPhoneAuth,
  };
};
