import { useEffect, useRef } from "react";
import { FaUser, FaCog, FaSignOutAlt, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function Profile({ open, handleLogout, setOpen }) {
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  return (
    <div className="relative" ref={ref}>
      {open && (
        <div className="absolute right-3 mt-2 w-52 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {/* Profile */}
          <button
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <FaUser className="text-gray-500" />
            Profile
          </button>

          {/* Settings */}
          <button
            onClick={() => {
              navigate("/saved-quotes");
              setOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <FaBookmark className="text-gray-500" />
            Saved Quotes
          </button>

          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer">
            <FaCog className="text-gray-500" />
            Settings
          </button>

          {/* Divider */}
          <div className="border-t border-gray-200 my-1" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer"
          >
            <FaSignOutAlt className="text-red-500" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
