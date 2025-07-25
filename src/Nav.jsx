import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "./GlitchText";

const navLinks = [
  { name: "Shop", to: "/shop" },
  { name: "Latest Video", to: "/video" },
  { name: "About", to: "#about" },
];

const Nav = ({ cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAboutClick = (e, to) => {
    e.preventDefault();
    setIsOpen(false); 

    if (location.pathname === "/") {
      const aboutEl = document.querySelector(to);
      if (aboutEl) {
        aboutEl.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", to);
      }
    } else {
      navigate(`/${to}`);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.4
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-gray-800"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
        <button
          onClick={() => navigate("/")}
          aria-label="Go to homepage"
          className="cursor-pointer focus:outline-none"
        >
          <GlitchText
            speed={3}
            enableShadows={true}
            enableOnHover={true}
            className="text-white text-xl md:text-2xl font-bold"
          >
            MKBHD
          </GlitchText>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.li
              key={`${link.name}-desktop`}
              whileHover={{ scale: 1.1, color: "#E5202B" }}
              whileTap={{ scale: 0.95 }}
              className="text-white text-lg font-semibold cursor-pointer transition-colors"
            >
              {link.to.startsWith("#") ? (
                <a href={link.to} onClick={(e) => handleAboutClick(e, link.to)}>
                  {link.name}
                </a>
              ) : (
                <Link to={link.to}>{link.name}</Link>
              )}
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative group" aria-label="Go to cart">
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white group-hover:text-[#E5202B] transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </motion.svg>
            {cart?.length > 0 && (
              <motion.span
                className="absolute -top-2 -right-2 bg-[#E5202B] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {cart.length}
              </motion.span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              animate={isOpen ? "open" : "closed"}
            >
              <motion.path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 6 L 22 6" },
                  open: { d: "M 4 18 L 20 2" },
                }}
              />
              <motion.path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M 2 12 L 22 12"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              />
              <motion.path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 18 L 22 18" },
                  open: { d: "M 4 2 L 20 18" },
                }}
              />
            </motion.svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 w-full h-screen bg-black md:hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.ul
              className="flex flex-col items-center justify-center h-2/3 gap-10"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={`${link.name}-mobile`}
                  variants={linkVariants}
                  className="text-white text-3xl font-semibold"
                >
                  {link.to.startsWith("#") ? (
                    <a href={link.to} onClick={(e) => handleAboutClick(e, link.to)}>
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.to} onClick={handleLinkClick}>
                      {link.name}
                    </Link>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Nav;