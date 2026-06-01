import { motion } from "framer-motion";

function About() {
  return (
    <div className="min-h-screen  text-violet-800 px-4 py-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl md:text-5xl font-bold">
            About <span className="text-purple-400">QuoteHub</span>
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto">
            A modern platform to discover, create, and share inspiring quotes
            that motivate millions of people around the world.
          </p>
        </motion.div>

        {/* GRID SECTION */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-purple-500/20 
                       rounded-3xl p-8 space-y-4 hover:scale-[1.02] transition"
          >
            <h2 className="text-2xl font-semibold text-purple-400">
              ✨ Our Mission
            </h2>

            <p className="text-slate-300 leading-relaxed">
              We believe words have power. QuoteHub is built to spread
              positivity, motivation, and wisdom through simple yet powerful
              quotes shared by people like you.
            </p>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-purple-500/20 
                       rounded-3xl p-8 space-y-4 hover:scale-[1.02] transition"
          >
            <h2 className="text-2xl font-semibold text-purple-400">
              🚀 What We Do
            </h2>

            <p className="text-slate-300 leading-relaxed">
              Users can explore trending quotes, search by categories, save
              favorites, and even create their own quotes to inspire others.
            </p>
          </motion.div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Quotes", value: "10K+" },
            { label: "Users", value: "5K+" },
            { label: "Categories", value: "10+" },
            { label: "Daily Views", value: "50K+" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-md border border-purple-500/20 
                         rounded-2xl p-6 hover:bg-purple-500/10 transition"
            >
              <h3 className="text-2xl font-bold text-purple-400">
                {item.value}
              </h3>
              <p className="text-slate-400 text-sm mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center bg-white/5 backdrop-blur-xl 
                     border border-purple-500/20 rounded-3xl p-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Start Sharing Your <span className="text-purple-400">Wisdom</span>
          </h2>

          <p className="text-slate-400 mt-3">
            Join the community and inspire the world with your thoughts.
          </p>

          <button className="mt-6 px-8 py-4 rounded-xl bg-linear-to-r from-purple-600 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 transition">
            Create Quote
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
