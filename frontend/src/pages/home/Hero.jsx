export function Hero() {
  return (
    <section className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
          Master your target language through <span className="text-[#5D45FD]">mindful writing.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-md leading-relaxed">
          Immerse yourself in the art of expression with an editorial approach to language learning.
        </p>
        <button className="rounded-full bg-[#5D45FD] px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-[#4a36e0] transition-all active:scale-95">
          Get Started
        </button>
      </div>
      <div className="flex-1">
        <img 
          src="/hero-image.jpg" 
          alt="Desk with coffee and notebook" 
          className="rounded-[2.5rem] shadow-2xl w-full object-cover aspect-[4/3]"
        />
      </div>
    </section>
  );
}