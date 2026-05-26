import { Button } from '@/components/ui/button';

export default function Pagination({ page, totalPages, setPage }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className='flex justify-center items-center gap-2 mt-6'>
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        const isActive = page === pageNumber;
        console.log(page, pageNumber, page === pageNumber);

        return (
          <Button
            key={pageNumber}
            variant='outline'
            className={
              isActive ? 'bg-indigo-100 hover:bg-indigo-200 text-black' : ''
            }
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}
    </div>
  );
}
