
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MagneticButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  strength?: number;
  radius?: number;
  children: React.ReactNode;
  className?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  strength = 40,
  radius = 200,
  children,
  className,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Calculate distance from cursor to button center
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    // Only apply magnetic effect if cursor is within the defined radius
    if (distance < radius) {
      const strengthFactor = 1 - distance / radius;
      const magnetX = distanceX * strengthFactor * (strength / 10);
      const magnetY = distanceY * strengthFactor * (strength / 10);
      
      setPosition({ x: magnetX, y: magnetY });
    } else {
      // Reset position if cursor is outside radius
      setPosition({ x: 0, y: 0 });
    }
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset position with smooth transition when mouse leaves
    setPosition({ x: 0, y: 0 });
  };
  
  // Clean up and reset position when component unmounts
  useEffect(() => {
    return () => {
      setPosition({ x: 0, y: 0 });
    };
  }, []);
  
  const buttonStyle = {
    transform: isHovered ? `translate(${position.x}px, ${position.y}px)` : 'translate(0, 0)',
    transition: isHovered ? 'transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1)' : 'transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)',
  };
  
  return (
    <div className="inline-block overflow-visible">
      <Button
        ref={buttonRef}
        className={cn(className)}
        style={buttonStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

export default MagneticButton;
