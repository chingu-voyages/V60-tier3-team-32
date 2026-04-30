import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PromptCard() {
  return (
    // Reduced padding from p-10 to py-8 px-10
    <div className='bg-gradient-to-br from-[#5D5FEF] to-[#4A4CDD] rounded-[2.5rem] py-8 px-10 text-white relative overflow-hidden shadow-lg shadow-indigo-200/50'>
      {/* Reduced margin-bottom from mb-6 to mb-4 */}
      <Badge className='bg-white/15 hover:bg-white/20 border-none mb-4 px-4 py-1.5 rounded-full text-[10px] tracking-widest font-bold uppercase backdrop-blur-sm'>
        ✦ Prompt of the day
      </Badge>

      {/* Reduced margin-bottom from mb-4 to mb-2 and font size from 3xl to 2xl */}
      <h2 className='text-2xl font-extrabold mb-2 tracking-tight leading-tight max-w-xl'>
        Describe the feeling of a quiet morning in a city you love.
      </h2>

      {/* Reduced margin-bottom from mb-8 to mb-6 */}
      <p className='text-indigo-100/80 mb-6 max-w-lg text-[14px] leading-relaxed font-medium'>
        Imagine a city you love on a quiet morning before the crowds arrive.
        Think about how the streets look, the sounds in the distance, and the
        feeling in the air.
      </p>

      {/* Slightly reduced button padding from py-6 to py-5 */}
      <Button className='bg-white text-[#5D5FEF] hover:bg-slate-50 rounded-full px-10 py-5 text-sm font-bold shadow-sm transition-transform active:scale-95'>
        Start Writing →
      </Button>

      <div className='absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/5 rounded-full blur-3xl' />
    </div>
  );
}
