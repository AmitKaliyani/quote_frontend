import { motion } from "framer-motion";
import { useState } from "react";
import { FaHeart, FaBookmark, FaShare } from "react-icons/fa";
import { toggleLike, toggleSaved } from "../../api/quote.api";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function QuoteCard({ quote, onUnsave }) {
  const [isLiked, setIsLiked] = useState(quote?.isLiked || false);
  const [likeCount, setLikeCount] = useState(quote?.likeCount || 0);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isSaved, setIsSaved] = useState(quote?.isSaved || false);

  const navigate = useNavigate();

  // Navigate handler (safe)
  const handleNavigate = () => {
    navigate(`/quotes/${quote?._id}`);
  };

  const handleLikeToggle = async (e, quoteId) => {
    e.stopPropagation(); // FIXED spelling
    if (!isAuthenticated) {
      toast.error("LoggedIn first for like quotes");
      return;
    }
    const prevLiked = isLiked;
    const prevCount = likeCount;

    const newLiked = !prevLiked;

    // optimistic UI update
    setIsLiked(newLiked);
    setLikeCount((p) => (newLiked ? p + 1 : p - 1));

    try {
      await toggleLike(quoteId);
    } catch (err) {
      console.log(err);

      // rollback on failure
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
    }
  };

  const handleSave = async (e, quoteId) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("LoggedIn first for save quotes");
    }

    const prevSaved = isSaved;
    const newSaved = !prevSaved;
    try {
      setIsSaved(newSaved);

      await toggleSaved(quoteId);
      if (!newSaved && typeof onUnsave === "function") {
        onUnsave(quoteId);
      }
    } catch (error) {
      console.log(error);
      setIsSaved(prevSaved);
    }
  };

  return (
    <motion.div
      onClick={handleNavigate}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="relative group bg-white/5 backdrop-blur-xl 
                 border border-purple-500/20 
                 rounded-3xl p-6 md:p-8 
                 shadow-xl overflow-hidden cursor-pointer"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-r from-purple-600/10 to-pink-600/10" />

      {/* Quote Text */}
      <p className="text-lg md:text-xl text-shadow-taupe-800 italic leading-relaxed relative z-10">
        “{quote.text || "Your thoughts shape your reality."}”
      </p>

      {/* Author */}
      <p className="mt-5 text-purple-400 font-medium relative z-10">
        — {quote.author || "Unknown"}
      </p>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between relative z-10">
        {/* Tags */}
        <div className="flex w-60 flex-wrap gap-1">
          {quote.tags?.map((tag, i) => (
            <span
              key={i}
              className="text-xs text-slate-400 px-3 py-1 rounded-full border border-purple-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 text-slate-400 ">
          {/* Like Button */}
          <button
            onClick={(e) => handleLikeToggle(e, quote?._id)}
            className="flex flex-col items-center"
          >
            <FaHeart
              className={`transition cursor-pointer ${isLiked ? "text-pink-500" : "text-gray-500"
                }`}
            />
            <p className="text-xs">{likeCount}</p>
          </button>

          {/* Bookmark */}
          <button
            onClick={(e) => handleSave(e, quote?._id)}
            className="flex flex-col mb-3 items-center hover:text-purple-400 transition"
          >
            <FaBookmark
              className={`cursor-pointer ${isSaved ? "text-yellow-500" : "text-gray-400"}`}
            />
            <p className="text-xs"></p>
          </button>

          {/* Share */}
          <button className="flex flex-col items-center hover:text-green-400 transition">
            <FaShare />
            <p className="text-xs">0</p>
          </button>
        </div>
      </div>

      {/* Decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl" />
    </motion.div>
  );
}

export default QuoteCard;
