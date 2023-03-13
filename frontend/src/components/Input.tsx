import { ReactNode } from 'react';

interface Props {
  label: string;
  children: ReactNode;
  error?: string;
}

const Input = ({ label, error, children }: Props) => {
  return (
    <div className='flex flex-col w-full max-w-2xl'>
      <label className='label'>
        <span className='label-text capitalize'>{label}</span>
      </label>
      {children}
      <label className='label'>
        {error && <span className='label-text-alt text-red-500'>{error}</span>}
      </label>
    </div>
  );
};

export default Input;
