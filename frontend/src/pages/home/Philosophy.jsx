export function Philosophy() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 w-full">
          <img 
            src="/community.jpg" 
            alt="Team holding hands" 
            className="rounded-[3rem] w-full object-cover shadow-xl aspect-square md:aspect-auto"
          />
        </div>
        <div className="flex-1 space-y-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Our Philosophy</span>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">A community that <span className="text-[#5D45FD]">grows together.</span></h2>
          </div>
          
          <div className="space-y-10">
            <FeaturePoint 
              title="Equal Contribution" 
              desc="We believe everyone is a master of their own language. Every correction builds your legacy."
            />
            <FeaturePoint 
              title="Curated Connections" 
              desc="Our algorithm matches you with learners whose interests align with yours."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturePoint({ title, desc }) {
  return (
    <div className="flex gap-6">
      <div className="w-10 h-10 shrink-0 bg-indigo-50 rounded-full flex items-center justify-center text-[#5D45FD]">
        ★
      </div>
      <div>
        <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}