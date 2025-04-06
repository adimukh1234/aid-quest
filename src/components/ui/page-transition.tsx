
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'rotate';
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className,
  duration = 800,
  animation = 'fade',
}) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('enter');
  const previousPathRef = useRef<string | null>(null);
  
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      previousPathRef.current = displayLocation.pathname;
      setTransitionStage('exit');
      
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('enter');
      }, duration / 2);
      
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation, duration]);
  
  const getAnimationClasses = () => {
    const baseClasses = 'transition-all';
    
    const exitClasses = {
      'fade': 'opacity-0',
      'slide-up': 'opacity-0 translate-y-10',
      'slide-down': 'opacity-0 translate-y-[-10px]',
      'slide-left': 'opacity-0 translate-x-10',
      'slide-right': 'opacity-0 translate-x-[-10px]',
      'zoom': 'opacity-0 scale-95',
      'rotate': 'opacity-0 rotate-3 scale-95',
    };
    
    const enterClasses = {
      'fade': 'opacity-100',
      'slide-up': 'opacity-100 translate-y-0',
      'slide-down': 'opacity-100 translate-y-0',
      'slide-left': 'opacity-100 translate-x-0',
      'slide-right': 'opacity-100 translate-x-0',
      'zoom': 'opacity-100 scale-100',
      'rotate': 'opacity-100 rotate-0 scale-100',
    };
    
    return baseClasses + ' ' + (transitionStage === 'enter' ? enterClasses[animation] : exitClasses[animation]);
  };
  
  return (
    <div
      className={cn(
        'min-h-screen',
        getAnimationClasses(),
        className
      )}
      style={{
        transitionDuration: `${duration / 2}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
