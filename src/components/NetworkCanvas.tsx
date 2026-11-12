import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  connectedTo: number[];
}

interface Packet {
  sourceIndex: number;
  targetIndex: number;
  progress: number;
  speed: number;
}

export const NetworkCanvas: React.FC<{ theme?: 'gold' | 'emerald' | 'cyan' }> = ({ theme = 'gold' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Particle colors based on theme
    const themeColors = {
      gold: {
        node: 'rgba(245, 158, 11, ', // amber-500
        line: 'rgba(217, 119, 6, ',  // amber-600
        packet: 'rgba(251, 191, 36, ', // amber-400
      },
      emerald: {
        node: 'rgba(16, 185, 129, ', // emerald-500
        line: 'rgba(5, 150, 105, ',  // emerald-600
        packet: 'rgba(52, 211, 153, ', // emerald-400
      },
      cyan: {
        node: 'rgba(6, 182, 212, ', // cyan-500
        line: 'rgba(8, 145, 178, ',  // cyan-600
        packet: 'rgba(34, 211, 238, ', // cyan-400
      }
    };

    const currentColors = themeColors[theme] || themeColors.gold;

    // Density calculation based on screen size
    const particleCount = Math.min(Math.floor((width * height) / 18000), 45);
    let particles: Particle[] = [];
    let packets: Packet[] = [];
    const maxConnectionDistance = 150;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const initParticles = () => {
      particles = [];
      packets = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.8 + 1.2,
          color: currentColors.node,
          alpha: Math.random() * 0.4 + 0.2,
          connectedTo: [],
        });
      }
    };

    initParticles();

    // Spawn packets periodically
    const packetInterval = setInterval(() => {
      if (particles.length < 2) return;
      if (packets.length > 8) return;

      const sourceIndex = Math.floor(Math.random() * particles.length);
      const connected = particles[sourceIndex].connectedTo;
      if (connected.length > 0) {
        const targetIndex = connected[Math.floor(Math.random() * connected.length)];
        packets.push({
          sourceIndex,
          targetIndex,
          progress: 0,
          speed: 0.008 + Math.random() * 0.012,
        });
      }
    }, 800);

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Reset connected state
      for (let i = 0; i < particles.length; i++) {
        particles[i].connectedTo = [];
      }

      // Update positions & draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce walls smoothly
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse avoidance/attraction subtle effect
        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          p1.x -= (dxMouse / distMouse) * force * 1.5;
          p1.y -= (dyMouse / distMouse) * force * 1.5;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${p1.alpha})`;
        ctx.fill();

        // Connect to neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            p1.connectedTo.push(j);
            p2.connectedTo.push(i);

            const lineAlpha = (1 - dist / maxConnectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${currentColors.line}${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Render traveling data packets (representing real network telemetry/traffic)
      for (let k = packets.length - 1; k >= 0; k--) {
        const packet = packets[k];
        const p1 = particles[packet.sourceIndex];
        const p2 = particles[packet.targetIndex];

        if (!p1 || !p2) {
          packets.splice(k, 1);
          continue;
        }

        packet.progress += packet.speed;

        if (packet.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const curX = p1.x + (p2.x - p1.x) * packet.progress;
        const curY = p1.y + (p2.y - p1.y) * packet.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${currentColors.packet}0.85)`;
        ctx.shadowColor = `${currentColors.packet}0.9)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(packetInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
