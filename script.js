// 1. Mouse Glow Position Tracking
const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

// 2. Starfield Particle Logic 
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = [];
for(let i=0; i<120; i++){
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2
    });
}

function animateStars(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();

        star.y += 0.15;
        if(star.y > canvas.height){
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// 3. Combined Floating + 3D Mouse Tilt Animation for Cassette
const cassette = document.querySelector(".cassette");
let mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 25;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 25;
});

let floatFrame = 0;
function updateCassetteTransforms() {
    floatFrame += 0.03;
    const floatY = Math.sin(floatFrame) * 15; // Recreates the floating math perfectly

    if(cassette) {
        cassette.style.transform = `translateY(${floatY}px) rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
    }
    requestAnimationFrame(updateCassetteTransforms);
}
updateCassetteTransforms();

// 4. Magnetic Button Interaction
const btn = document.querySelector(".btn");
if(btn) {
    document.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        if(Math.abs(x) < 150 && Math.abs(y) < 80) {
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        } else {
            btn.style.transform = "translate(0,0)";
        }
    });
}

// 5. Advanced GSAP Smooth Scroll Reveals
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("section").forEach(section => {
    // Check if it's the hero section so it animates immediately instead of on scroll
    if(section.classList.contains('hero')) {
        gsap.from(".reveal", {
            y: 60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out"
        });
    } else {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 60,
            duration: 1.2,
            ease: "power3.out"
        });
    }
});
