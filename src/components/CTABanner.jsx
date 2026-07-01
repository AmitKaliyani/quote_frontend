import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function CTABanner() {
  const user = useSelector((state) => state.auth.isAuthenticated);
  // console.log(user);

  return (
    <section className="py-20 px-6 relative flex justify-center overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
        className="relative max-w-5xl w-full text-center 
                   bg-white/5 backdrop-blur-xl 
                   border border-purple-500/20 
                   rounded-3xl p-12 shadow-2xl"
      >
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block w-full sm:w-auto md:px-4 py-2 rounded-full 
                     bg-purple-500/10 border border-purple-500/30 
                     text-purple-400 text-sm mb-6"
        >
          ✨ Ready to get inspired?
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold text-purple-400"
        >
          Explore 10,000+ Inspiring Quotes
        </motion.h2>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 mt-4 max-w-xl mx-auto"
        >
          Discover wisdom from great minds, save your favorites, and create your
          own legacy of thoughts.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Link to="/quotes">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl 
                         bg-linear-to-r from-purple-600 to-violet-500 
                         text-white font-semibold shadow-xl 
                         shadow-purple-500/30 cursor-pointer"
            >
              Browse Quotes
            </motion.button>
          </Link>

          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-xl 
                         border border-purple-500 
                         text-purple-300 
                         hover:bg-purple-500/10 cursor-pointer
                         ${user ? "hidden" : ""}
                         `}
            >
              Create Account
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default CTABanner;
