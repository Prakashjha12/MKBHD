import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
 const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
gsap.registerPlugin(ScrollTrigger);

const fallbackThumb = 'https://placehold.co/320x180/222/fff?text=No+Image';
const CHANNEL_ID = 'UCBJycsmduvYEL83R_U4JriQ';  // MKBHD channel id

const LatestContent = () => {
  const sectionRef = useRef();
  const scrollContainerRef = useRef();
  const [modal, setModal] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
 

  // GSAP scroll direction animation refs
  const scrollDirRef = useRef('down');
  const contentWrapperRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.content-card');
    if (cards.length === 0) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );
  }, [videos]);

  // Fetch latest videos from YouTube API
  useEffect(() => {
    if (!apiKey) return;
    setLoading(true);

   fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults6`)


      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          const videoData = data.items
            .filter(item => item.id.kind === "youtube#video")
            .map(item => ({
              id: item.id.videoId,
              type: 'video',
              title: item.snippet.title,
              thumb: item.snippet.thumbnails.high.url,
              url: `https://www.youtube.com/embed/${item.id.videoId}`
            }));
          setVideos(videoData);
        } else setVideos([]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setVideos([]);
      });
  }, [apiKey]);

  // Scroll up/down detection to shift content left/right
  useEffect(() => {
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const onScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;

      if (!contentWrapperRef.current) return;

      if (st > lastScrollTop) {
        // scrolling down → shift left
        if (scrollDirRef.current !== 'down') {
          gsap.to(contentWrapperRef.current, { x: -40, duration: 0.8, ease: 'power3.out' });
          scrollDirRef.current = 'down';
        }
      } else {
        // scrolling up → shift right
        if (scrollDirRef.current !== 'up') {
          gsap.to(contentWrapperRef.current, { x: 40, duration: 0.8, ease: 'power3.out' });
          scrollDirRef.current = 'up';
        }
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Manual scroll on arrow click
  const scrollByAmount = (amount) => {
    if (!scrollContainerRef.current) return;
    gsap.to(scrollContainerRef.current, {
      scrollTo: { x: scrollContainerRef.current.scrollLeft + amount },
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-16 px-4 border-t border-b border-gray-900"
    >
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-4xl md:text-5xl opacity-50 font-light text-white mb-8 text-center tracking-tight">
          Latest Content
        </h2>
        {/* Arrows */}
        <button
          aria-label="Scroll Left"
          onClick={() => scrollByAmount(-300)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#E5202B] bg-opacity-80 hover:bg-opacity-100 text-white shadow-lg"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          aria-label="Scroll Right"
          onClick={() => scrollByAmount(300)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#E5202B] bg-opacity-80 hover:bg-opacity-100 text-white shadow-lg"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Content Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar scroll-smooth pr-6"
          style={{ scrollBehavior: 'smooth' }}
          onScroll={() => {
            if (contentWrapperRef.current) {
              contentWrapperRef.current.style.transform = 'translateX(0)';
            }
          }}   
             ref={contentWrapperRef}
    
          
        >
          {(loading ? Array.from({ length: 6 }) : videos).map((item, idx) => (
            <motion.div
              key={item?.id || idx}
              className="content-card min-w-[320px] max-w-xs bg-gray-900 rounded-2xl shadow-lg p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform relative group"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px #E5202B33' }}
              onClick={() => !loading && item && setModal(item)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
            >
              <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                <img
                  src={item?.thumb || fallbackThumb}
                  alt={item?.title || 'Loading...'}
                  className="w-full h-full object-cover rounded-xl group-hover:opacity-80 transition"
                  onError={e => (e.currentTarget.src = fallbackThumb)}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                  <span className="text-white text-4xl font-bold">▶</span>
                </div>
              </div>
              <div className="text-lg font-semibold text-white text-center mb-1 line-clamp-2">
                {item?.title || 'Loading...'}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">YouTube Video</div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {modal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-2xl w-full relative"
                initial={{ scale: 0.9, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 40, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              >
                <button
                  onClick={() => setModal(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
                  aria-label="Close"
                >
                  &times;
                </button>
                <iframe
                  src={modal.url}
                  title={modal.title}
                  className="w-full aspect-video rounded-xl mb-4"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
                <div className="text-2xl font-bold text-white mb-2">{modal.title}</div>
                <div className="text-sm text-gray-400 mb-2">YouTube Video</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LatestContent;
