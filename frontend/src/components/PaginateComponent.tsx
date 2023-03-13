interface Props {
  actualPage: number;
  pageCount: number;
  handleChangePage: (page: boolean) => void;
}

const PaginateComponent = ({
  actualPage,
  pageCount,
  handleChangePage,
}: Props) => {
  return (
    <div className='w-full flex justify-end gap-3'>
      <div>
        <span>{actualPage + 1}</span>
        <span className='mx-1'>de</span>
        <span>{pageCount}</span>
      </div>
      <div className='flex gap-2'>
        <div className='cursor-pointer' onClick={() => handleChangePage(false)}>
          &lt;
        </div>
        <div className='cursor-pointer' onClick={() => handleChangePage(true)}>
          &gt;
        </div>
      </div>
    </div>
  );
};

export default PaginateComponent;
