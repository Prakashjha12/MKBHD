import React, { useRef, useEffect } from "react";
import Logo from "./Images/MKBHD-Logo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FaYoutube, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";
import BlurText from "./BlurText";
import Beams from "./Beams";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

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

const Hero = () => {
  const glitchImg1 = useRef(null);
  const glitchImg2 = useRef(null);
  const glitchImg3 = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const glitchTimeline1 = gsap.timeline({ repeat: -1, yoyo: true });
    glitchTimeline1.to(glitchImg1.current, {
      x: () => Math.random() * 4 - 2,
      y: () => Math.random() * 3 - 1.5,
      skewX: () => Math.random() * 3 - 1.5,
      opacity: () => 0.28 + Math.random() * 0.07,
      duration: 0.13 + Math.random() * 0.09,
      ease: "power1.inOut",
    });

    const glitchTimeline2 = gsap.timeline({ repeat: -1, yoyo: true });
    glitchTimeline2.to(glitchImg2.current, {
      x: () => Math.random() * 5 - 2.5,
      y: () => Math.random() * 3 - 1.5,
      skewY: () => Math.random() * 3 - 1.5,
      opacity: () => 0.28 + Math.random() * 0.07,
      duration: 0.15 + Math.random() * 0.09,
      ease: "power1.inOut",
    });

    const glitchTimeline3 = gsap.timeline({ repeat: -1, yoyo: true });
    glitchTimeline3.to(glitchImg3.current, {
      x: () => Math.random() * 2 - 1,
      y: () => Math.random() * 2 - 1,
      skewX: () => Math.random() * 2 - 1,
      opacity: 1,
      duration: 0.18,
      ease: "power1.inOut",
    });

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.8 }
    );
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-start bg-black overflow-hidden px-6 py-20 md:py-28">
      {/* Beams background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <Beams
          beamWidth={1.2}
          beamHeight={15}
          beamNumber={19}
          lightColor="#ffffff"
          speed={3}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={8}
        />
      </div>

      {/* Radial & linear overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(229,32,43,0.09) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%)",
          zIndex: 1,
        }}
      />

      {/* Glitch Image on top */}
      <div className="relative z-10 w-full max-w-3xl flex justify-center mb-10">
        <div className="relative w-full  aspect-[16/9] max-w-xl rounded-3xl overflow-hidden shadow-lg">
  <img
    ref={glitchImg1}
    src={Logo}
    alt="MKBHD Glitch Red"
    className="glitch-red absolute inset-0 w-full h-full object-cover"
    style={{ zIndex: 1 }}
  />
  <img
    ref={glitchImg2}
    src={Logo}
    alt="MKBHD Glitch Blue"
    className="glitch-blue absolute inset-0 w-full h-full object-cover"
    style={{ zIndex: 2 }}
  />
  <img
    ref={glitchImg3}
    src={Logo}
    alt="MKBHD Logo Main"
    className="glitch-main relative w-full h-full object-cover rounded-3xl"
    style={{ zIndex: 3 }}
  />
  {/* Noise overlay if desired */}

          <div className="glitch-noise absolute inset-0 pointer-events-none">
            {/* SVG noise overlay */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              preserveAspectRatio="none"
            >
              <filter id="noiseFilter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="4"
                  stitchTiles="stitch"
                ></feTurbulence>
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </div>
        </div>
      </div>
    

      {/* Heading */}
      <div className="relative z-10 w-full max-w-6xl text-center mb-6">
        <BlurText
          text="Quality Tech Videos Crisp Merchandise"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-white text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg"
        />
      </div>

      {/* Caption */}
      <p className="relative z-10 max-w-3xl text-center text-gray-400 mb-10 px-4 text-lg leading-relaxed">
        Explore the latest reviews, deep dives, and exclusive merch crafted for true tech lovers.
      </p>

      {/* Social Icons */}
      <motion.div
        className="relative z-10 flex gap-6 justify-center text-3xl mb-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {SOCIALS.map((social, i) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 focus:scale-110 transition-transform rounded-full p-2 bg-gray-900/60 shadow-lg"
            whileHover={{
              scale: 1.25,
              rotate: -8,
              boxShadow: "0 4px 24px #E5202B55",
              backgroundColor: "#222",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            aria-label={social.name}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.a
        ref={ctaRef}
        href="#shop"
        className="relative z-10 inline-block px-8 py-4 rounded-full bg-[#E5202B] text-white text-lg font-bold shadow-xl hover:bg-[#c41c24] focus:bg-[#c41c24] transition-colors duration-200"
        whileHover={{
          scale: 1.07,
          boxShadow: "0 8px 32px #E5202B55",
        }}
        whileTap={{ scale: 0.97 }}
      >
        Shop Now
      </motion.a>
    </section>
  );
};

export default Hero;
