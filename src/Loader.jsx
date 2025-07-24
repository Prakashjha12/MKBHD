import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from './Images/MKBHD-Logo.png';
import './Loader.css';

gsap.registerPlugin(ScrollTrigger);

export default function Loader({ children }) {
  // Only show the loader if NOT already shown this tab/session
  const [shouldShowLoader, setShouldShowLoader] = useState(() => !sessionStorage.getItem('loaderShown'));
  const [loaded, setLoaded] = useState(false);

  const overlayRef = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef(null);
  const glitchRef1 = useRef(null);
  const glitchRef2 = useRef(null);
  const glitchMain = useRef(null);

  useEffect(() => {
    // Instantly skip loader if already shown this session:
    if (!shouldShowLoader) {
      setLoaded(true);
      return;
    }

    const total = document.images.length + document.fonts.size;
    let loadedCount = 0;
    let timeoutId;

    timeoutId = setTimeout(() => {
      finished();
    }, 2000);

    const update = () => {
      loadedCount += 1;
      const progress = Math.min(loadedCount / Math.max(total, 1), 1);
      if (percentRef.current) {
        percentRef.current.textContent = `${Math.round(progress * 100)}%`;
      }
      gsap.to(barRef.current, { scaleX: progress, ease: 'power4.out', duration: 0.3 });
      
      if (progress >= 1) {
        clearTimeout(timeoutId);
        finished();
      }
    };

    if (total === 0) {
      clearTimeout(timeoutId);
      finished();
      return;
    }

    [...document.images].forEach(img => {
      if (img.complete) {
        update();
      } else {
        img.addEventListener('load', update, { once: true });
        img.addEventListener('error', update, { once: true });
      }
    });

    if (document.fonts && document.fonts.size > 0) {
      document.fonts.forEach(font => {
        if (font.status === 'loaded') {
          update();
        } else {
          font.loaded.then(update).catch(update);
        }
      });
    }

    function finished() {
      // Play the exit animation, then hide the loader:
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('loaderShown', 'true'); // Set flag so no reload this tab
          setLoaded(true);
        }
      });

      tl.to([glitchRef1.current, glitchRef2.current], { opacity: 0, duration: 0.12 })
        .to(percentRef.current, { opacity: 0, y: -20, duration: 0.3 }, '<')
        .to(barRef.current, { opacity: 0, duration: 0.2 }, '<')
        .to(glitchMain.current, { 
          scale: 1.8, 
          opacity: 0, 
          y: -20,
          duration: 0.6, 
          ease: 'power2.inOut' 
        })
        .to(overlayRef.current, { height: 0, duration: 0.8, ease: 'power4.inOut' }, '<0.1');
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [shouldShowLoader]);


  if (loaded) return children;

  // Loader markup
  return (
    <div className="loader-wrapper">
      <div ref={overlayRef} className="loader-overlay" />
      <div className="logo-stack">
        <img ref={glitchRef1} src={Logo} alt="logo" className="logo red" />
        <img ref={glitchRef2} src={Logo} alt="logo" className="logo blue" />
        <img ref={glitchMain} src={Logo} alt="logo" className="logo main" />
      </div>
      <div className="progress">
        <div ref={barRef} className="bar" />
        <span ref={percentRef} className="percent">0%</span>
      </div>
    </div>
  );
}
