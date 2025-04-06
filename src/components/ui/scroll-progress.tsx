
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  zIndex?: number;
  position?: 'top' | 'bottom';
  className?: string;
  showTooltip?: boolean;
  tooltipFormat?: (value: number) => string;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = 'bg-primary',
  height = 3,
  zIndex = 100,
  position = 'top',
  className,
  showTooltip = false,
  tooltipFormat = (value) => `${Math.round(value)}%`,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      // Calculate how far down the page we've scrolled
      const currentScrollPos = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const percentage = (currentScrollPos / scrollHeight) * 100;
        setScrollProgress(percentage);
        
        // Show progress bar only when scrolled down a bit (5%)
        setIsVisible(currentScrollPos > 10);
      } else {
        setScrollProgress(0);
        setIsVisible(false);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    
    // Initial calculation
    updateScrollProgress();
    
    // Clean up
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);
  
  return (
    <>
      <div
        className={cn(
          'fixed left-0 z-50 w-full transition-transform duration-300',
          position === 'top' ? 'top-0' : 'bottom-0',
          isVisible ? 'opacity-100' : 'opacity-0',
          className
        )}
        style={{ 
          zIndex,
          transform: isVisible ? 'translateY(0)' : `translateY(${position === 'top' ? '-100%' : '100%'})` 
        }}
      >
        <div
          className={color}
          style={{
            width: `${scrollProgress}%`,
            height: `${height}px`,
            transition: 'width 100ms ease-out',
            borderTopRightRadius: height,
            borderBottomRightRadius: height,
            boxShadow: '0 0 10px rgba(var(--primary), 0.5)'
          }}
        />
        
        {showTooltip && scrollProgress > 0 && (
          <div 
            className="absolute top-0 bg-primary text-primary-foreground text-xs py-1 px-2 rounded-md transform -translate-y-full -translate-x-1/2"
            style={{ 
              left: `${scrollProgress}%`,
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 200ms ease-out, left 100ms ease-out'
            }}
          >
            {tooltipFormat(scrollProgress)}
          </div>
        )}
      </div>
    </>
  );
};

export default ScrollProgress;
