import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaYoutube, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaArrowUp
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const MKBHDFooter = () => {
  const [subscriberCount, setSubscriberCount] = useState(20100000); // Initial count
  const [viewCount, setViewCount] = useState(4863334017);
  const [videoCount, setVideoCount] = useState(1750);
  const [loading, setLoading] = useState(true);

  const footerRef = useRef(null);
  const subscriberRef = useRef(null);
  const viewsRef = useRef(null);
  const videosRef = useRef(null);
  const socialRef = useRef(null);
  const linksRef = useRef(null);
  const newsletterRef = useRef(null);

  // YouTube API Configuration
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;// Add your API key here
  const CHANNEL_ID = 'UCBJycsmduvYEL83R_U4JriQ'; // MKBHD's Channel ID

  // Fetch real-time YouTube statistics
  const fetchYouTubeStats = async () => {
    try {
      if (!YOUTUBE_API_KEY) {
        console.warn('YouTube API key not found. Using mock data.');
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        const stats = data.items[0].statistics;
        
        setSubscriberCount(parseInt(stats.subscriberCount));
        setViewCount(parseInt(stats.viewCount));
        setVideoCount(parseInt(stats.videoCount));
      }
    } catch (error) {
      console.error('Error fetching YouTube stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format numbers with animations
  const formatCount = (count) => {
    if (count >= 1000000000) {
      return (count / 1000000000).toFixed(1) + 'B';
    } else if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toLocaleString();
  };

  // Animated counter function
  const animateCounter = (element, endValue) => {
    const obj = { count: 0 };
    gsap.to(obj, {
      count: endValue,
      duration: 2.5,
      ease: "power2.out",
      onUpdate: () => {
        if (element.current) {
          element.current.textContent = formatCount(Math.floor(obj.count));
        }
      }
    });
  };

  // Scroll to top function
  const scrollToTop = () => {
    gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power2.out" });
  };

  useEffect(() => {
    // Fetch YouTube data initially and then every 5 minutes
    fetchYouTubeStats();
    const interval = setInterval(fetchYouTubeStats, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([socialRef.current, linksRef.current, newsletterRef.current], {
        opacity: 0,
        y: 50
      });

      // Animate elements when footer comes into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Staggered animations for different sections
      tl.to(socialRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(linksRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4")
      .to(newsletterRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3");

      // Animate counters when they come into view
      ScrollTrigger.create({
        trigger: subscriberRef.current,
        start: "top 80%",
        onEnter: () => {
          animateCounter(subscriberRef, subscriberCount);
          animateCounter(viewsRef, viewCount);
          animateCounter(videosRef, videoCount);
        },
        once: true
      });

    }, footerRef);

    return () => ctx.revert();
  }, [loading, subscriberCount, viewCount, videoCount]);

  const socialLinks = [
    { icon: FaYoutube, url: 'https://youtube.com/@mkbhd', label: 'YouTube', color: '#FF0000' },
    { icon: FaTwitter, url: 'https://twitter.com/mkbhd', label: 'Twitter', color: '#1DA1F2' },
    { icon: FaInstagram, url: 'https://instagram.com/mkbhd', label: 'Instagram', color: '#E4405F' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/marques-brownlee', label: 'LinkedIn', color: '#0077B5' }
  ];

  const quickLinks = [
    { title: 'Shop', links: ['Merchandise', 'Tech Accessories', 'Gift Cards', 'Size Guide'] },
    { title: 'Content', links: ['Latest Reviews', 'Podcast', 'Behind the Scenes', 'Community'] },
    { title: 'Support', links: ['Contact Us', 'Shipping Info', 'Returns', 'FAQ'] },
    { title: 'Company', links: ['About MKBHD', 'Press Kit', 'Partnerships', 'Careers'] }
  ];

  return (
    <footer ref={footerRef} className="bg-black text-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E5202B] via-transparent to-transparent"></div>
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, #E5202B 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Top Section - Logo and Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          {/* Logo and Brand */}
          <div className="mb-12 lg:mb-0">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-white">MKB</span>
              <span className="text-[#E5202B]">HD</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-md mb-8">
              Quality Tech Videos | Consumer Electronics | Tech Reviews
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-[#E5202B]" />
                <span>New York City, NY</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-[#E5202B]" />
                <span>business@mkbhd.com</span>
              </div>
            </div>
          </div>

          {/* YouTube Statistics */}
          <div className="bg-gray-900 rounded-2xl p-8 min-w-[300px]">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Live <span className="text-[#E5202B]">YouTube</span> Stats
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#E5202B] mb-2">
                  <span ref={subscriberRef}>
                    {loading ? '20.1M' : formatCount(subscriberCount)}
                  </span>
                </div>
                <p className="text-gray-400 uppercase tracking-wider text-sm">Subscribers</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-1">
                    <span ref={viewsRef}>
                      {loading ? '4.86B' : formatCount(viewCount)}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Views</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-1">
                    <span ref={videosRef}>
                      {loading ? '1.75K' : formatCount(videoCount)}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Videos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Links and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 mb-16">
          {/* Quick Links */}
          <div ref={linksRef} className="lg:col-span-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {quickLinks.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-[#E5202B] font-semibold text-lg uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a 
                          href="#" 
                          className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div ref={newsletterRef} className="lg:col-span-12">
            <div className="bg-gray-900 rounded-2xl p-8">
              <h4 className="text-2xl font-bold mb-4">Stay Updated</h4>
              <p className="text-gray-300 mb-6">
                Get notified about new reviews, merch drops, and exclusive content.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-[#E5202B] focus:outline-none transition-colors"
                />
                <button 
                  type="submit"
                  className="w-full bg-[#E5202B] hover:bg-red-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section - Social and Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            {/* Social Links */}
            <div ref={socialRef} className="flex space-x-6 mb-6 lg:mb-0">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label={social.label}
                >
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-all duration-300 group-hover:scale-110">
                    <social.icon 
                      className="text-xl group-hover:text-white transition-colors duration-300" 
                      style={{ color: social.color }}
                    />
                  </div>
                </a>
              ))}
            </div>

            {/* Copyright and Scroll to Top */}
            <div className="flex items-center space-x-6">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} MKBHD. All rights reserved.
              </p>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-[#E5202B] hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Scroll to top"
              >
                <FaArrowUp className="text-white text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MKBHDFooter;
