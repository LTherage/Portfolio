// Background bubbles + interactions
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    function rand(a, b) { return a + Math.random() * (b - a); }

    class Bubble {
        constructor(x, y, size, type = "bg") {
            this.x = x;
            this.y = y;
            this.size = size;
            this.baseSize = size;
            this.type = type;
            this.age = 0;
            this.life = type === "trail" ? 1.2 : rand(3, 6);
            this.vel = { x: rand(-0.5, 0.5), y: rand(-0.5, 0.5) };
            this.noise = Math.random() * 1000;
        }
        update(dt) {
            this.age += dt;
            this.x += this.vel.x;
            this.y += this.vel.y - (this.type === "bg" ? dt * 5 : 0);
            if (this.type === "held" && this.baseSize > 100) {
                this.size = this.baseSize * (0.9 + 0.15 * Math.sin(this.age * 6));
            } else {
                this.size = this.baseSize * (0.85 + 0.25 * Math.sin((this.age + this.noise) * 3));
            }
        }
        draw(ctx, t) {
            ctx.save();
            ctx.translate(this.x, this.y);

            // Dégradé radial rond
            const grad = ctx.createRadialGradient(0, 0, this.size * 0.2, 0, 0, this.size);
            grad.addColorStop(0, "rgba(255,255,255,0.9)");
            grad.addColorStop(1, "rgba(255,255,255,0.05)");

            ctx.fillStyle = grad;

            // Cercle parfait
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
        expired() { return this.age > this.life; }
    }

    let particles = [];
    let heldBubble = null;
    let holdStart = 0;

    // bulles initiales
    for (let i = 0; i < 20; i++) {
        particles.push(new Bubble(rand(0, w), rand(0, h), rand(20, 60), "bg"));
    }

    // bulles aléatoires continues
    function spawnBackgroundBubble() {
        particles.push(new Bubble(rand(0, w), rand(0, h), rand(20, 60), "bg"));
    }
    setInterval(spawnBackgroundBubble, 1500);

    // mini bulles du curseur
    window.addEventListener("mousemove", e => {
        particles.push(new Bubble(e.clientX, e.clientY, rand(4, 8), "trail"));
        if (particles.length > 200) particles.splice(0, particles.length - 150);
    });

    // bulle maintenue (clic)
    window.addEventListener("mousedown", e => {
        holdStart = performance.now();
        heldBubble = new Bubble(e.clientX, e.clientY, 0, "held");
        particles.push(heldBubble);
    });
    window.addEventListener("mouseup", () => {
        heldBubble = null;
    });

    let last = performance.now();
    function loop(now) {
        const dt = (now - last) / 1000;
        last = now;
        ctx.clearRect(0, 0, w, h);

        // fond (tu peux remettre #0f1113 si besoin)
        ctx.fillStyle = "#202020";
        ctx.fillRect(0, 0, w, h);

        if (heldBubble) {
            const elapsed = (now - holdStart) / 1000;
            heldBubble.baseSize = Math.min(200, elapsed * 20);
        }

        particles.forEach(p => p.update(dt));
        particles = particles.filter(p => !p.expired() || p.type === "held");
        particles.forEach(p => p.draw(ctx, now / 1000));

        requestAnimationFrame(loop);
    }
    loop(last);

    // --- Ton code portfolio / modal existant ---
    document.querySelectorAll(".cat").forEach(c => {
        c.addEventListener("click", () => {
            const target = c.getAttribute("data-target");
            if (target) window.location = target;
        });
    });

    const openBtn = document.getElementById("open-portfolio");
    const modal = document.getElementById("consent-modal");
    const acceptBtn = document.getElementById("accept-btn");
    const declineBtn = document.getElementById("decline-btn");

    function showModal() { modal.classList.remove("hidden"); }
    function hideModal() { modal.classList.add("hidden"); }

    openBtn && openBtn.addEventListener("click", () => {
        if (localStorage.getItem("portfolio_consent") === "yes") {
            document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
            return;
        }
        showModal();
    });
    acceptBtn && acceptBtn.addEventListener("click", () => {
        localStorage.setItem("portfolio_consent", "yes");
        hideModal();
        document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
    });
    declineBtn && declineBtn.addEventListener("click", () => {
        hideModal();
    });

    window.addEventListener("keydown", e => { if (e.key === "Escape") hideModal(); });
});

// --- Cartes interactives ---
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        if (card.classList.contains("expanded")) {
            card.classList.remove("expanded");
            const link = card.getAttribute("data-link");
            if (link) window.location = link;
        } else {
            document.querySelectorAll(".card.expanded").forEach(c => c.classList.remove("expanded"));
            card.classList.add("expanded");
        }
    });
});

window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        document.querySelectorAll(".card.expanded").forEach(c => c.classList.remove("expanded"));
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade");

    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // chaque section apparaît une seule fois
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

