import { Link, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaAnchor,
  FaUser,
  FaBlog,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { logoutUser } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import Profile from "../Profile";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [openProfile, setOpenProfile] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/login");
  };

  const handleProfile = () => {
    setOpenProfile((prev) => !prev);
  };
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-r from-purple-600 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              🚀
            </div>

            <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              QuoteHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`flex items-center gap-2  hover:text-purple-400 transition-all duration-300 ${isActive("/") ? "text-purple-400" : "text-slate-300"}`}
            >
              <FaHome />
              <span>Home</span>
            </Link>
            <Link
              to="/quotes"
              className={`flex items-center gap-2  hover:text-purple-400 transition-all duration-300 ${isActive("/quotes") ? "text-purple-400" : "text-slate-300"}`}
            >
              <FaBlog />
              <span>Quotes</span>
            </Link>

            {/*  lgoin user route */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-8">
                <Link
                  to="/my-quotes"
                  className={`flex items-center gap-2  hover:text-purple-400 transition-all duration-300 ${isActive("/my-quotes") ? "text-purple-400" : "text-slate-300"}`}
                >
                  <FaAnchor />
                  <span>Get My Quotes</span>
                </Link>
              </div>
            )}

            <Link
              to="/about"
              className={`flex items-center gap-2  hover:text-purple-400 transition-all duration-300 ${isActive("/about") ? "text-purple-400" : "text-slate-300"}`}
            >
              <FaInfoCircle />
              <span>About</span>
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleProfile}
                className="px-2 py-2 rounded-full border-2  border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 cursor-pointer"
              >
                <FaUser />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-1 rounded-lg border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-1 rounded-lg bg-linear-to-r from-purple-600 to-violet-500 text-white font-medium shadow-lg shadow-purple-500/30 hover:scale-105 transition-all duration-300"
              >
                Signup
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-purple-400 text-xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 border-t border-purple-500/20" : "max-h-0"
          }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-md px-4 py-4 space-y-2">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-purple-600/20 hover:text-purple-400 transition-all duration-300"
          >
            <FaHome />
            Home
          </Link>

          <Link
            to="/quotes"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-purple-600/20 hover:text-purple-400 transition-all duration-300"
          >
            <FaBlog />
            Quotes
          </Link>

          {isAuthenticated && (
            <Link
              to="/my-quotes"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-purple-600/20 hover:text-purple-400 transition-all duration-300"
            >
              <FaAnchor />
              Get My Quotes
            </Link>
          )}
          <Link
            to="/about"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-purple-600/20 hover:text-purple-400 transition-all duration-300"
          >
            <FaInfoCircle />
            About
          </Link>

          <div className="border-t border-slate-700 my-3"></div>

          {isAuthenticated ? (
            <div className="flex flex-col gap-3 ">
              <button
                onClick={() => {
                  handleProfile();
                  closeMenu();
                }}
                className=" flex justify-center py-3 rounded-xl bg-linear-to-r from-purple-600 to-violet-500 text-white font-medium shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300"
              >
                <FaUser className="cursor-pointer" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-center py-3 rounded-xl border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                className="text-center py-3 rounded-xl bg-linear-to-r from-purple-600 to-violet-500 text-white font-medium shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>

      <Profile
        open={openProfile}
        handleLogout={handleLogout}
        setOpen={setOpenProfile}
      />
    </nav>
  );
}

export default Navbar;
