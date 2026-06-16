import { useParams } from "react-router";
import { FaHeart, FaBookmark, FaShare } from "react-icons/fa";
import { motion } from "framer-motion";
import { getQuoteByAuthor, getQuoteById } from "../api/quote.api";
import QuotesList from "../components/QuoteList";
import useSWR from "swr";
import Spinner from "../components/common-component/Spinner";

function QuotePage() {
  const { id } = useParams();

  const {
    data: quote,
    error: quoteError,
    isLoading: quoteIsLoading,
  } = useSWR(id ? ["quotes", id] : null, () => getQuoteById(id));

  const {
    data: authorQuotes,
    error: authorQuotesError,
    isLoading: authorQuotesIsLoading,
  } = useSWR(
    quote?.submittedBy?._id ? ["author-quotes", quote?.submittedBy?._id] : null,
    () => getQuoteByAuthor(quote?.submittedBy?._id),
  );

  const authorFilterQuotes =
    authorQuotes?.data?.quotes?.filter((q) => q._id !== id) || [];

  if (quoteIsLoading) {
    return (
      <div className="min-h-screen   p-10 animate-pulse">
        <div className="h-40 bg-gray-800 rounded-xl mb-6"></div>
        <div className="h-20 bg-gray-800 rounded-xl mb-4"></div>
        <div className="h-10 bg-gray-800 rounded-xl"></div>
      </div>
    );
  }

  if (quoteError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-2xl font-bold text-red-400">
          {quoteError?.response?.data?.message}
        </p>
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
          {authorQuotesIsLoading ? (
            <>
              <div className="flex items-center justify-center h-[80vh] ">
                <Spinner />
              </div>
            </>
          ) : authorQuotesError ? (
            <div className="h-100 flex justify-center items-center">
              <p className="text-2xl font-bold text-red-400">
                {authorQuotesError?.response?.data?.message}
              </p>
            </div>
          ) : (
            <QuotesList quotes={authorFilterQuotes} />
          )}
        </div>
      </div>
    </div>
  );
}

export default QuotePage;
