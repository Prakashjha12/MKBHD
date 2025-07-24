import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GlitchText from "./GlitchText";

const navLinks = [
  { name: "Shop", to: "/shop" },
  { name: "Latest Video", to: "/video" },
  { name: "About", to: "#about" },
];

const Nav = ({ cart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handles smooth scrolling for hash links if on homepage,
  // otherwise navigates to homepage with hash.
  const handleAboutClick = (e, to) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const aboutEl = document.querySelector(to);
      if (aboutEl) {
        aboutEl.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", to);
      }
    } else {
      e.preventDefault();
      navigate(`/${to}`);
    }
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-gray-800"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* GlitchText logo linking to home */}
        <button
          onClick={() => navigate("/")}
          aria-label="Go to homepage"
          className="cursor-pointer focus:outline-none"
        >
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="text-white text-base sm:text-lg md:text-xl font-bold"
          >
            MKBHD
          </GlitchText>
        </button>

        {/* Navigation Links */}
        <ul className="flex gap-6">
          {navLinks.map((link) => {
            if (link.to.startsWith("#")) {
              return (
                <motion.li
                  key={link.name}
                  whileHover={{ scale: 1.13, color: "#E5202B" }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white text-lg font-semibold cursor-pointer transition-colors duration-200"
                >
                  <a href={link.to} onClick={(e) => handleAboutClick(e, link.to)}>
                    {link.name}
                  </a>
                </motion.li>
              );
            }
            return (
              <motion.li
                key={link.name}
                whileHover={{ scale: 1.13, color: "#E5202B" }}
                whileTap={{ scale: 0.95 }}
                className="text-white text-lg font-semibold cursor-pointer transition-colors duration-200"
              >
                <Link to={link.to}>{link.name}</Link>
              </motion.li>
            );
          })}
        </ul>

        {/* Cart Icon */}
        <Link to="/cart" className="relative ml-6 group" id="cart-icon" aria-label="Go to cart">
          <motion.svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white group-hover:text-[#E5202B] transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8M8 16h8M10 8h4" />
          </motion.svg>
          {cart && cart.length > 0 && (
            <motion.span
              className="absolute -top-2 -right-2 bg-[#E5202B] text-white text-xs rounded-full px-2 py-0.5 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {cart.length}
            </motion.span>
          )}
        </Link>
      </div>
    </motion.nav>
  );
};

export default Nav;
