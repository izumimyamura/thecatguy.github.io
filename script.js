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

// Scale down window frame finishes smoothly FIRST
appleTimeline.fromTo(".video-scale-target", 
    { width: "100vw", height: "100vh", borderRadius: "0px" },
    { width: "85vw", height: "75vh", borderRadius: "36px", ease: "power1.inOut", duration: 1.5 }
);

// Sequence Overlays fire sequentially strictly AFTER window scaling reaches resting state
appleTimeline.to(".step-1", { opacity: 1, y: 0, duration: 1 })
             .to(".step-1", { opacity: 0, y: -20, duration: 1 }, "+=0.8")

             .to(".step-2", { opacity: 1, y: 0, duration: 1 })
             .to(".step-2", { opacity: 0, y: -20, duration: 1 }, "+=0.8")

             .to(".step-3", { opacity: 1, y: 0, duration: 1 })
             .to(".step-3", { opacity: 0, y: -20, duration: 1 }, "+=0.8");


// ============================================================================
// 2. GLOBAL CURSUR SYSTEMS & STATE MATRIX TRACKING
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
// 3. HIGH-PERFORMANCE NATIVE 3D BENTO CARD TILT ENGINE
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
// 4. CANVAS RENDERING ENGINE (STARFIELD VS BULLETPROOF CAT-MATRIX RAIN)
// ============================================================================
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let backgroundState = "starfield"; 
let inputBuffer = ""; 

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Starfield Init Arrays
const stars = [];
for(let i=0; i<80; i++){
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5
    });
}

// Matrix Cat Mode Drops Init Arrays
const catEmojis = ["🐾", "🐱", "🐈", "💡", "😺", "😸", "😽", "🐈‍⬛"];
const fontSize = 16;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = [];

function initMatrixDrops() {
    columns = Math.floor(window.innerWidth / fontSize);
    drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100;
    }
}
initMatrixDrops();
window.addEventListener('resize', initMatrixDrops);

// Master Core Mode Toggle Mechanics Switchboard
function toggleBackgroundMode() {
    backgroundState = (backgroundState === "starfield") ? "matrix" : "starfield";
    inputBuffer = ""; // Flush memory trace immediately
    
    if (backgroundState === "matrix") {
        initMatrixDrops();
    }
}

// Bulletproof Background String Typing Sequence Listener
document.addEventListener("keydown", (e) => {
    if (e.key.length > 1) return; // Skip function system keys like Shift/Alt
    
    inputBuffer += e.key.toLowerCase();
    
    // Keep string trace down explicitly to 3 character spaces
    if (inputBuffer.length > 3) {
        inputBuffer = inputBuffer.slice(-3);
    }
    
    if (inputBuffer === "cat") {
        toggleBackgroundMode();
    }
});

// Triple Click Core Emergency Fallback Trigger Map (Sig Container)
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

// Main Canvas Render Animate Loop Block
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
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Creates iconic trailing render sweep glow lines
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#ff8c00"; 
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
// 5. DUAL-STATE CASSETTE TAPE TRACKING VECTOR LOOPS
// ============================================================================
const cassette = document.querySelector(".cassette");
let floatFrame = 0;

function updateCassette() {
    floatFrame += 0.02;
    
    if (cassette) {
        if (isCatMode) {
            // Stalking Vector Engine: Snaps tightly towards crosshair fields
            const rect = cassette.getBoundingClientRect();
            const cassetteCenterX = rect.left + rect.width / 2;
            const cassetteCenterY = rect.top + rect.height / 2;
            
            const targetX = (currentMouseX - cassetteCenterX) * 0.12;
            const targetY = (currentMouseY - cassetteCenterY) * -0.12;
            
            cassette.style.transform = `translate3d(${targetX * 0.2}px, ${-targetY * 0.2}px, 0) rotateY(${targetX}deg) rotateX(${targetY}deg)`;
        } else {
            // Normal Vector Engine: Undulating lazy wave loops
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
// 6. CLOUD PARALLAX SYSTEM MAPPER
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


// ============================================================================
// 7. REAL SIGNATURE AUTOMATIC WRITE-ON LOOP WITH 5s HOLD DELAY
// ============================================================================
const signaturePath = document.querySelector(".sig-path");

if (signaturePath) {
    const pathLength = signaturePath.getTotalLength();
    
    // Core structural dash allocations initialization
    signaturePath.style.strokeDasharray = pathLength;
    signaturePath.style.strokeDashoffset = pathLength;

    // Build standalone endless timeline system loop
    const signatureTimeline = gsap.timeline({ repeat: -1 });

    signatureTimeline
        // Force flush reset timeline to baseline hidden states
        .set(signaturePath, { strokeDashoffset: pathLength })
        // Draw out vector script lines flawlessly over 2.5s duration
        .to(signaturePath, { 
            strokeDashoffset: 0, 
            duration: 2.5, 
            ease: "power2.inOut" 
        })
        // Fade subtitle typography up precisely as stroke draws close to final target points
        .fromTo([".sig-title-text", ".sig-subtitle-text"], 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.5, stagger: 0.1 }, 
            "-=0.5"
        )
        // Hold full signature block intact on frame view for precisely 5.0 seconds
        .to({}, { duration: 5 })
        // Clear text typography markers softly away before wipe trace actions trigger
        .to([".sig-title-text", ".sig-subtitle-text"], { opacity: 0, duration: 0.3 })
        // Clean wipe tracing vector path backwards to hide it before loop recursion triggers
        .to(signaturePath, { 
            strokeDashoffset: pathLength, 
            duration: 1.2, 
            ease: "power2.in" 
        });
}
