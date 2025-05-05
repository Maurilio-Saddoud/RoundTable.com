'use client';

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const useMatterBubbles = (links, canvasRef, containerRef) => {
  const engineRef = useRef(null);
  const worldRef = useRef(null);
  const bodiesRef = useRef([]);
  const dragRef = useRef(null);
  const dragTimeoutRef = useRef(null);
  const dragStartPosRef = useRef(null);
  const dragHistoryRef = useRef([]);
  const animationFrameRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Matter.js engine and world
  useEffect(() => {
    console.log('Initializing Matter.js engine');
    if (!containerRef.current) {
      console.log('No container ref found');
      return;
    }
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    console.log('Container size:', rect.width, rect.height);
    
    // Clear any existing engine
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
    }
    
    const engine = Matter.Engine.create({ 
      gravity: { x: 0, y: 0 },
      constraintIterations: 4,
      timing: {
        timeScale: 1,
        timestamp: 0
      }
    });
    
    const world = engine.world;
    engineRef.current = engine;
    worldRef.current = world;

    // Create walls (invisible boundaries)
    const walls = [
      Matter.Bodies.rectangle(rect.width / 2, -10, rect.width, 20, { isStatic: true }), // top
      Matter.Bodies.rectangle(rect.width / 2, rect.height + 10, rect.width, 20, { isStatic: true }), // bottom
      Matter.Bodies.rectangle(-10, rect.height / 2, 20, rect.height, { isStatic: true }), // left
      Matter.Bodies.rectangle(rect.width + 10, rect.height / 2, 20, rect.height, { isStatic: true }), // right
    ];

    Matter.World.add(world, walls);

    // Create bubbles
    const bubbles = links.map((link, index) => {
      const size = 80; // Fixed size for all bubbles
      const x = Math.random() * (rect.width - size) + size/2;
      const y = Math.random() * (rect.height - size) + size/2;
      const velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      };

      const bubble = Matter.Bodies.circle(x, y, size/2, {
        restitution: 0.9,
        friction: 0.05,
        frictionAir: 0.0005,
        label: link.title,
        url: link.url,
        render: { fillStyle: 'transparent' }
      });

      Matter.Body.setVelocity(bubble, velocity);
      return bubble;
    });

    Matter.World.add(world, bubbles);
    bodiesRef.current = bubbles;
    console.log('Created bubbles:', bubbles.length);

    // Fixed timestep for physics
    const fixedDeltaTime = 1000 / 60; // 60 FPS
    let lastTime = performance.now();
    let accumulator = 0;

    const animate = (currentTime) => {
      if (!engineRef.current) return;
      
      const deltaTime = Math.min(currentTime - lastTime, 1000/30); // Cap at 30fps worth of time
      lastTime = currentTime;
      accumulator += deltaTime;
      
      // Update physics with fixed timestep
      while (accumulator >= fixedDeltaTime) {
        // Constrain bubbles to container and add gentle floating
        bodiesRef.current.forEach(bubble => {
          const maxSpeed = 4; // Keep natural movement speed the same
          const velocity = bubble.velocity;
          const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
          
          // Add very gentle random drift
          const drift = {
            x: (Math.random() - 0.5) * 0.0005,
            y: (Math.random() - 0.5) * 0.0005
          };
          Matter.Body.applyForce(bubble, bubble.position, drift);

          // Keep speed within bounds
          if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            Matter.Body.setVelocity(bubble, {
              x: velocity.x * scale,
              y: velocity.y * scale
            });
          }

          // Keep bubbles within bounds
          const x = Math.max(bubble.circleRadius, Math.min(rect.width - bubble.circleRadius, bubble.position.x));
          const y = Math.max(bubble.circleRadius, Math.min(rect.height - bubble.circleRadius, bubble.position.y));
          
          if (x !== bubble.position.x || y !== bubble.position.y) {
            Matter.Body.setPosition(bubble, { x, y });
            // Increased bounce off walls
            Matter.Body.setVelocity(bubble, {
              x: bubble.velocity.x * 0.98,
              y: bubble.velocity.y * 0.98
            });
          }
        });

        Matter.Engine.update(engineRef.current, fixedDeltaTime);
        accumulator -= fixedDeltaTime;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    setIsInitialized(true);

    // Cleanup
    return () => {
      console.log('Cleaning up Matter.js engine');
      setIsInitialized(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        Matter.World.clear(worldRef.current, false);
        engineRef.current = null;
        worldRef.current = null;
      }
      bodiesRef.current = [];
    };
  }, [containerRef, links]);

  // Handle container resize
  useEffect(() => {
    if (!containerRef.current || !worldRef.current) return;

    const handleResize = () => {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Update wall positions
      const walls = worldRef.current.bodies.filter(body => body.isStatic);
      walls.forEach((wall, index) => {
        switch(index) {
          case 0: // top
            Matter.Body.setPosition(wall, { x: rect.width / 2, y: -10 });
            Matter.Body.setVertices(wall, Matter.Bodies.rectangle(rect.width / 2, -10, rect.width, 20).vertices);
            break;
          case 1: // bottom
            Matter.Body.setPosition(wall, { x: rect.width / 2, y: rect.height + 10 });
            Matter.Body.setVertices(wall, Matter.Bodies.rectangle(rect.width / 2, rect.height + 10, rect.width, 20).vertices);
            break;
          case 2: // left
            Matter.Body.setPosition(wall, { x: -10, y: rect.height / 2 });
            Matter.Body.setVertices(wall, Matter.Bodies.rectangle(-10, rect.height / 2, 20, rect.height).vertices);
            break;
          case 3: // right
            Matter.Body.setPosition(wall, { x: rect.width + 10, y: rect.height / 2 });
            Matter.Body.setVertices(wall, Matter.Bodies.rectangle(rect.width + 10, rect.height / 2, 20, rect.height).vertices);
            break;
          default:
            break;
        }
      });

      // Keep bubbles within bounds
      bodiesRef.current.forEach(bubble => {
        const x = Math.min(Math.max(bubble.position.x, bubble.circleRadius), rect.width - bubble.circleRadius);
        const y = Math.min(Math.max(bubble.position.y, bubble.circleRadius), rect.height - bubble.circleRadius);
        Matter.Body.setPosition(bubble, { x, y });
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    const currentContainer = containerRef.current;
    resizeObserver.observe(currentContainer);

    return () => {
      if (currentContainer) {
        resizeObserver.disconnect();
      }
    };
  }, [containerRef]);

  // Handle drag interactions
  useEffect(() => {
    if (!canvasRef.current) return;

    const currentCanvas = canvasRef.current;
    let hasDragged = false;

    const handlePointerDown = (e) => {
      hasDragged = false;
      const rect = currentCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const clickedBody = Matter.Query.point(bodiesRef.current, { x, y })[0];
      if (!clickedBody) return;

      dragRef.current = clickedBody;
      dragStartPosRef.current = { x, y };
      dragHistoryRef.current = [{ x, y, time: Date.now() }];

      dragTimeoutRef.current = setTimeout(() => {
        dragTimeoutRef.current = null;
      }, 600);

      Matter.Body.setStatic(clickedBody, true);
    };

    const handlePointerMove = (e) => {
      if (!dragRef.current) return;

      const rect = currentCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if we've moved enough to consider it a drag
      const dx = x - dragStartPosRef.current.x;
      const dy = y - dragStartPosRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 5) {
        hasDragged = true;
      }

      Matter.Body.setPosition(dragRef.current, { x, y });
      
      dragHistoryRef.current.push({ x, y, time: Date.now() });
      if (dragHistoryRef.current.length > 5) dragHistoryRef.current.shift();

      if (dragTimeoutRef.current) {
        if (Math.sqrt(dx * dx + dy * dy) > 5) {
          clearTimeout(dragTimeoutRef.current);
          dragTimeoutRef.current = null;
        }
      }
    };

    const handlePointerUp = () => {
      if (!dragRef.current) return;

      if (dragTimeoutRef.current && !hasDragged) {
        // Only open link if it was a click (no drag) and the timeout is still active
        clearTimeout(dragTimeoutRef.current);
        window.open(dragRef.current.url, '_blank');
      } else {
        // Apply velocity if it was a drag
        const history = dragHistoryRef.current;
        if (history.length >= 2) {
          const recent = history[history.length - 1];
          const old = history[Math.max(0, history.length - 3)];
          const dt = recent.time - old.time;
          if (dt > 0) {
            const vx = (recent.x - old.x) / dt;
            const vy = (recent.y - old.y) / dt;
            // Increased throw velocity multiplier
            Matter.Body.setVelocity(dragRef.current, { x: vx * 200, y: vy * 200 });
          }
        }
      }

      Matter.Body.setStatic(dragRef.current, false);
      dragRef.current = null;
      dragHistoryRef.current = [];
    };

    currentCanvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      currentCanvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [canvasRef]);

  // Handle window resize
  useEffect(() => {
    if (!containerRef.current) return;

    const currentContainer = containerRef.current;

    const handleResize = () => {
      const rect = currentContainer.getBoundingClientRect();
      // Update walls
      const walls = worldRef.current.bodies.filter(body => body.isStatic);
      walls.forEach((wall, index) => {
        switch(index) {
          case 0: // top
            Matter.Body.setPosition(wall, { x: rect.width / 2, y: -10 });
            Matter.Body.setVertices(wall, Matter.Bodies.rectangle(rect.width / 2, -10, rect.width, 20).vertices);
            break;
          case 1: // bottom
            Matter.Body.setPosition(wall, { x: rect.width / 2, y: rect.height + 10 });
            Matter.Body.setVertices(wall, Matter.Bodies.rectangle(rect.width / 2, rect.height + 10, rect.width, 20).vertices);
            break;
          case 2: // left
            Matter.Body.setPosition(wall, { x: -10, y: rect.height / 2 });
            Matter.Body.setVertices(wall, Matter.Bodies.rectangle(-10, rect.height / 2, 20, rect.height).vertices);
            break;
          case 3: // right
            Matter.Body.setPosition(wall, { x: rect.width + 10, y: rect.height / 2 });
            Matter.Body.setVertices(wall, Matter.Bodies.rectangle(rect.width + 10, rect.height / 2, 20, rect.height).vertices);
            break;
          default:
            break;
        }
      });

      // Keep bubbles within bounds
      bodiesRef.current.forEach(bubble => {
        const x = Math.min(Math.max(bubble.position.x, bubble.circleRadius), rect.width - bubble.circleRadius);
        const y = Math.min(Math.max(bubble.position.y, bubble.circleRadius), rect.height - bubble.circleRadius);
        Matter.Body.setPosition(bubble, { x, y });
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  // Handle mouse interaction
  useEffect(() => {
    if (!containerRef.current) return;

    const currentContainer = containerRef.current;

    const handleMouseMove = (e) => {
      if (!currentContainer) return;
      const rect = currentContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (dragRef.current) {
        Matter.Body.setPosition(dragRef.current, { x, y });
      }
    };

    const handleMouseUp = () => {
      if (dragRef.current) {
        Matter.Body.setStatic(dragRef.current, false);
        dragRef.current = null;
      }
    };

    currentContainer.addEventListener('mousemove', handleMouseMove);
    currentContainer.addEventListener('mouseup', handleMouseUp);
    return () => {
      currentContainer.removeEventListener('mousemove', handleMouseMove);
      currentContainer.removeEventListener('mouseup', handleMouseUp);
    };
  }, [containerRef]);

  // Handle cleanup
  useEffect(() => {
    return () => {
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        engineRef.current = null;
      }
      if (worldRef.current) {
        Matter.World.clear(worldRef.current, false);
        worldRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return { bodies: bodiesRef.current, isInitialized };
};

export default useMatterBubbles; 