
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MagnetButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  magnetStrength?: number;
  className?: string;
  variant?: 'default' | 'outline';
  shape?: 'circle' | 'default';
}

const MagnetButton: React.FC<MagnetButtonProps> = ({
  children,
  magnetStrength = 0.5,
  className,
  variant = 'default',
  shape = 'default',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !isHovered) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Modify this value to adjust magnetic strength
    const strength = magnetStrength * 20;
    
    setPosition({
      x: distanceX / strength,
      y: distanceY / strength,
    });
  };
  
  // Reset position when component unmounts or when isHovered changes
  useEffect(() => {
    if (!isHovered) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isHovered]);
  
  return (
    <button
      ref={buttonRef}
      className={cn(
        'relative transition-transform duration-200 ease-out select-none',
        variant === 'default' 
          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
          : 'border border-primary text-primary hover:bg-primary/5',
        shape === 'circle' ? 'rounded-full aspect-square' : 'rounded-lg',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered
          ? `translate(${position.x}px, ${position.y}px) scale(1.05)`
          : 'translate(0, 0) scale(1)',
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default MagnetButton;
