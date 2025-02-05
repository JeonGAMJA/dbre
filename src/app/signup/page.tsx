'use client';

import Heading from '../components/ui/Heading';
import { Button } from '../components/ui/Button';
import TextButton from '@/app/components/ui/TextButton';
import { FormField } from '../components/signup/FormField';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { SignupFormData, SignUpSchema } from '../auth/schemas/SignupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SIGNUP_FIELDS } from '@/constants/signup';

export default function SignUp() {
  const methods = useForm<SignupFormData>({
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

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto px-4 flex justify-center">
        <div className="w-full max-w-[98rem] flex flex-col items-center">
          <Heading tag="h1" className="mt-[9rem] mb-[13rem]">
            join
          </Heading>
          <form className="w-full space-y-[8rem]">
            {SIGNUP_FIELDS.map(field => (
              <FormField key={field.id} field={field}></FormField>
            ))}
            {/*약관박스 */}
            <div className="flex flex-col gap-10">
              <label className="flex items-center space-x-[2.3rem]">
                <input type="checkbox" className="peer hidden" />
                <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
                <span className="font-bold text-[3rem]">전체 동의</span>
              </label>
              <label className="flex items-center space-x-[2.3rem] mt-[7.4rem]">
                <input type="checkbox" className="peer hidden" />
                <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
                <span className="text-[3rem]">
                  <TextButton href="/signup/terms" className="text-[3rem] !font-bold">
                    이용약관
                  </TextButton>
                  에 동의합니다.(필수)
                </span>
              </label>
              <label className="flex items-center space-x-[2.3rem]">
                <input type="checkbox" className="peer hidden" />
                <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
                <span className="text-[3rem]">
                  <TextButton href="/signup/privacy-policy" className="text-[3rem] !font-bold">
                    개인정보처리방침
                  </TextButton>
                  에 동의합니다.(필수)
                </span>
              </label>
              <label className="flex items-center space-x-[2.3rem]">
                <input type="checkbox" className="peer hidden" />
                <span className="w-14 h-14 border-2 border-black rounded-sm peer-checked:bg-primary peer-checked:border-black"></span>
                <span className="text-[3rem]">마케팅 수신에 동의합니다.(선택)</span>
              </label>
            </div>

            <div className="flex items-center justify-center mt-[14.4rem]">
              <Button variant="green" type="submit" className="w-[54rem] h-[6.6rem] text-[2.5rem]">
                join
              </Button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
