import { useEffect, useRef, useState } from 'react';
import './GlobalMouseEffect.css';
import { createFirework } from '../utils/fireworks';

export default function GlobalMouseEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHoveringTitle, setIsHoveringTitle] = useState(false);

    // Global Click Firework Effect
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            createFirework(e.clientX, e.clientY);
        };
        
        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, []);

    // Gold Dust Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: {x: number, y: number, size: number, speedX: number, speedY: number, life: number}[] = [];
        let animationFrameId: number;

        const resize = () => {
             canvas.width = window.innerWidth;
             canvas.height = window.innerHeight;
        };

        const createParticle = (x: number, y: number) => {
             for(let i=0; i<2; i++) { // Generate subtle dust
                 particles.push({
                     x,
                     y,
                     size: Math.random() * 2 + 0.5,
                     speedX: (Math.random() - 0.5) * 1.0,
                     speedY: (Math.random() - 0.5) * 1.0 - 0.2,
                     life: 1.0
                 });
             }
        };

        const handleMouseMove = (e: MouseEvent) => {
             createParticle(e.clientX, e.clientY);
             
             // Update custom cursor
             if (cursorRef.current) {
                 cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
             }

             // Check if hovering a title
             const target = e.target as HTMLElement;
             // Check common title tags and classes
             if (target.matches('h1, h1 *, h2, h2 *, h3, h3 *, .mainTitle, .mainTitle *, .section-title, .section-title *')) {
                 setIsHoveringTitle(true);
             } else {
                 setIsHoveringTitle(false);
             }
        };

        const animate = () => {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
             
             for (let i = 0; i < particles.length; i++) {
                 const p = particles[i];
                 p.x += p.speedX;
                 p.y += p.speedY;
                 p.life -= 0.015; 
                 p.size *= 0.96;

                 if (p.life <= 0 || p.size <= 0.1) {
                     particles.splice(i, 1);
                     i--;
                     continue;
                 }

                 ctx.beginPath();
                 ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                 // Gold color consistent with theme
                 ctx.fillStyle = `rgba(212, 175, 106, ${p.life})`; 
                 ctx.fill();
             }
             
             animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className="global-gold-dust-canvas" />
            <div 
                ref={cursorRef} 
                className={`custom-cursor ${isHoveringTitle ? 'active' : ''}`} 
            />
        </>
    );
}
