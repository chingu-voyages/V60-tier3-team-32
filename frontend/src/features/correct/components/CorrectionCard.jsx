import { useNavigate } from 'react-router-dom';
import { Clock, FileText, CheckCircle, User } from 'lucide-react';
import { toast } from 'sonner';

export default function CorrectionCard({ item }) {
  const navigate = useNavigate();

  // In your new schema, 'corrected' status means it has reviews
  const hasBeenCorrected =
    item.status === 'corrected' || item.corrections_count > 0;

  const handleCorrectClick = () => {
    // Optional frontend protection
    // Prevent navigating if somehow the item is already corrected
    if (hasBeenCorrected) {
      toast.error('This submission has already been corrected.');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);

      return;
    }

    try {
      // Passing the whole item as 'submission' to the Correct page
      navigate(`/correct/${item.id}`, {
        state: { submission: item },
      });
    } catch (error) {
      toast.error('You are not allowed to correct this submission.');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    }
  };

  return (
    <div className='bg-white rounded-[24px] md:rounded-[32px] p-4 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all'>
      
      {/* Top Header Row */}
      <div className='flex justify-between items-center mb-3 md:mb-4'>
        <div className='flex gap-2 items-center flex-wrap'>
          
          <span className='bg-[#E0E7FF] text-[#5D45FD] px-2.5 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-wider'>
            {item.language}
          </span>

          <span className='bg-[#F1F1F1] text-gray-600 px-2.5 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase'>
            {item.fluency_level}
          </span>

          {hasBeenCorrected && (
            <span className='flex items-center gap-1 bg-[#E8FFF3] text-[#10B981] px-2 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase border border-[#D1FAE5]'>
              <CheckCircle size={10} />
              {item.corrections_count} Corrections
            </span>
          )}
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-[11px] md:text-[12px] text-gray-400 font-medium'>
            by {item.author.username}
          </span>

          {item.author.photo_url ? (
            <img
              src={item.author.photo_url}
              alt={item.author.username}
              className='w-5 h-5 rounded-full object-cover'
            />
          ) : (
            <div className='w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center'>
              <User size={10} className='text-gray-400' />
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className='mb-4 md:mb-5'>
        <h3 className='text-[16px] md:text-[18px] font-bold text-[#1A1A1A] mb-1 md:mb-1.5'>
          {item.prompt?.title || 'Personal Entry'}
        </h3>

        <p className='text-[13px] md:text-[14px] text-gray-500 leading-relaxed line-clamp-2'>
          {item.preview}
        </p>
      </div>

      {/* Meta Icons */}
      <div className='flex items-center gap-4 md:gap-5 mb-5 md:mb-6 text-gray-400 border-b border-gray-50 pb-5'>
        
        <div className='flex items-center gap-1.5'>
          <FileText
            size={12}
            className='opacity-70 md:w-[14px] md:h-[14px]'
          />

          <span className='text-[11px] md:text-[12px] font-bold'>
            {item.word_count} words
          </span>
        </div>

        <div className='flex items-center gap-1.5'>
          <Clock
            size={12}
            className='opacity-70 md:w-[14px] md:h-[14px]'
          />

          <span className='text-[11px] md:text-[12px] font-bold'>
            ~{item.reading_time} mins
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleCorrectClick}
        disabled={hasBeenCorrected}
        className={`
          w-full py-3.5 md:py-3
          text-white font-bold text-[13px] md:text-[14px]
          rounded-full shadow-sm transition-all active:scale-[0.98]
          ${
            hasBeenCorrected
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#5D45FD] hover:bg-[#4a36cc]'
          }
        `}
      >
        {hasBeenCorrected ? 'Already Corrected' : 'Correct Now'}
      </button>
    </div>
  );
}