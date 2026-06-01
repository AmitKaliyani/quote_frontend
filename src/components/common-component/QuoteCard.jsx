import { motion } from "framer-motion";
import { FaHeart, FaBookmark, FaShare } from "react-icons/fa";

function QuoteCard({ quote }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="relative group bg-white/5 backdrop-blur-xl 
                 border border-purple-500/20 
                 rounded-3xl p-6 md:p-8 
                 shadow-xl overflow-hidden"
    >
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-r cursor-pointer from-purple-600/10 to-pink-600/10" />

      {/* Quote Text */}
      <p className="text-lg md:text-xl text-shadow-taupe-800 italic leading-relaxed relative z-10">
        “{quote.content || "Your thoughts shape your reality."}”
      </p>

      {/* Author */}
      <p className="mt-5 text-purple-400 font-medium relative z-10">
        — {quote.author || "Unknown"}
      </p>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between relative z-10">

        {/* Left tags */}
        <span className="text-xs text-slate-400 px-3 py-1 rounded-full border border-purple-500/20">
          Inspirational
        </span>

        {/* Right icons */}
        <div className="flex items-center gap-4 text-slate-400">

          <button className="hover:text-pink-500 transition">
            <FaHeart />
          </button>

          <button className="hover:text-purple-400 transition">
            <FaBookmark />
          </button>

          <button className="hover:text-green-400 transition">
            <FaShare />
          </button>

        </div>
      </div>

      {/* Floating decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl" />
    </motion.div>
  );
}

export default QuoteCard;