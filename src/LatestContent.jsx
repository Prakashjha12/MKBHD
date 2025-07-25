import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCBJycsmduvYEL83R_U4JriQ';
const fallbackThumb = 'https://placehold.co/320x180/222/fff?text=No+Image';

const LatestContent = () => {
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const scrollDirRef = useRef('down');
    const [videos, setVideos] = useState([]);
    const [modal, setModal] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!apiKey) return;

        setLoading(true);
        fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`)
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
                } else {
                    setVideos([]);
                }
            })
            .catch(() => setVideos([]))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
    
        let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
        const onScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
    
            if (st > lastScrollTop) {
                if (scrollDirRef.current !== 'down') {
                    gsap.to(container, { x: -40, duration: 0.8, ease: 'power3.out' });
                    scrollDirRef.current = 'down';
                }
            } else if (st < lastScrollTop) {
                if (scrollDirRef.current !== 'up') {
                    gsap.to(container, { x: 40, duration: 0.8, ease: 'power3.out' });
                    scrollDirRef.current = 'up';
                }
            }
            lastScrollTop = st <= 0 ? 0 : st;
        };
    
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollByAmount = (amount) => {
        if (!scrollContainerRef.current) return;
        gsap.to(scrollContainerRef.current, {
            scrollTo: { x: `+=${amount}` },
            duration: 0.6,
            ease: 'power3.inOut',
        });
    };

    return (
        <section ref={sectionRef} className="relative w-full bg-black py-16 px-4 border-t border-b border-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                <h2 className="text-4xl md:text-5xl opacity-50 font-light text-white mb-8 text-center tracking-tight">
                    Latest Content
                </h2>
                
                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between z-20 px-0 md:-px-8 pointer-events-none">
                    <button
                        aria-label="Scroll Left"
                        onClick={() => scrollByAmount(-340)}
                        className="pointer-events-auto p-3 rounded-full bg-[#E5202B] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                    >
                        <FaChevronLeft size={20} />
                    </button>
                    <button
                        aria-label="Scroll Right"
                        onClick={() => scrollByAmount(340)}
                        className="pointer-events-auto p-3 rounded-full bg-[#E5202B] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                    >
                        <FaChevronRight size={20} />
                    </button>
                </div>
                
                <div ref={scrollContainerRef} className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar">
                    {(loading ? Array.from({ length: 6 }) : videos).map((item, idx) => (
                        <motion.div
                            key={item?.id || idx}
                            className="content-card min-w-[320px] max-w-xs bg-gray-900 rounded-2xl shadow-lg p-4 flex flex-col items-center cursor-pointer group"
                            whileHover={{ scale: 1.05, y: -5, boxShadow: '0 8px 32px #E5202B33' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            onClick={() => !loading && item && setModal(item)}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                                <img
                                    src={item?.thumb || fallbackThumb}
                                    alt={item?.title || 'Loading...'}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    onError={e => (e.currentTarget.src = fallbackThumb)}
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                                    <span className="text-white text-5xl font-bold">▶</span>
                                </div>
                            </div>
                            <h3 className="text-base font-semibold text-white text-center mb-1 line-clamp-2">
                                {item?.title || 'Loading Content...'}
                            </h3>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">YouTube Video</p>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {modal && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModal(null)}
                        >
                            <motion.div
                                className="bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full relative"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        src={`${modal.url}?autoplay=1`}
                                        title={modal.title}
                                        className="w-full h-full rounded-t-2xl"
                                        allow="autoplay; encrypted-media; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{modal.title}</h3>
                                    <p className="text-sm text-gray-400">YouTube Video</p>
                                </div>
                                <button
                                    onClick={() => setModal(null)}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-white bg-black/50 rounded-full p-1.5 transition-colors"
                                    aria-label="Close"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default LatestContent;