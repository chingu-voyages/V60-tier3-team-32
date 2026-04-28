import { ArrowLeft, MessageCircle, ThumbsUp, Reply, X } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";

export default function SubmissionDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Get submission from router state (fallback to empty object if not found)
  const submission = location.state?.submission || {};
  
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);
  const currentReview = submission.reviews?.[selectedReviewIndex];

  // State for likes and replies per review
  const [likes, setLikes] = useState({});
  const [replies, setReplies] = useState({});
  const [showReplyBox, setShowReplyBox] = useState({});
  const [replyText, setReplyText] = useState("");

  const handleBack = () => {
    navigate("/submissions");
  };

  // Handle like/thanks button
  const handleLike = () => {
    const key = `review-${selectedReviewIndex}`;
    setLikes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Toggle reply box visibility
  const handleReplyToggle = () => {
    const key = `review-${selectedReviewIndex}`;
    setShowReplyBox(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setReplyText("");
  };

  // Send reply
  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    const key = `review-${selectedReviewIndex}`;
    const newReply = {
      id: Date.now(),
      text: replyText.trim(),
      createdAt: new Date().toISOString(),
      author: "You"
    };

    setReplies(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), newReply]
    }));

    setReplyText("");
    setShowReplyBox(prev => ({
      ...prev,
      [key]: false
    }));
  };

  // Cancel reply
  const handleCancelReply = () => {
    setReplyText("");
    const key = `review-${selectedReviewIndex}`;
    setShowReplyBox(prev => ({
      ...prev,
      [key]: false
    }));
  };

  // Get current state
  const likeKey = `review-${selectedReviewIndex}`;
  const replyBoxKey = `review-${selectedReviewIndex}`;
  const isLiked = likes[likeKey] || false;
  const showReply = showReplyBox[replyBoxKey] || false;
  const reviewReplies = replies[replyBoxKey] || [];

  // Error state - submission not found
  if (!submission.id) {
    return (
      <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center px-4">
        <div className="bg-white rounded-[32px] p-8 text-center border border-gray-100 max-w-md">
          <p className="text-gray-500 font-medium mb-6">Submission not found.</p>
          <button
            onClick={handleBack}
            className="bg-[#5D45FD] text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition"
          >
            Back to Submissions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFF] px-4 py-6 md:px-8 md:py-8 font-sans">
      {/* Header */}
      <div className="container mx-auto max-w-7xl mb-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-500 hover:text-[#5D45FD] transition-colors font-medium text-sm mb-6"
        >
          <ArrowLeft size={18} />
          Back to Submissions
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        {/* LEFT SIDEBAR - Submission & Prompt Info */}
        <div className="md:col-span-1 space-y-6">
          {/* Metadata */}
          <div className="bg-white rounded-[28px] p-6 border border-gray-100 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#5D45FD] bg-[#E8EDFF] px-3 py-1.5 rounded-full uppercase tracking-wider">
                {submission.language}
              </span>
              <span className="text-[11px] font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
                {submission.level}
              </span>
            </div>

            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Posted</p>
              <p className="text-sm text-gray-600">{submission.postedAt}</p>
            </div>

            {submission.reviews && submission.reviews.length > 0 && (
              <div className="flex items-center gap-2 bg-[#FFF9E6] text-[#D97706] px-3 py-2 rounded-full border border-[#FEF3C7]">
                <MessageCircle size={14} fill="currentColor" />
                <span className="text-xs font-bold">{submission.reviews.length} reviews</span>
              </div>
            )}
          </div>

          {/* Prompt Title */}
          <div className="bg-white rounded-[28px] p-6 border border-gray-100 space-y-3">
            <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Prompt</h3>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              {submission.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {submission.excerpt}
            </p>
          </div>

          {/* Original Submission */}
          <div className="bg-white rounded-[28px] p-6 border border-gray-100 space-y-3">
            <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">My Submission</h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-700 leading-relaxed">
                {submission.text}
              </p>
              <div className="flex gap-4 text-xs text-gray-400 pt-3 border-t border-gray-100">
                <span>{submission.words} words</span>
                <span>{submission.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Reviews Section */}
        <div className="md:col-span-2 space-y-6">
          {submission.reviews && submission.reviews.length > 0 ? (
            <>
              {/* Reviews Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {submission.reviews.map((review, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedReviewIndex(index)}
                    className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                      selectedReviewIndex === index
                        ? "bg-[#5D45FD] text-white"
                        : "bg-white border border-gray-100 text-gray-600 hover:border-[#5D45FD]"
                    }`}
                  >
                    Reviewed by {review.userId.split('-')[0]}
                  </button>
                ))}
              </div>

              {/* Selected Review */}
              {currentReview && (
                <div className="bg-white rounded-[28px] p-6 md:p-8 border border-gray-100 space-y-8">
                  {/* Reviewer Header */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Reviewed by {currentReview.userId}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(currentReview.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Original Submission Section */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                      Original Submission
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {submission.text}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100"></div>

                  {/* Corrected Version Section */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-300 rounded-full"></span>
                      Corrected Version
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
                      {currentReview.correction}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100"></div>

                  {/* Correction Notes Section */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                      Correction Notes
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {currentReview.notes}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button 
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition ${
                        isLiked 
                          ? "bg-[#FFF9E6] text-[#D97706] border border-[#FEF3C7]"
                          : "text-gray-600 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <ThumbsUp size={16} fill={isLiked ? "currentColor" : "none"} />
                      Thanks
                    </button>
                    <button 
                      onClick={handleReplyToggle}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition ${
                        showReply
                          ? "bg-[#E8EDFF] text-[#5D45FD]"
                          : "text-gray-600 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <Reply size={16} />
                      Reply
                    </button>
                  </div>

                  {/* Reply Box */}
                  {showReply && (
                    <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply..."
                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#5D45FD] resize-none"
                        rows="4"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={handleCancelReply}
                          className="px-4 py-2 rounded-full text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSendReply}
                          disabled={!replyText.trim()}
                          className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                            replyText.trim()
                              ? "bg-[#5D45FD] text-white hover:opacity-90"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Send Reply
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Replies Display */}
                  {reviewReplies.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                        Replies ({reviewReplies.length})
                      </h4>
                      {reviewReplies.map((reply) => (
                        <div
                          key={reply.id}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-gray-600">{reply.author}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(reply.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {reply.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-[28px] p-12 text-center border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">No reviews yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
