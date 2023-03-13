import { ReactNode } from 'react';

type ButtonType = 'button' | 'submit' | 'reset';

interface Props {
  positionContentContainer?: string;
  classes?: string;
  children: ReactNode;
  type?: ButtonType;
  isDisable?: boolean;
  handleClick?: () => void;
}

const Button = ({
  positionContentContainer,
  classes,
  children,
  type = 'submit',
  isDisable = false,
  handleClick = () => {},
}: Props) => {
  return (
    <div
      className={`w-full max-w-2xl ${
        positionContentContainer || 'flex justify-center items-center'
      }`}
    >
      <button
        type={type}
        onClick={handleClick}
        disabled={isDisable}
        className={`text-sm lg:text-md text-white hover:bg-green-700 ${
          isDisable ? 'bg-gray-600' : 'bg-customBlue'
        }  rounded-lg ${classes}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
