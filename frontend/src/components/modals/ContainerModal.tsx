import { ReactNode } from 'react';
import { GrFormClose } from 'react-icons/gr';

interface Props {
  isOpen?: boolean;
  toggleModal: () => void;
  children: ReactNode;
}

const ContainerModal = ({ isOpen, children, toggleModal }: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='w-full min-h-screen overflow-auto flex justify-center items-center text-white fixed top-0 left-0 bg-bgModal z-50'>
      <section className='w-[90%] md:w-[80%] min-h-[80vh] flex flex-col justify-center items-center relative'>
        <GrFormClose
          className='absolute top-0 right-0 bg-gray-600 cursor-pointer'
          color='#fffff'
          onClick={() => toggleModal()}
        />
        {children}
      </section>
    </div>
  );
};

export default ContainerModal;
