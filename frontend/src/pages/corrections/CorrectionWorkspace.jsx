import { ArrowLeft, Sparkles, Send } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSubmissionStore } from "../../app/hooks/useSubmissionStore";

export default function CorrectionWorkspace() {
  const navigate = useNavigate();
  const location = useLocation();
  const submission = location.state?.submission;
  const { addReview } = useSubmissionStore();

  const [correction, setCorrection] = useState("");
  const [notes, setNotes] = useState("");

  const handleBack = () => {
    navigate("/correct");
  };

  const handleSubmitCorrection = () => {
    if (!submission || !correction.trim()) {
      alert("Please write a correction before submitting.");
      return;
    }

    // Add review to the submission in localStorage
    addReview(submission.id, {
      userId: "current-user",
      correction: correction.trim(),
      notes: notes.trim(),
    });

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] px-4 py-6 md:px-12 md:py-8 font-sans">
      {/* Top Navigation Row */}
      <div className="container mx-auto flex justify-between items-center mb-8">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-500 hover:text-[#5D45FD] transition-colors font-medium text-sm">
          <ArrowLeft size={18} />
          Back to Queue
        </button>
        
        <div className="flex items-center gap-2 bg-[#E8FFF3] text-[#10B981] px-4 py-2 rounded-full border border-[#D1FAE5]">
          <Sparkles size={16} fill="currentColor" />
          <span className="text-xs font-bold uppercase tracking-tight">Reward: 1 credit</span>
        </div>
      </div>

      {/* Main Grid Split */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Original Submission */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-bold text-[#1A1A1A] px-2">Original Submission</h2>
          <div className="bg-[#EEF2FF] rounded-[32px] p-8 border border-indigo-50">
            <div className="flex gap-2 mb-4">
              <span className="bg-[#5D45FD] text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase">{submission?.language || "Spanish"}</span>
              <span className="bg-white/60 text-gray-600 px-3 py-1 rounded-md text-[10px] font-bold uppercase border border-white">{submission?.level || "Advanced"}</span>
            </div>
            <p className="text-[#1A1A1A] leading-relaxed text-[15px]">
              {submission?.text || "Lorem ipsum dolor sit amet consectetur. Amet est urna elementum quam risus nisl diam."}
            </p>
          </div>
        </div>

        {/* Right: Interaction Form */}
        <div className="lg:col-span-8 space-y-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#1A1A1A] px-2">Your Correction</h2>
            <div className="relative">
              <textarea 
                placeholder="Write your corrected version here..."
                value={correction}
                onChange={(e) => setCorrection(e.target.value)}
                className="w-full h-64 bg-white border border-gray-100 rounded-[32px] p-8 text-[15px] outline-none focus:ring-4 focus:ring-indigo-50 transition-all resize-none shadow-sm"
              />
              <span className="absolute bottom-6 right-8 text-xs font-medium text-gray-400">
                {correction.split(/\s+/).filter(Boolean).length}/300 words max
              </span>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#1A1A1A] px-2 text-sm">Notes (optional)</h2>
            <textarea 
              placeholder="Add a short explanation here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-32 bg-white border border-gray-100 rounded-[32px] p-8 text-[15px] outline-none focus:ring-4 focus:ring-indigo-50 transition-all resize-none shadow-sm"
            />
          </section>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button 
              onClick={handleSubmitCorrection}
              className="w-full py-4 bg-[#5D45FD] hover:bg-[#4a36cc] text-white font-bold rounded-full shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-[0.99]">
              Submit Correction
              <Send size={18} />
            </button>
            <button className="w-full py-4 bg-transparent border border-gray-200 text-gray-600 font-bold rounded-full hover:bg-gray-50 transition-all">
              Save Draft
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}