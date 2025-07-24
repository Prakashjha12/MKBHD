import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './Glitch.css';

gsap.registerPlugin(ScrollTrigger);

function GlitchTitle() {
  const wrapper = useRef(null);
  const glitch1 = useRef(null);
  const glitch2 = useRef(null);

  useEffect(() => {
    // Subtle float animation for the wrapper
    gsap.fromTo(
      wrapper.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
    gsap.to(wrapper.current, {
      y: '+=12',
      repeat: -1,
      yoyo: true,
      duration: 2.8,
      ease: "sine.inOut"
    });

    // Gentle color shift on glitch layers
    gsap.to(glitch1.current, {
      filter: 'hue-rotate(20deg)',
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: 'sine.inOut'
    });
    gsap.to(glitch2.current, {
      filter: 'hue-rotate(-20deg)',
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: 'sine.inOut'
    });

    // Smooth scale up and down on scroll
    gsap.to(wrapper.current, {
      scale: 1,
      scrollTrigger: {
        trigger: wrapper.current,
        start: "top bottom",
        end: "center center",
        scrub: true,
        onUpdate: self => {
          // Calculate progress: 0 (start) -> 0.5 (center) -> 1 (end)
          const progress = self.progress;
          // Scale: 0.8 at start, 1 at center, 0.8 at end
          let scale;
          if (progress < 0.5) {
            scale = 0.8 + progress * 0.4;
          } else {
            scale = 1.2 - progress * 0.4;
          }
          gsap.set(wrapper.current, { scale });
        }
      }
    });
  }, []);

  return (
    <div className="glitch-wrapper" ref={wrapper}>
      <h1 id='shop' className="glitch-text base">Shop</h1>
      <h1 className="glitch-text glitch1" ref={glitch1}>Shop</h1>
      <h1 className="glitch-text glitch2" ref={glitch2}>Shop</h1>
    </div>
  );
}
export default GlitchTitle;