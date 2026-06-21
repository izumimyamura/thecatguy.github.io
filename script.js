gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// 1. DYNAMIC GSAP SCROLL VIDEO ANIMATION TIMELINE
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

appleTimeline.fromTo(".video-scale-target", 
    { width: "100vw", height: "100vh", borderRadius: "0px" },
    { width: "85vw", height: "75vh", borderRadius: "36px", ease: "power1.inOut", duration: 1.5 }
);

appleTimeline.to(".step-1", { opacity: 1, y: 0, duration: 1 })
             .to(".step-1", { opacity: 0, y: -20, duration: 1 }, "+=0.8")

             .to(".step-2", { opacity: 1, y: 0, duration: 1 })
             .to(".step-2", { opacity: 0, y: -20, duration: 1 }, "+=0.8")

             .to(".step-3", { opacity: 1, y: 0, duration: 1 })
             .to(".step-3", { opacity: 0, y: -20, duration: 1 }, "+=0.8");


// ============================================================================
// 2. CURSOR SYSTEMS & MULTI-DEVICE COORDINATE TRACKING LOOP
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

let currentMouseX = window.innerWidth / 2;
let currentMouseY = window.innerHeight / 2;

function updateGlowPosition(x, y) {
    currentMouseX = x;
    currentMouseY = y;
    glow.style.left = currentMouseX + "px";
    glow.style.top = currentMouseY + "px";
}

// Track standard mouse movements
document.addEventListener("mousemove", (e) => {
    updateGlowPosition(e.clientX, e.clientY);
});

// Mobile Touch Tracking Override (Snaps cursor directly beneath finger placement)
document.addEventListener("touchmove", (e) => {
    if(e.touches.length > 0) {
        updateGlowPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });


// ============================================================================
// 3. HYBRID 3D TILT ENGINE (MOUSE HOVER & MOBILE TOUCH GESTURES)
// ============================================================================
const cards = document.querySelectorAll('.js-tilt-card, .portfolio-card');

cards.forEach(card => {
    const bgImage = card.querySelector('.card-bg-image');
    
    function processTiltCalculation(clientX, clientY) {
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left; 
        const y = clientY - rect.top;
        
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
    }
    
    function resetTiltState() {
        card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        if (bgImage) {
            bgImage.style.transform = `scale(1.15) translate3d(0px, 0px, -10px)`;
        }
    }

    // Standard Desktop Hover Bounds
    card.addEventListener('mousemove', (e) => processTiltCalculation(e.clientX, e.clientY));
    card.addEventListener('mouseleave', resetTiltState);

    // Mobile Swipe/Touch Listeners
    card.addEventListener('touchmove', (e) => {
        if(e.touches.length > 0) {
            processTiltCalculation(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });
    card.addEventListener('touchend', resetTiltState);
});


// ============================================================================
// 4. CANVAS RENDERING ENGINE (STARFIELD VS CAT-MATRIX RAIN)
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

const stars = [];
for(let i=0; i<60; i++){ // Kept slightly lower for processing efficiency on older phones
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5
    });
}

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

function toggleBackgroundMode() {
    backgroundState = (backgroundState === "starfield") ? "matrix" : "starfield";
    inputBuffer = ""; 
    if (backgroundState === "matrix") {
        initMatrixDrops();
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key.length > 1) return; 
    inputBuffer += e.key.toLowerCase();
    if (inputBuffer.length > 3) inputBuffer = inputBuffer.slice(-3);
    if (inputBuffer === "cat") toggleBackgroundMode();
});

// Triple Tap/Click Support for Desktop & Mobile Formats
let sigClickCount = 0;
const sigContainer = document.querySelector(".signature-container");
if (sigContainer) {
    sigContainer.style.cursor = "pointer";
    const handleSignatureActivation = () => {
        sigClickCount++;
        if (sigClickCount >= 3) {
            toggleBackgroundMode();
            sigClickCount = 0; 
        }
    };
    sigContainer.addEventListener("click", handleSignatureActivation);
    sigContainer.addEventListener("touchstart", handleSignatureActivation, { passive: true });
}

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
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; 
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
// 5. DUAL-STATE CASSETTE TAPE TRACKING VECTOR ENGINE
// ============================================================================
const cassette = document.querySelector(".cassette");
let floatFrame = 0;

function updateCassette() {
    floatFrame += 0.02;
    
    if (cassette) {
        if (isCatMode) {
            const rect = cassette.getBoundingClientRect();
            const cassetteCenterX = rect.left + rect.width / 2;
            const cassetteCenterY = rect.top + rect.height / 2;
            
            const targetX = (currentMouseX - cassetteCenterX) * 0.12;
            const targetY = (currentMouseY - cassetteCenterY) * -0.12;
            
            cassette.style.transform = `translate3d(${targetX * 0.2}px, ${-targetY * 0.2}px, 0) rotateY(${targetX}deg) rotateX(${targetY}deg)`;
        } else {
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
// 6. CLOUD PARALLAX ENGINE
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
    signaturePath.style.strokeDasharray = pathLength;
    signaturePath.style.strokeDashoffset = pathLength;

    const signatureTimeline = gsap.timeline({ repeat: -1 });

    signatureTimeline
        .set(signaturePath, { strokeDashoffset: pathLength })
        .to(signaturePath, { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut" })
        .fromTo([".sig-title-text", ".sig-subtitle-text"], { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.5")
        .to({}, { duration: 5 })
        .to([".sig-title-text", ".sig-subtitle-text"], { opacity: 0, duration: 0.3 })
        .to(signaturePath, { strokeDashoffset: pathLength, duration: 1.2, ease: "power2.in" });
}


// ============================================================================
// 8. INTERACTIVE ACCORDION TOGGLE CODE SETUP
// ============================================================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = item.querySelector('.faq-answer');
        
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0';
            }
        });
        
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = "0";
        }
    });
});


// ============================================================================
// 9. "WANT EASTER EGGS?" 4-STEP POP-UP SIMULATOR CONTROL LOOP
// ============================================================================
let currentAdStep = 1;
const adOverlay = document.getElementById("adOverlay");
const adMessageText = document.getElementById("adMessageText");
const adTriggerBtn = document.getElementById("eggTriggerBtn");
const adNextBtn = document.getElementById("adNextBtn");
const adCloseBtn = document.getElementById("adCloseBtn");

const adScriptArray = {
    1: "There is no easter egg here.",
    2: "Seriously, why are you still clicking? Stop.",
    3: "This is completely empty. Go back and watch the showreel.",
    4: "Fine. You win! Go down to the very bottom and tap the handwritten signature 3 times."
};

function launchAdSequence() {
    currentAdStep = 1;
    adMessageText.innerText = adScriptArray[currentAdStep];
    adNextBtn.innerText = "Next";
    adOverlay.classList.add("active");
}

function handleAdStepProgression() {
    currentAdStep++;
    if (currentAdStep <= 4) {
        adMessageText.innerText = adScriptArray[currentAdStep];
        if (currentAdStep === 4) adNextBtn.innerText = "Got It";
    } else {
        closeAdOverlayCleanly();
    }
}

function closeAdOverlayCleanly() {
    adOverlay.classList.remove("active");
}

if(adTriggerBtn && adOverlay && adNextBtn && adCloseBtn) {
    adTriggerBtn.addEventListener("click", launchAdSequence);
    adNextBtn.addEventListener("click", handleAdStepProgression);
    adCloseBtn.addEventListener("click", closeAdOverlayCleanly);
}
