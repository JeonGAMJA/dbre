export type SignUpField = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  button?: {
    text: string;
  };
};

export const SIGNUP_FIELDS: SignUpField[] = [
  {
    id: 'email',
    label: 'e-mail address',
    type: 'email',
    placeholder: 'e-mail address',
    button: {
      text: '가입여부 확인',
    },
  },
  {
    id: 'password',
    label: 'password',
    type: 'password',
    placeholder: 'password',
  },
  {
    id: 'confirm-password',
    label: 'confirm password',
    type: 'password',
    placeholder: 'confirm password',
  },
  {
    id: 'username',
    label: 'name',
    type: 'text',
    placeholder: '홍길동',
  },
  {
    id: 'phone_number',
    label: 'phone',
    type: 'tel',
    placeholder: '010-1234-5678',
    button: {
      text: '휴대폰 인증',
    },
  },
] as const;
