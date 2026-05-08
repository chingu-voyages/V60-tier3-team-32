import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Plus, Languages, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  LANGUAGE_OPTIONS, 
  FLUENCY_LEVELS, 
  getLanguageLabel 
} from "@/lib/constants/languages";

export default function EditLanguages() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState(null);

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('lingualoop_languages');
    return saved ? JSON.parse(saved) : {
      learning: [{ code: 'ar', level: 'Beginner' }, { code: 'es', level: 'Intermediate' }],
      fluent: ['en', 'pa'] 
    };
  });

  useEffect(() => {
    localStorage.setItem('lingualoop_languages', JSON.stringify(data));
  }, [data]);

  const handleRemove = (type, identifier) => {
    setData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => 
        type === 'learning' ? item.code !== identifier : item !== identifier
      )
    }));
  };

  const handleAdd = (type, newEntry) => {
    setData(prev => ({
      ...prev,
      [type]: [...prev[type], newEntry]
    }));
    setActiveForm(null);
  };

  return (
    // Reduced outer padding for mobile (px-1 py-4)
    <div className="min-h-screen bg-[#F8FAFF] px-1 py-4 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="rounded-full bg-white border border-gray-100 text-gray-500 text-[10px] uppercase font-bold tracking-widest px-6 h-10 hover:bg-gray-50 gap-2 shadow-sm ml-2 md:ml-0"
        >
          <ArrowLeft size={14} /> Back to Profile
        </Button>

        {/* --- LEARNING SECTION --- */}
        {/* Mobile: p-4 and smaller rounding | Desktop: p-12 and rounded-[40px] */}
        <div className="bg-[#EBF2FF] rounded-[32px] md:rounded-[40px] p-4 md:p-12 space-y-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 ml-2">Learning Languages</h2>
          <div className="space-y-3 md:space-y-4">
            {data.learning.map((lang, i) => (
              <div key={lang.code} className="bg-white rounded-full p-3 md:p-4 pl-5 md:pl-6 pr-5 md:pr-6 flex items-center justify-between border border-gray-100/50 shadow-sm">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`p-2 md:p-2.5 rounded-full ${i % 2 === 0 ? "bg-[#E8EDFF] text-[#5D45FD]" : "bg-[#FFF7ED] text-[#F59E0B]"}`}>
                    <Languages size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-md font-bold text-gray-900">{getLanguageLabel(lang.code)}</h3>
                    <p className="text-[9px] md:text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{lang.level}</p>
                  </div>
                </div>
                <button onClick={() => handleRemove('learning', lang.code)} className="text-red-400 hover:text-red-600 p-2"><X size={18} /></button>
              </div>
            ))}
          </div>

          {activeForm === 'learning' ? (
            <AddLanguageForm type="Learning" onSave={(entry) => handleAdd('learning', entry)} onCancel={() => setActiveForm(null)} />
          ) : (
            <button onClick={() => setActiveForm('learning')} className="w-full bg-white/60 hover:bg-white border border-dashed border-gray-300 rounded-full py-4 flex items-center justify-center gap-2 text-[#5D45FD] font-bold text-[10px] md:text-xs uppercase tracking-widest">
              <Plus size={16} /> Add another language
            </button>
          )}
        </div>

        {/* --- FLUENT SECTION --- */}
        <div className="bg-[#EBF2FF] rounded-[32px] md:rounded-[40px] p-4 md:p-12 space-y-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 ml-2">Fluent Languages</h2>
          <div className="space-y-3 md:space-y-4">
            {data.fluent.map((code, i) => (
              <div key={code} className="bg-white rounded-full p-3 md:p-4 pl-5 md:pl-6 pr-5 md:pr-6 flex items-center justify-between border border-gray-100/50 shadow-sm">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`p-2 md:p-2.5 rounded-full ${i % 2 === 0 ? "bg-[#E8EDFF] text-[#5D45FD]" : "bg-[#FFF7ED] text-[#F59E0B]"}`}>
                    <Globe size={18} className="md:w-5 md:h-5" />
                  </div>
                  <h3 className="text-sm md:text-md font-bold text-gray-900">{getLanguageLabel(code)}</h3>
                </div>
                <button onClick={() => handleRemove('fluent', code)} className="text-red-400 hover:text-red-600 p-2"><X size={18} /></button>
              </div>
            ))}
            {activeForm === 'fluent' ? (
              <AddLanguageForm type="Fluent" onSave={(code) => handleAdd('fluent', code)} onCancel={() => setActiveForm(null)} />
            ) : (
              <button onClick={() => setActiveForm('fluent')} className="w-full bg-white/60 hover:bg-white border border-dashed border-gray-300 rounded-full py-4 flex items-center justify-center gap-2 text-[#5D45FD] font-bold text-[10px] md:text-xs uppercase tracking-widest">
                <Plus size={16} /> Add another language
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddLanguageForm({ type, onCancel, onSave }) {
  const [selectedLang, setSelectedLang] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Beginner');

  return (
    // Form padding reduced on mobile (p-5) to maximize space for inputs
    <div className="bg-white rounded-[28px] md:rounded-[32px] p-5 md:p-8 space-y-6 shadow-sm border border-gray-100">
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Select Language</label>
        <select 
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="w-full bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 text-sm focus:outline-none"
        >
          <option value="">Choose...</option>
          {LANGUAGE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>

      {type === 'Learning' && (
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Proficiency</label>
          <div className="space-y-2">
            {FLUENCY_LEVELS.map((level) => (
              <label key={level.value} className="flex items-center gap-3 cursor-pointer p-1">
                <input 
                  type="radio" 
                  checked={selectedLevel === level.value}
                  onChange={() => setSelectedLevel(level.value)}
                  className="w-4 h-4 accent-[#5D45FD]" 
                />
                <span className="text-xs md:text-sm text-gray-600">{level.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 md:gap-4 pt-2">
        <Button variant="ghost" onClick={onCancel} className="flex-1 rounded-xl md:rounded-2xl h-12 md:h-14 font-bold text-gray-400 text-xs">Cancel</Button>
        <Button 
          disabled={!selectedLang}
          onClick={() => onSave(type === 'Learning' ? { code: selectedLang, level: selectedLevel } : selectedLang)} 
          className="flex-1 rounded-xl md:rounded-2xl h-12 md:h-14 font-bold bg-[#5D45FD] text-white text-xs"
        >
          Add Language
        </Button>
      </div>
    </div>
  );
}