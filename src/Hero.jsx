import React, { useRef, useEffect } from 'react';
import Logo from './Images/MKBHD-Logo.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { FaYoutube, FaTwitter, FaInstagram, FaTiktok } from 'react-icons/fa';
import BlurText from './BlurText';
import Beams from './Beams';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  {
    name: 'YouTube',
    url: 'https://youtube.com/MKBHD',
    icon: <FaYoutube className="text-red-600" />,
  },
  {
    name: 'X',
    url: 'https://twitter.com/MKBHD',
    icon: <FaTwitter className="text-white" />,
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/MKBHD',
    icon: <FaInstagram className="text-pink-500" />,
  },
  {
    name: 'TikTok',
    url: 'https://tiktok.com/@mkbhd',
    icon: <FaTiktok className="text-white" />,
  },
];

const Hero = () => {
  const glitchImg1 = useRef(null);
  const glitchImg2 = useRef(null);
  const glitchImg3 = useRef(null);
  const imageContainer = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const glitchTimeline1 = gsap.timeline({ repeat: -1, yoyo: true });
    glitchTimeline1.to(glitchImg1.current, {
      x: () => Math.random() * 4 - 2,
      y: () => Math.random() * 3 - 1.5,
      skewX: () => Math.random() * 3 - 1.5,
      opacity: () => 0.28 + Math.random() * 0.07,
      duration: 0.13 + Math.random() * 0.09,
      ease: 'power1.inOut',
    });
    const glitchTimeline2 = gsap.timeline({ repeat: -1, yoyo: true });
    glitchTimeline2.to(glitchImg2.current, {
      x: () => Math.random() * 5 - 2.5,
      y: () => Math.random() * 3 - 1.5,
      skewY: () => Math.random() * 3 - 1.5,
      opacity: () => 0.28 + Math.random() * 0.07,
      duration: 0.15 + Math.random() * 0.09,
      ease: 'power1.inOut',
    });
    const glitchTimeline3 = gsap.timeline({ repeat: -1, yoyo: true });
    glitchTimeline3.to(glitchImg3.current, {
      x: () => Math.random() * 2 - 1,
      y: () => Math.random() * 2 - 1,
      skewX: () => Math.random() * 2 - 1,
      opacity: 1,
      duration: 0.18,
      ease: 'power1.inOut',
    });

    gsap.to(imageContainer.current, {
      scale: 0.1,
      scrollTrigger: {
        trigger: imageContainer.current,
        start: 'top top',
        end: 'bottom+=200 top',
        scrub: true,
      },
    });

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-black overflow-hidden">
     
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          pointerEvents: 'none',
        }}
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
      {/* Radial and linear overlays for extra depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 60% 40%, rgba(229,32,43,0.09) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg,rgba(0,0,0,0.0) 60%,rgba(0,0,0,0.7) 100%)",
          zIndex: 2,
        }}
      />
      {/* Foreground Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16 md:py-28 gap-12 md:gap-0">
        {/* Left Glitch Logo */}
        <motion.div
          id="left"
          className="w-full md:w-1/2 relative flex items-center justify-center mb-10 md:mb-0 md:-ml-16"
          ref={imageContainer}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ zIndex: 10 }}
        >
          <img
            ref={glitchImg1}
            className="h-[40vh] md:h-[60vh] w-full object-cover rounded-3xl absolute top-0 left-0 glitch-red"
            src={Logo}
            alt="MKBHD logo red glitch"
            style={{ zIndex: 1 }}
          />
          <img
            ref={glitchImg2}
            className="h-[40vh] md:h-[60vh] w-full object-cover rounded-3xl absolute top-0 left-0 glitch-blue"
            src={Logo}
            alt="MKBHD logo blue glitch"
            style={{ zIndex: 2 }}
          />
          <img
            ref={glitchImg3}
            className="h-[40vh] md:h-[60vh] w-full object-cover rounded-3xl relative glitch-main"
            src={Logo}
            alt="MKBHD main logo"
            style={{ zIndex: 3 }}
          />
          <div className="glitch-noise" style={{ zIndex: 5 }}>
            <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="none">
              <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </div>
        </motion.div>
        {/* Right: BlurText headline, socials, CTA */}
        <div className="hero-title flex flex-col items-center md:items-start md:w-1/2" style={{ zIndex: 10 }}>
          <BlurText
            text="Quality Tech Videos Crisp Merchandise"
            delay={150}
            animateBy="words"
            direction="top"
            className="hero-headline text-white text-center md:text-left text-4xl md:text-7xl font-extrabold mb-8 tracking-tight drop-shadow-lg"
          />
          <motion.div
            className="flex gap-6 mt-6 mb-10 justify-center md:justify-start text-2xl md:text-3xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
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
                  boxShadow: '0 4px 24px #E5202B55',
                  backgroundColor: '#222',
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
          <motion.a
            ref={ctaRef}
            href="#shop"
            className="inline-block px-8 py-4 rounded-full bg-[#E5202B] text-white text-lg font-bold shadow-xl hover:bg-[#c41c24] focus:bg-[#c41c24] transition-colors duration-200 mt-2"
            whileHover={{
              scale: 1.07,
              boxShadow: '0 8px 32px #E5202B55',
            }}
            whileTap={{ scale: 0.97 }}
          >
            Shop Now
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
