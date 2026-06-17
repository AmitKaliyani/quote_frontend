import { Link } from "react-router";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="relative mt-10 border-t border-purple-500/20 bg-purple-900 backdrop-blur-md ">
      {/* Glow Effect */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-600/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-2xl font-bold text-white">🚀 QuoteHub</h1>

            <p className="text-slate-400 text-sm leading-relaxed">
              Discover inspiring quotes, save your favorites, and share your own
              wisdom with the world.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-white font-semibold text-lg">Quick Links</h2>

            <div className="flex flex-col gap-2 text-slate-400">
              <Link to="/" className="hover:text-purple-400 transition">
                Home
              </Link>

              <Link to="/quotes" className="hover:text-purple-400 transition">
                Quotes
              </Link>

              <Link to="/signup" className="hover:text-purple-400 transition">
                Signup
              </Link>

              <Link to="/login" className="hover:text-purple-400 transition">
                Login
              </Link>
            </div>
          </motion.div>

          {/* CTA / Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-white font-semibold text-lg">Stay Inspired</h2>

            <p className="text-slate-400 text-sm">
              Join thousands of users sharing daily inspiration.
            </p>

            <button className=" cursor-pointer mt-2 px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-violet-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:scale-105 transition">
              Create Quote
            </button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-purple-500/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} QuoteHub. All rights reserved.
          </p>

          <div className="flex gap-6 text-slate-400 text-sm">
            <Link href="#" className="hover:text-purple-400">
              Privacy
            </Link>
            <Link href="#" className="hover:text-purple-400">
              Terms
            </Link>
            <Link href="#" className="hover:text-purple-400">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
