export function Process() {
  const steps = [
    { title: "Write Freely", desc: "Compose essays, journals, or short stories. No timers, no pressure.", icon: "✎", color: "bg-blue-100 text-blue-600" },
    { title: "Native Nuance", desc: "Receive feedback from native speakers who help you capture the spirit.", icon: "💡", color: "bg-yellow-100 text-yellow-600" },
    { title: "Mindful Exchange", desc: "Earn credits by reviewing others' writing in your native tongue.", icon: "🤝", color: "bg-green-100 text-green-600" },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 text-center md:text-left">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">The Process</span>
        <h2 className="text-3xl font-bold mt-2 mb-12">A meditative loop of growth.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center md:items-start text-center md:text-left transition-transform hover:-translate-y-2">
              <div className={`w-12 h-12 ${step.color} rounded-2xl flex items-center justify-center mb-6 text-xl`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-[#3A33D1] mb-4">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}