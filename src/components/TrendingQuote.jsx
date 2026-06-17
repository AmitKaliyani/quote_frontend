import { motion } from "framer-motion";
import { getTrendingQuote } from "../api/quote.api";
import Spinner from "./common-component/Spinner";
import useSWR from "swr";

function TrendingQuote() {
  const { data, error, isLoading } = useSWR(
    "trending-quotes",
    getTrendingQuote,
  );

  return (
    <section className=" mt-10 py-20 bg-linear-to-r from-purple-200 via-pink-200 to-violet-100 rounded-2xl  px-6 mb-3 max-w-7xl mx-auto">
      {isLoading ? (
        <div className="flex items-center justify-center h-[20vh]">
          <Spinner />
        </div>
      ) : (
        <>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-purple-400  mb-10"
          >
            🔥 Trending Quotes
          </motion.h2>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {error ? (
              <h2 className="text-slate-900 text-center">
                {error?.response?.data?.message || error?.message}
              </h2>
            ) : (
              data?.map((quote, index) => (
                <motion.div
                  key={quote._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.03 }}
                  className="backdrop-blur-md border border-purple-500/20 p-6 rounded-3xl"
                >
                  <p className=" italic text-lg">"{quote.text}"</p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-purple-400">— {quote.author}</span>

                    <span className="text-pink-400 text-sm">
                      ❤️ {quote.likeCount}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default TrendingQuote;
