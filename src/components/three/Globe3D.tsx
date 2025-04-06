
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface Globe3DProps {
  className?: string;
}

const Globe3D: React.FC<Globe3DProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create Earth sphere
    const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
    
    // Create Earth material with gradient - Changed to green colors
    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color("#38A169") }, // Changed to green
        color2: { value: new THREE.Color("#10B981") }, // impact-green
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        
        void main() {
          gl_FragColor = vec4(mix(color1, color2, vUv.y), 0.7);
        }
      `,
      transparent: true,
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Create wireframe for the globe
    const wireframeGeometry = new THREE.SphereGeometry(2.05, 16, 16);
    const wireframeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.1 
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);
    
    // Create points/dots on the globe (representing NGO locations)
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsCount = 300;
    const positions = new Float32Array(pointsCount * 3);
    
    for (let i = 0; i < pointsCount; i++) {
      // Generate random points on the sphere surface
      const phi = Math.acos(-1 + (2 * i) / pointsCount);
      const theta = Math.sqrt(pointsCount * Math.PI) * phi;
      
      // Convert spherical coordinates to cartesian
      const x = 2.1 * Math.cos(theta) * Math.sin(phi);
      const y = 2.1 * Math.sin(theta) * Math.sin(phi);
      const z = 2.1 * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const pointsMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.05, 
      transparent: true, 
      opacity: 0.8 
    });
    
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the globe slowly
      earth.rotation.y += 0.002;
      wireframe.rotation.y += 0.002;
      points.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      earthGeometry.dispose();
      wireframeGeometry.dispose();
      pointsGeometry.dispose();
      earthMaterial.dispose();
      wireframeMaterial.dispose();
      pointsMaterial.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className={className} />;
};

export default Globe3D;
