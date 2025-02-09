class Confetti {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#ff0000', '#ff3366', '#ff6b6b', '#ff9999', '#ffb3b3'];
        
        // Setup canvas
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1000';
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles(x, y, count = 50) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10 - 3,
                size: Math.random() * 5 + 5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10
            });
        }
    }

    animate() {
        if (this.particles.length === 0) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            document.body.removeChild(this.canvas);
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2; // gravity
            p.rotation += p.rotationSpeed;

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            this.ctx.restore();

            // Remove particles that are off screen
            if (p.y > this.canvas.height) {
                this.particles.splice(i, 1);
            }
        }

        requestAnimationFrame(() => this.animate());
    }

    burst(x, y) {
        if (!document.body.contains(this.canvas)) {
            document.body.appendChild(this.canvas);
        }
        this.createParticles(x, y);
        this.animate();
    }
}

// Create global instance
window.confetti = new Confetti(); 