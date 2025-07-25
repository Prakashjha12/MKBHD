import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { FaYoutube, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";
import Logo from "./Images/MKBHD-Logo.png";
import BlurText from "./BlurText";
import Beams from "./Beams";
import "./Hero.css";

const SOCIALS = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/@MKBHD",
    icon: <FaYoutube className="text-red-600" />,
  },
  {
    name: "X",
    url: "https://twitter.com/MKBHD",
    icon: <FaTwitter />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/MKBHD",
    icon: <FaInstagram className="text-pink-500" />,
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@mkbhd",
    icon: <FaTiktok />,
  },
];

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const glitchElements = gsap.utils.toArray(".glitch-img");
      glitchElements.forEach((el, index) => {
        gsap.to(el, {
          x: () => Math.random() * (4 + index) - (2 + index / 2),
          y: () => Math.random() * (4 + index) - (2 + index / 2),
          skewX: () => Math.random() * 3 - 1.5,
          opacity: () => 0.3 + Math.random() * 0.1,
          duration: 0.15 + Math.random() * 0.1,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-4 py-24 md:py-32"
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <Beams
          beamWidth={1.5}
          beamHeight={20}
          beamNumber={20}
          lightColor="#ffffff"
          speed={3.5}
          noiseIntensity={1.8}
          scale={0.25}
          rotation={10}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient-red" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-3xl flex justify-center mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
      >
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl shadow-red-900/20">
          <img
            src={Logo}
            alt="MKBHD Glitch Red"
            className="glitch-img glitch-red absolute inset-0 w-full h-full object-contain z-10"
          />
          <img
            src={Logo}
            alt="MKBHD Glitch Blue"
            className="glitch-img glitch-blue absolute inset-0 w-full h-full object-contain z-20"
          />
          <img
            src={Logo}
            alt="MKBHD Logo Main"
            className="relative w-full h-full object-contain z-30"
          />
          <div className="glitch-noise absolute inset-0 pointer-events-none z-40" />
        </div>
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl text-center mb-6">
        <BlurText
          text="Quality Tech Videos.  Crisp Merchandise."
          delay={200}
          animateBy="words"
          direction="top"
          className="text-white text-5xl sm:text-6xl md:text-5xl lg:text-5xl font-black tracking-tighter ml-8 drop-shadow-lg"
        />
      </div>

      <motion.p
        className="relative z-10 max-w-3xl text-center text-gray-300 mb-12 px-4 text-lg md:text-xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        Explore the latest reviews, deep dives, and exclusive merch crafted for
        true tech lovers.
      </motion.p>

      <motion.div
        className="relative z-10 flex gap-6 justify-center text-4xl mb-12"
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: 1 } },
        }}
        initial="hidden"
        animate="visible"
      >
        {SOCIALS.map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            aria-label={social.name}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      <motion.a
        href="#shop"
        className="relative z-10 inline-block px-12 py-5 rounded-full bg-[#E5202B] text-white text-xl font-bold shadow-xl shadow-red-500/30 transition-all duration-300"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.2 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 40px #E5202B55",
          filter: "brightness(1.1)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        Shop Now
      </motion.a>
    </section>
  );
};

export default Hero;