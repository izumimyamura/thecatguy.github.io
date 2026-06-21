gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// 1. FIXED GSAP KEYNOTE VIDEO ANIMATION TIMELINE
// ============================================================================
const appleTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".apple-video-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true
    }
});

// Scale down animation completes smoothly FIRST
appleTimeline.fromTo(".video-scale-target", 
    { width: "100vw", height: "100vh", borderRadius: "0px" },
    { width: "85vw", height: "75vh", borderRadius: "36px", ease: "power1.inOut", duration: 1.5 }
);

// Sequence Text Overlays now fire strictly sequentially AFTER scaling finishes
appleTimeline.to(".step-1", { opacity: 1, y: 0, duration: 1 })
             .to(".step-1", { opacity: 0, y: -20, duration: 1 }, "+=0.8")

             .to(".step-2", { opacity: 1, y: 0, duration: 1 })
             .to(".step-2", { opacity: 0, y: -20, duration: 1 }, "+=0.8")

             .to(".step-3", { opacity: 1, y: 0, duration: 1 })
             .to(".step-3", { opacity: 0, y: -20, duration: 1 }, "+=0.8");


// ============================================================================
// 2. GLOBAL CURSOR VECTOR SPACE & CAT MODE TRACKING
// ============================================================================
let isCatMode = false;
const glow = document.getElementById("customCursor");
const toggleInput = document.getElementById("catModeToggle");

toggleInput.addEventListener("change", (e) => {
    isCatMode = e.target.checked;
    if (isCatMode) {
        document.body.classList.add("cat-mode-active");
    } else {
        document.body.classList.remove("cat-mode-active");
        if (cassette) cassette.style.transform = `translateY(0px)`;
    }
});

let currentMouseX = 0, currentMouseY = 0;
document.addEventListener("mousemove", (e) => {
    currentMouseX = e.clientX;
    currentMouseY = e.clientY;
    
    glow.style.left = currentMouseX + "px";
    glow.style.top = currentMouseY + "px";
});


// ============================================================================
// 3. HIGH-PERFORMANCE NATIVE 3D BENTO CARD TILT SCRIPT
// ============================================================================
const cards = document.querySelectorAll('.js-tilt-card');

cards.forEach(card => {
    const bgImage = card.querySelector('.card-bg-image');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        
        const rotateX = ((y / cardHeight) - 0.5) * -20;
        const rotateY = ((x / cardWidth) - 0.5) * 20;
        
        const moveX = ((x / cardWidth) - 0.5) * -15;
        const moveY = ((y / cardHeight) - 0.5) * -15;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        if (bgImage) {
            bgImage.style.transform = `scale(1.15) translate3d(${moveX}px, ${moveY}px, -10px)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        if (bgImage) {
            bgImage.style.transform = `scale(1.15) translate3d(0px, 0px, -10px)`;
        }
    });
});


// ============================================================================
// 4. DUAL-STATE CANVAS RENDERING ENGINE (STARFIELD VS CAT-MATRIX RAIN)
// ============================================================================
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let backgroundState = "starfield"; // Options: "starfield" or "matrix"
let inputBuffer = ""; 

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Starfield Init Array
const stars = [];
for(let i=0; i<80; i++){
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5
    });
}

// Cat Matrix Drops Init Array
const catEmojis = ["🐾", "🐱", "🐈", "💡", "😺", "😸", "😽", "🐈‍⬛"];
const fontSize = 16;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = [];

function initMatrixDrops() {
    columns = Math.floor(window.innerWidth / fontSize);
    drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100; // Staggers entrance points nicely
    }
}
initMatrixDrops();
window.addEventListener('resize', initMatrixDrops);

// Master Core Toggle Mechanism
function toggleBackgroundMode() {
    backgroundState = (backgroundState === "starfield") ? "matrix" : "starfield";
    inputBuffer = ""; // Flush memory buffer completely
    
    if (backgroundState === "matrix") {
        initMatrixDrops();
    }
}

// Bulleproof Character String Listener Loop
document.addEventListener("keydown", (e) => {
    if (e.key.length > 1) return; // Skip keys like Shift/Alt/Command
    
    inputBuffer += e.key.toLowerCase();
    
    // Strict bounding limit to last 3 keystrokes to align perfectly with "cat"
    if (inputBuffer.length > 3) {
        inputBuffer = inputBuffer.slice(-3);
    }
    
    if (inputBuffer === "cat") {
        toggleBackgroundMode();
    }
});

// Triple Click Signature Fallback Trigger
let sigClickCount = 0;
const sigContainer = document.querySelector(".signature-container");
if (sigContainer) {
    sigContainer.style.cursor = "pointer";
    sigContainer.addEventListener("click", () => {
        sigClickCount++;
        if (sigClickCount >= 3) {
            toggleBackgroundMode();
            sigClickCount = 0; 
        }
    });
}

// Frame Animation Pipeline Loops
function animateBackgroundPipeline(){
    if (backgroundState === "starfield") {
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
    } else if (backgroundState === "matrix") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Creates the iconic alpha trail fade out
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#ff8c00"; // Signature Orange Amber Glow
        ctx.font = fontSize + "px Space Grotesk, sans-serif";
        
        for (let i = 0; i < drops.length; i++) {
            const text = catEmojis[Math.floor(Math.random() * catEmojis.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    requestAnimationFrame(animateBackgroundPipeline);
}
animateBackgroundPipeline();


// ============================================================================
// 5. DUAL-STATE CASSETTE TAPE TRACKING MODULE (STALKING VS FLOATING)
// ============================================================================
const cassette = document.querySelector(".cassette");
let floatFrame = 0;

function updateCassette() {
    floatFrame += 0.02;
    
    if (cassette) {
        if (isCatMode) {
            // Cat Stalking Behavior: Fast, interactive angular targeting vectors
            const rect = cassette.getBoundingClientRect();
            const cassetteCenterX = rect.left + rect.width / 2;
            const cassetteCenterY = rect.top + rect.height / 2;
            
            const targetX = (currentMouseX - cassetteCenterX) * 0.12;
            const targetY = (currentMouseY - cassetteCenterY) * -0.12;
            
            cassette.style.transform = `translate3d(${targetX * 0.2}px, ${-targetY * 0.2}px, 0) rotateY(${targetX}deg) rotateX(${targetY}deg)`;
        } else {
            // Normal Behavior: Relaxed, undulating floating timeline loop
            const floatY = Math.sin(floatFrame) * 10;
            const normalizedX = (currentMouseX / window.innerWidth - 0.5) * 20;
            const normalizedY = (currentMouseY / window.innerHeight - 0.5) * 20;
            cassette.style.transform = `translateY(${floatY}px) rotateY(${normalizedX}deg) rotateX(${-normalizedY}deg)`;
        }
    }
    requestAnimationFrame(updateCassette);
}
updateCassette();


// ============================================================================
// 6. SIMPLE CLOUD SCROLL PARALLAX MAPPER
// ============================================================================
window.addEventListener("scroll", () => {
    const parallaxElements = document.querySelectorAll(".scroll-parallax");
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(el => {
        const speed = el.getAttribute("data-speed");
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});
