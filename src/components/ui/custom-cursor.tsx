
import React, { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mMove = (e: MouseEvent) => {
      // Only update if we received X and Y coordinates
      if (e.clientX && e.clientY) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const mDown = () => {
      setClicked(true);
    };

    const mUp = () => {
      setClicked(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button], .glass-card").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    const mouseLeave = () => setHidden(true);
    const mouseEnter = () => setHidden(false);

    handleLinkHoverEvents();
    document.addEventListener("mousemove", mMove);
    document.addEventListener("mousedown", mDown);
    document.addEventListener("mouseup", mUp);
    document.addEventListener("mouseleave", mouseLeave);
    document.addEventListener("mouseenter", mouseEnter);

    return () => {
      document.removeEventListener("mousemove", mMove);
      document.removeEventListener("mousedown", mDown);
      document.removeEventListener("mouseup", mUp);
      document.removeEventListener("mouseleave", mouseLeave);
      document.removeEventListener("mouseenter", mouseEnter);

      document.querySelectorAll("a, button, [role=button], .glass-card").forEach((el) => {
        el.removeEventListener("mouseenter", () => setLinkHovered(true));
        el.removeEventListener("mouseleave", () => setLinkHovered(false));
      });
    };
  }, []);

  useEffect(() => {
    const updateCursor = () => {
      if (cursorRef.current && cursorRingRef.current) {
        // Regular cursor
        cursorRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
        
        // Ring cursor with subtle delay
        cursorRingRef.current.style.transform = `translate3d(calc(${position.x}px - 12px), calc(${position.y}px - 12px), 0)`;
      }
    };

    requestAnimationFrame(updateCursor);
  }, [position]);

  return (
    <div className={`${hidden ? 'opacity-0' : ''} fixed z-[999] pointer-events-none transition-opacity duration-300`}>
      <div 
        ref={cursorRef} 
        className={`w-4 h-4 bg-primary rounded-full fixed top-0 left-0 -ml-2 -mt-2 pointer-events-none transition-transform duration-75 ease-out ${
          clicked ? 'scale-75 opacity-70' : ''
        }`}
        style={{ 
          transform: `translate3d(${position.x}px, ${position.y}px, 0)` 
        }}
      />
      <div 
        ref={cursorRingRef} 
        className={`fixed top-0 left-0 w-8 h-8 border-2 border-primary rounded-full pointer-events-none transition-all duration-300 ease-out ${
          linkHovered ? 'scale-150 opacity-50' : clicked ? 'scale-75 opacity-50' : ''
        }`}
        style={{ 
          transform: `translate3d(calc(${position.x}px - 12px), calc(${position.y}px - 12px), 0)` 
        }}
      />
    </div>
  );
};

export default CustomCursor;
