import { SignupFormData, SignUpSchema } from '@/app/auth/schemas/SignupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useSignUpForm = () => {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      password_confirm: '',
      username: '',
      phone_number: '',
      phone_auth: '',
      isPhoneVerified: false,
      isEmailAvailable: false,
      terms: false,
      privacy: false,
      marketing: false,
    },
  });

  const handleButtonClick = (fieldName: string) => {
    switch (fieldName) {
      case 'email':
        return checkEmailForSignup;
      case 'phone_number':
        return handlePhoneAuthClick;
      default:
        return undefined;
    }
  };

  return {
    ...form,
    handleButtonClick,
  };
};
