import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: 2008, event: "Started YouTube channel packing simple tech reviews." },
  { year: 2013, event: "Hit 1M subscribers milestone, gained global attention." },
  { year: 2016, event: "Began high-quality 4K video production." },
  { year: 2018, event: "Launched MKBHD merch line — premium tech-inspired apparel." },
  { year: 2020, event: "Won Shorty Award for Best in Tech Video Content." },
  { year: 2023, event: "Expanded into podcasting and live events." },
  { year: 2025, event: "Reached 20M+ YouTube subscribers, continued innovation." },
];

const testimonials = [
  {
    name: "Susan Wojcicki",
    title: "Former YouTube CEO",
    text: "Marques changed the way tech reviews are made online, inspiring millions worldwide.",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Linus Sebastian",
    title: "Tech YouTuber", 
    text: "MKBHD sets the standard for quality and professionalism in tech content.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Justine Ezarik",
    title: "Tech Influencer",
    text: "Working with Marques is a masterclass in creativity and dedication.",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
  },
];

const AboutTimeline = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    // Set initial visibility and animate
    const ctx = gsap.context(() => {
      // Title animation
      gsap.set(titleRef.current, { opacity: 1, y: 0 });
      gsap.from(titleRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      // Timeline items animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems) {
        gsap.set(timelineItems, { opacity: 1, y: 0 });
        gsap.from(timelineItems, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }

      // Testimonials animation
      const testimonialItems = testimonialsRef.current?.querySelectorAll('.testimonial-card');
      if (testimonialItems) {
        gsap.set(testimonialItems, { opacity: 1, y: 0 });
        gsap.from(testimonialItems, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="bg-black text-white py-20 px-6 min-h-screen relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Title - Fixed visibility */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#E5202B] drop-shadow-lg">
            About MKBHD
          </h2>
          <div className="w-24 h-1 bg-[#E5202B] mx-auto mt-4"></div>
        </div>

        {/* Timeline - Fixed layout and visibility */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Journey & Milestones</h3>
          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-[#E5202B]"></div>
            
            {milestones.map(({ year, event }, index) => (
              <div key={year} className="timeline-item relative flex items-start mb-12 pl-20">
                {/* Timeline dot */}
                <div className="absolute left-6 top-2 w-4 h-4 bg-[#E5202B] rounded-full border-4 border-black shadow-lg z-10"></div>
                
                {/* Content */}
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex-1 relative">
                  <div className="absolute left-0 top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-900 -ml-2"></div>
                  <time className="text-xl font-bold text-[#E5202B] block mb-2">
                    {year}
                  </time>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials - Fixed grid and visibility */}
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-12">What Others Say</h3>
          <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map(({ name, title, text, avatar }, index) => (
              <div key={index} className="testimonial-card bg-gray-900 p-6 rounded-xl shadow-xl">
                <div className="flex flex-col items-center text-center h-full">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-20 h-20 rounded-full border-4 border-[#E5202B] mb-4 object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${name}&background=E5202B&color=fff&size=80`;
                    }}
                  />
                  <blockquote className="text-gray-300 mb-4 italic text-lg flex-1">
                    "{text}"
                  </blockquote>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{name}</h4>
                    <span className="text-[#E5202B] text-sm font-medium">{title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
