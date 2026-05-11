import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Clock, FileText, CheckCircle, User } from 'lucide-react';
import { toast } from 'sonner';

export default function CorrectionCard({ item }) {
  const navigate = useNavigate();

  // 1. Ensure Redux data is grabbed correctly
  // Use currentUser?.id or currentUser?._id based on your auth state structure
  const { user: currentUser } = useSelector((state) => state.auth);
  const currentUserId = currentUser?._id || currentUser?.id;

  // --- DEBUG LOGS (Keep these until you confirm the fix) ---
  // console.group(`Card Debug: ${item.prompt?.title || 'Entry'}`);
  // console.log("Current User ID:", currentUserId);
  // console.log("Item Correctors Array:", item.correctors);
  console.groupEnd();

  // 2. Logic Checks
  const isAuthor =
    String(item.author?.id || item.author?._id) === String(currentUserId);

  // Since backend now sends 'correctors' as an array of strings, we use .includes()
  const alreadyCorrectedByMe = item.correctors?.includes(String(currentUserId));

  // The button is disabled if:
  // - Current user is author
  // - Current user already corrected it
  // - Status is explicitly closed
  const hasBeenCorrected = alreadyCorrectedByMe || item.status === 'closed';
  const isDisabled = isAuthor || hasBeenCorrected;

  const handleCorrectClick = () => {
    if (isDisabled) {
      const message = isAuthor
        ? 'You cannot correct your own post.'
        : alreadyCorrectedByMe
          ? 'You have already corrected this submission.'
          : 'This submission is closed.';

      toast.error(message);
      return;
    }

    try {
      navigate(`/correct/${item.id || item._id}`, {
        state: { submission: item },
      });
    } catch (error) {
      toast.error('Unable to open correction editor.');
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

          {item.corrections_count > 0 && (
            <span className='flex items-center gap-1 bg-[#E8FFF3] text-[#10B981] px-2 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase border border-[#D1FAE5]'>
              <CheckCircle size={10} />
              {item.corrections_count}{' '}
              {item.corrections_count === 1 ? 'Correction' : 'Corrections'}
            </span>
          )}
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-[11px] md:text-[12px] text-gray-400 font-medium'>
            by {item.author?.username || 'User'}
          </span>

          {item.author?.photo_url ? (
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
          <FileText size={12} className='opacity-70 md:w-[14px] md:h-[14px]' />
          <span className='text-[11px] md:text-[12px] font-bold'>
            {item.word_count} words
          </span>
        </div>

        <div className='flex items-center gap-1.5'>
          <Clock size={12} className='opacity-70 md:w-[14px] md:h-[14px]' />
          <span className='text-[11px] md:text-[12px] font-bold'>
            ~{item.reading_time} mins
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleCorrectClick}
        disabled={isDisabled}
        className={`
          w-full py-3.5 md:py-3
          text-white font-bold text-[13px] md:text-[14px]
          rounded-full shadow-sm transition-all active:scale-[0.98]
          ${
            isDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#5D45FD] hover:bg-[#4a36cc]'
          }
        `}
      >
        {isAuthor
          ? 'Your Post'
          : alreadyCorrectedByMe
            ? 'Already Corrected'
            : 'Correct Now'}
      </button>
    </div>
  );
}
