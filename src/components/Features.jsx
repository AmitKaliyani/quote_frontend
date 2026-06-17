import { motion } from "framer-motion";

const features = [
  {
    title: "Discover Quotes",
    desc: "Explore thousands of inspiring quotes from great minds.",
    icon: "🔍",
  },
  {
    title: "Save Favorites",
    desc: "Bookmark quotes you love for quick access anytime.",
    icon: "❤️",
  },
  {
    title: "Create & Share",
    desc: "Share your own thoughts and inspire the world.",
    icon: "✍️",
  },
];

function Features() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-purple-400 mb-12 text-center"
      >
        ✨ Why QuoteHub?
      </motion.h2>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className=" backdrop-blur-md border border-purple-500/20 p-8 rounded-3xl text-center"
          >
            <div className="text-4xl mb-4">{f.icon}</div>

            <h3 className="text-xl  font-semibold mb-2">
              {f.title}
            </h3>

            <p className="text-slate-400">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;