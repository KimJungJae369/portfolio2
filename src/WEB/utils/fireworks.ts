// src/WEB/utils/fireworks.ts
export const createFirework = (x: number, y: number) => {
    const particleCount = 40;
    const colors = ['#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework-particle');
        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 50; // Distance to travel
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        // Start position
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Animate using Web Animations API
        const animation = particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 400,
            easing: 'cubic-bezier(0, .9, .57, 1)',
        });

        animation.onfinish = () => {
            particle.remove();
        };
    }
};
