import React from 'react';

export const TERMS_FIELDS = [
  {
    id: 'all',
    label: '전체 동의',
    isAllCheck: true,
    isBold: true,
  },
  {
    id: 'terms',
    label: '이용약관',
    required: true,
    href: '/signup/terms',
  },
  {
    id: 'privacy',
    label: '개인정보처리방침',
    required: true,
    href: '/signup/privacy-policy',
  },
  {
    id: 'marketing',
    label: '마케팅 수신',
    required: false,
  },
] as const;

const TermsSection = () => {
  return (
    <div className="flex flex-col gap-10">
      {TERMS_FIELDS.map(field => (
        <TermsCheckbox
          key={field.id}
          id={field.id}
          checked={checkboxes[field.id]}
          onChange={() => onCheckboxChange(field.id)}
          label={field.label}
          href={field.href}
          required={field.required}
          isBold={field.isBold}
        />
      ))}
    </div>
  );
};

export default TermsSection;
