import './Loader.css';

interface Props {
  isLoading: boolean;
}

const Loader = ({ isLoading }: Props) => {
  if (!isLoading) {
    return null;
  }

  return <div className='m-auto loader'></div>;
};

export default Loader;
