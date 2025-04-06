
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  disabled?: boolean;
}

const Parallax: React.FC<ParallaxProps> = ({
  children,
  className,
  speed = 0.5,
  direction = 'up',
  disabled = false,
}) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (disabled) return;
    
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const centerPosition = rect.top + rect.height / 2;
      const distanceFromCenter = centerPosition - windowHeight / 2;
      const scrollPosition = distanceFromCenter * speed;
      
      setOffset(scrollPosition);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, disabled]);
  
  const getTransform = () => {
    if (disabled) return 'none';
    
    switch (direction) {
      case 'up':
        return `translateY(${-offset}px)`;
      case 'down':
        return `translateY(${offset}px)`;
      case 'left':
        return `translateX(${-offset}px)`;
      case 'right':
        return `translateX(${offset}px)`;
      default:
        return `translateY(${-offset}px)`;
    }
  };
  
  return (
    <div
      ref={elementRef}
      className={cn('transition-transform will-change-transform', className)}
      style={{
        transform: getTransform(),
      }}
    >
      {children}
    </div>
  );
};

export default Parallax;
