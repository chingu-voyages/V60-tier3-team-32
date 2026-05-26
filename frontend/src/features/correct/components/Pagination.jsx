import { Button } from '@/components/ui/button';

export default function Pagination({ page, totalPages, setPage }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className='flex justify-center items-center gap-2 mt-6'>
      <Button
        variant='outline'
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </Button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;

        return (
          <Button
            key={pageNumber}
            variant={page === pageNumber ? 'default' : 'outline'}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        variant='outline'
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
