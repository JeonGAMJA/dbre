import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ChangeEvent, useState } from 'react';
import { useEmailValidation } from '@/hooks/useEmailValidation';
import { SignupFormData } from '@/app/auth/schemas/SignupSchema';
import { formatPhoneNumber } from '@/utils/phone';

interface FormFieldProps {
  field: {
    id:
      | 'email'
      | 'password'
      | 'password_confirm'
      | 'username'
      | 'phone_number'
      | 'phone_auth'
      | 'isPhoneVerified'
      | 'terms'
      | 'privacy'
      | 'marketing'
      | 'isEmailAvailable';
    label: string;
    type: string;
    placeholder: string;
    button?: {
      text: string;
    };
  };
  children?: React.ReactNode;
}

export const FormField = ({ field }: FormFieldProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useFormContext<SignupFormData>();

  const errorMessage = errors[field.id]?.message?.toString() || '';

  const { checkEmailForSignup } = useEmailValidation(watch, setValue);
  const [isPhoneAuthVisible, setIsPhoneAuthVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleButtonClick = () => {
    switch (field.id) {
      case 'email':
        checkEmailForSignup();
        break;
      case 'phone_number':
        setIsPhoneAuthVisible(true);
        setTimeout(() => {
          setIsPhoneAuthVisible(false);
        }, 239000);
        break;
    }
  };

  const handleVerifyCode = () => {
    const code = watch('phone_auth');
    if (!code) {
      setError('phone_auth', { message: '인증번호를 입력해주세요.' });
      setSuccessMessage('');
      return;
    }

    if (code === '123456') {
      setSuccessMessage('인증에 성공했습니다.');
      setValue('isPhoneVerified', false, { shouldValidate: true });
    } else {
      setError('phone_auth', { message: '인증에 실패했습니다.' });
      setSuccessMessage('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 각 필드 타입에 따라 다른 처리
    const value = e.target.value;

    switch (field.type) {
      case 'tel':
        // 전화번호의 경우 포맷팅
        const formattedPhone = formatPhoneNumber(value);
        setValue(field.id, formattedPhone, { shouldValidate: true });
        break;

      case 'email':
        setValue(field.id, value, { shouldValidate: true });
        break;

      case 'password':
        setValue(field.id, value, { shouldValidate: true });
        break;

      default:
        // 나머지 필드들
        setValue(field.id, value, { shouldValidate: true });
    }
  };

  return (
    <>
      <div className="grid grid-cols-[30rem_54rem_14rem] gap-x-8 items-center">
        <label htmlFor={field.id} className="text-[3rem]">
          {field.label}
        </label>
        <Input
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          status={errors?.[field.id] ? 'error' : 'default'}
          helperText={errorMessage}
          {...register(field.id, {
            onChange: e => handleChange(e),
          })}
        />
        {field.button && (
          <Button
            type="button"
            variant="outline"
            className="!w-[14rem] h-[5rem] text-[2rem]"
            onClick={handleButtonClick}
          >
            {field.button.text}
          </Button>
        )}
      </div>
      {field.id === 'phone_number' && isPhoneAuthVisible && (
        <div className="pl-[32rem] !mt-[3rem] grid grid-cols-[54rem_14rem] gap-x-8">
          <Input
            id="phone_auth"
            type="number"
            placeholder="인증번호 입력"
            helperText={successMessage || errors.phone_auth?.message}
            {...register('phone_auth', { onChange: e => handleChange(e) })}
          />
          <Button
            type="button"
            variant="outline"
            className="!w-[14rem] h-[5rem] text-[2rem] mt-[2.2rem]"
            onClick={handleVerifyCode}
          >
            인증 확인
          </Button>
        </div>
      )}
    </>
  );
};
