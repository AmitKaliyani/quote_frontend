import { motion } from "framer-motion";
import { useNavigate } from "react-router";

function HeroSection() {
  const navigate = useNavigate()
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center pb-3">

      {/* Background Glow Effects */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm">
              ✨ Inspirational Quotes Platform
            </span>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-5xl md:text-7xl font-bold leading-tight text-purple-400"
            >
              Find Words
              <br />
              <span className="bg-linear-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                That Change Lives
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg text-slate-400 max-w-xl"
            >
              Discover inspiring quotes from thinkers, leaders and dreamers.
              Save your favorites and share your own wisdom with the world.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.button
                onClick={() => navigate('/quotes')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-linear-to-r from-purple-600 to-violet-500 text-white font-semibold shadow-xl shadow-purple-500/30 cursor-pointer"
              >
                Explore Quotes
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl border border-purple-500 text-purple-300 hover:bg-purple-500/10 cursor-pointer"
              >
                Create Quote
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative space-y-6"
          >

            {/* Card 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className=" backdrop-blur-md border border-purple-500/20 p-6 rounded-3xl"
            >
              <p className="text-xl  italic">
                "Success is not final, failure is not fatal: it is the courage to continue that counts."
              </p>
              <span className="text-purple-400 mt-4 block">
                — Winston Churchill
              </span>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="ml-10  backdrop-blur-md border border-purple-500/20 p-6 rounded-3xl"
            >
              <p className="text-xl  italic">
                "The future depends on what you do today."
              </p>
              <span className="text-purple-400 mt-4 block">
                — Mahatma Gandhi
              </span>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className=" backdrop-blur-md border border-purple-500/20 p-6 rounded-3xl"
            >
              <p className="text-xl  italic">
                "Believe you can and you're halfway there."
              </p>
              <span className="text-purple-400 mt-4 block">
                — Theodore Roosevelt
              </span>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;