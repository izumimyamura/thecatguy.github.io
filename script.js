gsap.registerPlugin(ScrollTrigger);

// 1. Unified Master Keynote Video Animation Timeline
const appleTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".apple-video-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true // Locks everything in position throughout the timeline run
    }
});

// Phase A: Video window scales down from fullscreen to a rounded card view
appleTimeline.fromTo(".video-scale-target", 
    { width: "100vw", height: "100vh", borderRadius: "0px" },
    { width: "85vw", height: "75vh", borderRadius: "36px", ease: "none" }
);

// Phase B: Sequence Text Overlays sequentially (Fade in -> Stand Still -> Fade out)
appleTimeline.to(".step-1", { opacity: 1, y: 0, duration: 1 })
             .to(".step-1", { opacity: 0, y: -20, duration: 1 }, "+=0.5") // slight hold gap

             .to(".step-2", { opacity: 1, y: 0, duration: 1 })
             .to(".step-2", { opacity: 0, y: -20, duration: 1 }, "+=0.5")

             .to(".step-3", { opacity: 1, y: 0, duration: 1 })
             .to(".step-3", { opacity: 0, y: -20, duration: 1 }, "+=0.5");


// 2. Mouse Dynamic Light Tracking
const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

// 3. Canvas Starfield System
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = [];
for(let i=0; i<80; i++){
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5
    });
}

function animateStars(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();

        star.y += 0.1;
        if(star.y > canvas.height){
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// 4. Cassette Floating Calculations
const cassette = document.querySelector(".cassette");
let mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
});

let floatFrame = 0;
function updateCassette() {
    floatFrame += 0.02;
    const floatY = Math.sin(floatFrame) * 10;
    if(cassette) {
        cassette.style.transform = `translateY(${floatY}px) rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
    }
    requestAnimationFrame(updateCassette);
}
updateCassette();

// 5. Parallax Speed Map for Clouds
window.addEventListener("scroll", () => {
    const parallaxElements = document.querySelectorAll(".scroll-parallax");
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(el => {
        const speed = el.getAttribute("data-speed");
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});
