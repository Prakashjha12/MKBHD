import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaYoutube, FaTwitter, FaInstagram, FaTiktok, FaSun, FaMoon } from "react-icons/fa";
import gsap from "gsap";

const navLinks = [
  { name: "Shop", to: "/shop" },
  { name: "Latest Video", to: "/video" },
  { name: "About", to: "#about" },
];

const SOCIALS = [
  {
    name: "YouTube",
    url: "https://youtube.com/MKBHD",
    icon: <FaYoutube className="text-red-600" />,
  },
  {
    name: "X",
    url: "https://twitter.com/MKBHD",
    icon: <FaTwitter className="text-white" />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/MKBHD",
    icon: <FaInstagram className="text-pink-500" />,
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@mkbhd",
    icon: <FaTiktok className="text-white" />,
  },
];

const GlitchText = ({ text }) => {
  const layer1 = useRef(null);
  const layer2 = useRef(null);
  const layer3 = useRef(null);

  useEffect(() => {
    const tl1 = gsap.timeline({ repeat: -1, yoyo: true });
    tl1.to(layer1.current, {
      x: 2,
      y: -1,
      skewX: 3,
      opacity: 0.7,
      duration: 0.1,
      ease: "power1.inOut",
    });
    const tl2 = gsap.timeline({ repeat: -1, yoyo: true, delay: 0.1 });
    tl2.to(layer2.current, {
      x: -2,
      y: 1,
      skewY: 3,
      opacity: 0.7,
      duration: 0.1,
      ease: "power1.inOut",
    });
    // Layer3 remains steady for main text
  }, []);

  return (
    <span className="relative inline-block font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl select-none cursor-default" aria-label={text} role="heading" aria-level="1">
      <span
        aria-hidden="true"
        ref={layer1}
        className="absolute top-0 left-0 text-[#E5202B] clip-[rect(2px,9999px,44px,0)]"
        style={{ userSelect: "none" }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        ref={layer2}
        className="absolute top-0 left-0 text-[#00ffff] clip-[rect(12px,9999px,56px,0)]"
        style={{ userSelect: "none" }}
      >
        {text}
      </span>
      <span ref={layer3} className="relative text-white">
        {text}
      </span>
    </span>
  );
};

const Nav = ({ cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("darkMode", darkMode);
    }
  }, [darkMode]);

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
      className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-gray-800 dark:bg-white/90 dark:border-gray-300"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-4 sm:gap-0">
        {/* Glitch Text Logo */}
        <Link to="/" className="flex items-center gap-3 select-none">
          <GlitchText text="MKBHD" />
        </Link>

        {/* Navigation Links */}
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-lg font-semibold">
          {navLinks.map((link) => {
            if (link.to.startsWith("#")) {
              return (
                <motion.li
                  key={link.name}
                  whileHover={{ scale: 1.13, color: "#E5202B" }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer transition-colors duration-200 text-white dark:text-black"
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
                className="text-white dark:text-black cursor-pointer transition-colors duration-200"
              >
                <Link to={link.to}>{link.name}</Link>
              </motion.li>
            );
          })}
        </ul>

        {/* Social Icons + Cart + Dark Mode Toggle */}
        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-2xl text-white dark:text-black">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E5202B] transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <Link
            to="/cart"
            className="relative group"
            aria-label="Shopping cart"
            id="cart-icon"
          >
            <motion.svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white dark:text-black group-hover:text-[#E5202B] transition-colors"
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

          {/* Dark Mode Toggle */}
          <button
            aria-label="Toggle Dark Mode"
            onClick={() => setDarkMode((prev) => !prev)}
            className="text-white dark:text-black text-2xl focus:outline-none hover:text-[#E5202B] transition-colors"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
