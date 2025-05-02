'use client';

import { useEffect, useRef } from 'react';
import useMatterBubbles from './useMatterBubbles';

// SVG paths for the icons
const iconPaths = {
  github: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  linkedin: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  twitter: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'
};

const getIconPath = (label) => {
  switch(label.toLowerCase()) {
    case 'x':
      return 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z';
    case 'github':
      return iconPaths.github;
    case 'linkedin':
      return iconPaths.linkedin;
    case 'twitter':
      return iconPaths.twitter;
    default:
      return null;
  }
};

const LinkBubbles = ({ links }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const animationFrameRef = useRef(null);
  const { bodies, isInitialized } = useMatterBubbles(links, canvasRef, containerRef);

  // Setup canvas and handle resize
  useEffect(() => {
    console.log('Setting up canvas');
    if (!canvasRef.current || !containerRef.current) {
      console.log('Missing refs');
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;

    const handleResize = () => {
      console.log('Handling resize');
      const rect = container.getBoundingClientRect();
      
      // Set proper scale for high DPI displays
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      context.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Create a ResizeObserver to watch container size changes
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      console.log('Cleaning up canvas');
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Render loop
  useEffect(() => {
    console.log('Starting render loop, bodies:', bodies.length, 'initialized:', isInitialized);
    if (!contextRef.current || !bodies.length || !isInitialized) {
      console.log('Missing context, bodies, or not initialized');
      return;
    }

    const render = () => {
      const ctx = contextRef.current;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;

      // Clear canvas with proper scaling
      ctx.save();
      ctx.scale(1/dpr, 1/dpr);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Draw each bubble
      bodies.forEach(body => {
        ctx.save();
        
        // Draw shadow
        ctx.beginPath();
        ctx.arc(body.position.x, body.position.y, body.circleRadius, 0, Math.PI * 2);
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        // Draw main circle
        ctx.beginPath();
        ctx.arc(body.position.x, body.position.y, body.circleRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        // Draw icon
        const path = getIconPath(body.label);
        if (path) {
          const iconSize = body.circleRadius * 0.8;
          const iconX = body.position.x - iconSize/2;
          const iconY = body.position.y - iconSize/2;
          
          ctx.save();
          ctx.translate(iconX, iconY);
          ctx.scale(iconSize/24, iconSize/24); // Scale to fit the 24x24 viewBox
          
          const path2D = new Path2D(path);
          ctx.fillStyle = '#000';
          ctx.fill(path2D);
          
          ctx.restore();
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      console.log('Cleaning up render loop');
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [bodies, isInitialized]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};

export default LinkBubbles; 