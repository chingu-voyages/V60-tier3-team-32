export default function PageLoader() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-[#F8FAFF]'>
      <div className='text-center'>
        <div className='mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E8EDFF] border-t-[#5D45FD]' />

        <p className='mt-4 text-sm font-semibold text-gray-500'>
          Loading LinguaLoop...
        </p>
      </div>
    </div>
  );
}
