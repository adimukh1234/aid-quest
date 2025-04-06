
import { useEffect } from 'react';

type AnimationCallback = (
  element: Element, 
  scrollProgress: number
) => void;

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollAnimation = (
  selector: string,
  callback: AnimationCallback,
  options: ScrollAnimationOptions = {}
) => {
  useEffect(() => {
    const { threshold = 0.1, rootMargin = '0px' } = options;
    
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Calculate scroll progress (0 to 1)
            const scrollProgress = Math.min(
              Math.max(
                (window.scrollY - entry.target.getBoundingClientRect().top + window.innerHeight) /
                (entry.target.clientHeight + window.innerHeight),
                0
              ),
              1
            );
            
            callback(entry.target, scrollProgress);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Observe all matched elements
    elements.forEach((el) => observer.observe(el));

    // Add scroll event for progress tracking
    const handleScroll = () => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if element is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = Math.min(
            Math.max(
              (windowHeight - rect.top) / (windowHeight + rect.height),
              0
            ),
            1
          );
          
          callback(element, scrollProgress);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selector, callback, options]);
};

export default useScrollAnimation;
