import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaHeart, FaBookmark, FaShare } from "react-icons/fa";
import { motion } from "framer-motion";
import { getQuoteByAuthor, getQuoteById } from "../../api/quote.api";
import QuotesList from "../../components/QuoteList";

function QuotePage() {
  const { id } = useParams();

  const [quote, setQuote] = useState(null);
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        setLoading(true);

        const res = await getQuoteById(id);
        setQuote(res.data);
        console.log(res.data);

        const authorRes = await getQuoteByAuthor(res?.data?.submittedBy?._id);
        console.log(authorRes);
        const filteredQuote = authorRes.data.quotes.filter((q) => q._id !== id);
        setAuthorQuotes(filteredQuote || []);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen   p-10 animate-pulse">
        <div className="h-40 bg-gray-800 rounded-xl mb-6"></div>
        <div className="h-20 bg-gray-800 rounded-xl mb-4"></div>
        <div className="h-10 bg-gray-800 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white/5 border border-purple-500/20 p-8 rounded-2xl backdrop-blur-xl"
      >
        <h1 className="text-2xl md:text-3xl font-semibold leading-relaxed text-center">
          “{quote?.text}”
        </h1>

        <p className="mt-6 text-center text-purple-400 text-lg">
          — {quote?.author}
        </p>

        {/* ACTIONS */}
        <div className="flex justify-center gap-6 mt-6 text-gray-300">
          <button className="flex flex-col items-center ">
            <FaHeart
              className={`${quote?.isLiked ? "text-pink-500" : "text-gray-400"}`}
            />
            <span className="text-xs mt-1">{quote?.likeCount}</span>
          </button>

          <button className="flex flex-col items-center ">
            <FaBookmark
              className={`${quote?.isSaved ? "text-yellow-500" : "text-gray-400"}`}
            />
            <span className="text-xs mt-1">Save</span>
          </button>

          <button className="flex flex-col items-center ">
            <FaShare />
            <span className="text-xs mt-1">Share</span>
          </button>
        </div>
      </motion.div>

      {/* AUTHOR SECTION */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white/5 border border-purple-500/20 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-purple-400">
            About Publisher
          </h2>

          <p className="mt-2 text-gray-300">
            {quote?.submittedBy?.name} is a well-known personality who shares
            impactful thoughts and ideas.
          </p>
        </div>
      </div>

      {/* OTHER QUOTES */}
      <div className="max-w-7xl mx-auto mt-12">
        <h2 className="text-xl font-semibold mb-4 ">
          More from {quote?.submittedBy?.name}
        </h2>

        <div className="">
          {/* {authorQuotes.map((q) => (
            <div
              key={q._id}
              className="p-4 bg-white/5 border border-purple-500/10 rounded-xl hover:bg-white/10 transition"
            >
              <p className="text-gray-200">“{q.text}”</p>
              <span className="text-xs text-gray-400">
                ❤️ {q.likeCount || 0}
              </span>
            </div>
          ))} */}
          <QuotesList quotes={authorQuotes} />
        </div>
      </div>
    </div>
  );
}

export default QuotePage;
