
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BackgroundAnimationProps {
  className?: string;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 50;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);
    const particlesGeometry = new THREE.BufferGeometry();
    
    // Create color array with gradient colors from primary to impact colors
    const colors = new Float32Array(particlesCount * 3);
    const colorPalette = [
      new THREE.Color("#38A169"), // Changed to green
      new THREE.Color("#10B981"), // impact-green
      new THREE.Color("#059669"), // Additional green shade
      new THREE.Color("#047857"), // Additional darker green
    ];
    
    // Initialize particles with random positions in 3D space
    for (let i = 0; i < particlesCount; i++) {
      // Random position in a sphere
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Random color from our palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({ 
      size: 0.3,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Store original positions for animation
    const originalPositions = positions.slice();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Subtle wave motion for particles
      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;
        
        // Apply sine wave motion
        positions[ix] = originalPositions[ix] + Math.sin(Date.now() * 0.001 + i * 0.1) * 0.3;
        positions[iy] = originalPositions[iy] + Math.cos(Date.now() * 0.001 + i * 0.1) * 0.3;
        positions[iz] = originalPositions[iz] + Math.sin(Date.now() * 0.001 + i * 0.05) * 0.3;
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Rotate the entire particle system very slowly
      particles.rotation.y += 0.0003;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Mouse effect - move particles slightly with mouse
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      particles.rotation.x = mouseY * 0.1;
      particles.rotation.y = mouseX * 0.1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`} />;
};

export default BackgroundAnimation;
