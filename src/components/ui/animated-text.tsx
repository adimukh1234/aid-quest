
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  animationType?: 'fade' | 'slide' | 'typewriter';
  delay?: number;
  duration?: number;
  tag?: keyof JSX.IntrinsicElements;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  once = true,
  animationType = 'fade',
  delay = 0,
  duration = 500,
  tag = 'div'
}) => {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.classList.add('animate-in');
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            container.classList.remove('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(container);
    
    return () => {
      if (container) observer.unobserve(container);
    };
  }, [once]);
  
  // For typewriter effect
  const renderTypewriter = () => {
    return (
      <span className="typewriter-container">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="typewriter-char opacity-0"
            style={{
              animationDelay: `${delay + (i * 50)}ms`,
              animationDuration: `${duration}ms`
            }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  };
  
  // For split text animations (fade/slide)
  const renderSplitText = () => {
    const words = text.split(' ');
    
    return (
      <>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block overflow-hidden mr-1.5 last:mr-0">
            <span
              className={cn(
                'inline-block',
                animationType === 'fade' ? 'animate-text-fade' : 'animate-text-slide',
              )}
              style={{
                animationDelay: `${delay + (wordIndex * 50)}ms`,
                animationDuration: `${duration}ms`,
                animationFillMode: 'backwards'
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </>
    );
  };
  
  // Using React.createElement to create the dynamic tag with proper types
  return React.createElement(
    tag,
    {
      ref: containerRef,
      className: cn(className),
      "data-animation-type": animationType
    },
    animationType === 'typewriter' ? renderTypewriter() : renderSplitText()
  );
};

export default AnimatedText;
