
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Positive values move slower, negative values move faster
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  speed = 0.3,
  direction = 'up',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const getDirectionalTransform = (y: number) => {
      const value = y * speed;
      switch (direction) {
        case 'up': return `translateY(${-value}px)`;
        case 'down': return `translateY(${value}px)`;
        case 'left': return `translateX(${-value}px)`;
        case 'right': return `translateX(${value}px)`;
        default: return `translateY(${-value}px)`;
      }
    };
    
    const updatePosition = () => {
      if (!section || !content) return;
      
      // Get the section's position relative to the viewport
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Only apply parallax when section is visible
      if (sectionTop < viewportHeight && sectionTop > -sectionHeight) {
        // Calculate how far down the section is visible
        const relativeY = (viewportHeight - sectionTop) * speed;
        content.style.transform = getDirectionalTransform(relativeY);
      }
      
      ticking = false;
    };
    
    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updatePosition();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initialize position
    updatePosition();
    
    // Add scroll event listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [speed, direction]);
  
  return (
    <div ref={sectionRef} className={cn("overflow-hidden relative", className)}>
      <div ref={contentRef} className="relative">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
