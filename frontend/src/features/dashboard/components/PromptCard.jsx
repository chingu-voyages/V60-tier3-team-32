import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function PromptCard({ prompt }) {
  if (!prompt) {
    return (
      <div className='rounded-2xl bg-white p-6 shadow-sm'>
        <p className='text-gray-500'>No prompt available yet.</p>
      </div>
    );
  }

  return (
    // Reduced padding from p-10 to py-8 px-10
    <div className='bg-gradient-to-br from-indigo-700 to-indigo-400 rounded-[2.5rem] py-8 px-10 text-white relative overflow-hidden shadow-lg shadow-indigo-200/50'>
      {/* Reduced margin-bottom from mb-6 to mb-4 */}
      <Badge className='bg-white/15 hover:bg-white/20 border-none mb-4 px-4 py-1.5 rounded-full text-[10px] tracking-widest font-bold uppercase backdrop-blur-sm'>
        ✦ Prompt of the day
      </Badge>

      {/* Reduced margin-bottom from mb-4 to mb-2 and font size from 3xl to 2xl */}
      <h2 className='text-2xl font-extrabold mb-2 tracking-tight leading-tight max-w-xl'>
        {prompt?.title}
      </h2>

      {/* Reduced margin-bottom from mb-8 to mb-6 */}
      <p className='text-indigo-100/80 mb-6 max-w-lg text-[14px] leading-relaxed font-medium'>
        {prompt.description}
      </p>

      {/* Slightly reduced button padding from py-6 to py-5 */}
      <Button className='bg-white text-[#5D5FEF] hover:bg-slate-50 rounded-full px-10 py-5 text-sm font-bold shadow-sm transition-transform active:scale-95'>
        <Link to='/write'>Start Writing →</Link>
      </Button>

      <div className='absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/5 rounded-full blur-3xl' />
    </div>
  );
}
