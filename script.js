gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// 1. DYNAMIC GSAP SCROLL VIDEO ANIMATION TIMELINE & AUTOPLAY FORCING ENGINE
// ============================================================================
const videoContainerSelector = document.querySelector(".apple-video-container");

if(videoContainerSelector) {
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
}

const premiumVideo = document.querySelector(".featured-video");
if (premiumVideo) {
    premiumVideo.muted = true;
    premiumVideo.defaultMuted = true;
    premiumVideo.setAttribute("muted", "");
    premiumVideo.setAttribute("playsinline", "");
    
    const forceVideoPlay = () => {
        premiumVideo.play().catch(err => console.log("Retrying playback stream..."));
    };

    forceVideoPlay();

    document.addEventListener("touchstart", forceVideoPlay, { once: true, passive: true });
    document.addEventListener("click", forceVideoPlay, { once: true });
    document.addEventListener("scroll", forceVideoPlay, { once: true, passive: true });
}


// ============================================================================
// 2. CURSOR SYSTEMS & COORDINATE TRACKING LOOPS
// ============================================================================
let isCatMode = false;
const glow = document.getElementById("customCursor");
const toggleInput = document.getElementById("catModeToggle");

if(toggleInput) {
    toggleInput.addEventListener("change", (e) => {
        isCatMode = e.target.checked;
        if (isCatMode) {
            document.body.classList.add("cat-mode-active");
        } else {
            document.body.classList.remove("cat-mode-active");
            if (cassette) cassette.style.transform = `translateY(0px)`;
        }
    });
}

let currentMouseX = window.innerWidth / 2;
let currentMouseY = window.innerHeight / 2;

function updateGlowPosition(x, y) {
    if(glow) {
        currentMouseX = x;
        currentMouseY = y;
        glow.style.left = currentMouseX + "px";
        glow.style.top = currentMouseY + "px";
    }
}

document.addEventListener("mousemove", (e) => {
    updateGlowPosition(e.clientX, e.clientY);
});

document.addEventListener("touchmove", (e) => {
    if(e.touches.length > 0) {
        updateGlowPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });


// ============================================================================
// 3. HOLLYWOOD OSCAR-STYLE OSCILLATING SPOTLIGHT RAY TRACKER
// ============================================================================
const spotlightFrame = document.getElementById("spotlightTextFrame");
const oscarBeam = document.getElementById("oscarLightBeam");

if(spotlightFrame && oscarBeam) {
    spotlightFrame.addEventListener("mousemove", (e) => {
        oscarBeam.style.left = e.clientX + "px";
    });
}


// ============================================================================
// 4. SPARKLE CONFETTI PARTY POPS BUTTON LAYER RE-ROUTING
// ============================================================================
const burstCanvas = document.getElementById("btnBurstCanvas");
const burstBtnWrapper = document.getElementById("burstBtnWrapper"); 

if (burstCanvas && burstBtnWrapper) {
    const burstCtx = burstCanvas.getContext("2d");
    let burstParticles = [];
    let isHoveringButton = false;
    let burstAnimationId = null;

    function resizeBurstCanvas() {
        burstCanvas.width = burstBtnWrapper.offsetWidth + 240;
        burstCanvas.height = burstBtnWrapper.offsetHeight + 240;
    }
    resizeBurstCanvas();

    class PartyParticle {
        constructor(type) {
            this.x = burstCanvas.width / 2;
            this.y = burstCanvas.height / 2;
            this.type = type; 
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 5;
            
            this.vx = Math.cos(angle) * velocity;
            this.vy = Math.sin(angle) * velocity;
            this.alpha = 1;
            this.decay = 0.015 + Math.random() * 0.02;
            this.color = `hsl(${Math.random() * 360}, 100%, 60%)`; 
            this.size = 2 + Math.random() * 4;

            if(this.type === 'wavy') {
                this.waveHistory = [];
                this.waveFrequency = 0.1 + Math.random() * 0.2;
                this.waveAmplitude = 3 + Math.random() * 6;
                this.timeStep = Math.random() * 100;
            }
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;

            if (this.type === 'wavy') {
                this.timeStep += 0.5;
                const normalX = -this.vy;
                const normalY = this.vx;
                const len = Math.sqrt(normalX*normalX + normalY*normalY);
                const waveOffset = Math.sin(this.timeStep * this.waveFrequency) * this.waveAmplitude;
                
                const finalX = this.x + (normalX/len) * waveOffset;
                const finalY = this.y + (normalY/len) * waveOffset;
                
                this.waveHistory.push({x: finalX, y: finalY});
                if(this.waveHistory.length > 15) this.waveHistory.shift();
            }
        }

        draw() {
            burstCtx.save();
            burstCtx.globalAlpha = this.alpha;
            burstCtx.fillStyle = this.color;
            burstCtx.strokeStyle = this.color;

            if (this.type === 'sparkle') {
                burstCtx.beginPath();
                burstCtx.moveTo(this.x, this.y - this.size * 2);
                burstCtx.lineTo(this.x + this.size, this.y);
                burstCtx.lineTo(this.x, this.y + this.size * 2);
                burstCtx.lineTo(this.x - this.size, this.y);
                burstCtx.closePath();
                burstCtx.fill();
            } else if (this.type === 'popper') {
                burstCtx.fillRect(this.x, this.y, this.size * 1.5, this.size * 1.5);
            } else if (this.type === 'wavy' && this.waveHistory.length > 1) {
                burstCtx.lineWidth = this.size / 2;
                burstCtx.beginPath();
                burstCtx.moveTo(this.waveHistory[0].x, this.waveHistory[0].y);
                for(let i=1; i<this.waveHistory.length; i++) {
                    burstCtx.lineTo(this.waveHistory[i].x, this.waveHistory[i].y);
                }
                burstCtx.stroke();
            }
            burstCtx.restore();
        }
    }

    function renderBurstPipeline() {
        burstCtx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);

        if (isHoveringButton && burstParticles.length < 120) {
            const types = ['sparkle', 'popper', 'wavy'];
            burstParticles.push(new PartyParticle(types[Math.floor(Math.random() * types.length)]));
        }

        burstParticles.forEach((p, index) => {
            p.update();
            p.draw();
            if (p.alpha <= 0) burstParticles.splice(index, 1);
        });

        if (burstParticles.length > 0 || isHoveringButton) {
            burstAnimationId = requestAnimationFrame(renderBurstPipeline);
        } else {
            burstAnimationId = null;
        }
    }

    const startBurstTrigger = () => {
        resizeBurstCanvas();
        isHoveringButton = true;
        if (!burstAnimationId) renderBurstPipeline();
    };

    const stopBurstTrigger = () => {
        isHoveringButton = false;
    };

    burstBtnWrapper.addEventListener("mouseenter", startBurstTrigger);
    burstBtnWrapper.addEventListener("mouseleave", stopBurstTrigger);
    burstBtnWrapper.addEventListener("touchstart", startBurstTrigger, { passive: true });
    burstBtnWrapper.addEventListener("touchend", stopBurstTrigger);
}


// ============================================================================
// 5. HYBRID 3D TILT ENGINE & INTEGRATED INSIDE-BOX CARD ANIMATIONS
// ============================================================================
const cards = document.querySelectorAll('.js-tilt-card, .portfolio-card, .mg-card-row');
const animatedCards = document.querySelectorAll('.js-animated-card');

animatedCards.forEach(card => {
    const cardCanvas = card.querySelector('.card-animation-canvas');
    if(!cardCanvas) return;
    
    const cardCtx = cardCanvas.getContext('2d');
    let cardParticles = [];
    let isAnimatingCard = false;
    
    function resizeCardCanvas() {
        cardCanvas.width = card.offsetWidth;
        cardCanvas.height = card.offsetHeight;
    }
    resizeCardCanvas();
    
    function setupCardParticles() {
        cardParticles = [];
        for(let i=0; i < 25; i++) {
            cardParticles.push({
                x: Math.random() * cardCanvas.width,
                y: cardCanvas.height + Math.random() * 20,
                speed: 1.5 + Math.random() * 3,
                length: 10 + Math.random() * 25,
                width: 1 + Math.random() * 1.5
            });
        }
    }

    function drawCardAnimationLoop() {
        if(!isAnimatingCard) return;
        cardCtx.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
        cardCtx.strokeStyle = 'rgba(0, 113, 227, 0.45)';
        cardCtx.lineCap = 'round';
        
        cardParticles.forEach(p => {
            cardCtx.lineWidth = p.width;
            cardCtx.beginPath();
            cardCtx.moveTo(p.x, p.y);
            cardCtx.lineTo(p.x, p.y - p.length);
            cardCtx.stroke();
            
            p.y -= p.speed;
            if(p.y < -20) {
                p.y = cardCanvas.height + 20;
                p.x = Math.random() * cardCanvas.width;
            }
        });
        requestAnimationFrame(drawCardAnimationLoop);
    }

    function startCardEffect() {
        resizeCardCanvas();
        setupCardParticles();
        isAnimatingCard = true;
        drawCardAnimationLoop();
    }

    function setupCardLeaveEffect() {
        isAnimatingCard = false;
        cardCtx.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
    }

    card.addEventListener('mouseenter', startCardEffect);
    card.addEventListener('mouseleave', setupCardLeaveEffect);
    card.addEventListener('touchstart', startCardEffect, { passive: true });
    card.addEventListener('touchend', setupCardLeaveEffect);
});

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

    card.addEventListener('mousemove', (e) => processTiltCalculation(e.clientX, e.clientY));
    card.addEventListener('mouseleave', resetTiltState);
    card.addEventListener('touchmove', (e) => {
        if(e.touches.length > 0) {
            processTiltCalculation(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });
    card.addEventListener('touchend', resetTiltState);
});


// ============================================================================
// 6. CANVAS RENDERING ENGINE & PROOFED TRIPLE-TAP LOGIC
// ============================================================================
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let backgroundState = "starfield"; 
let inputBuffer = ""; 

function resizeCanvas() {
    if(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
if(canvas) {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

const stars = [];
if(canvas) {
    for(let i=0; i<60; i++){
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5
        });
    }
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
if(canvas) {
    initMatrixDrops();
    window.addEventListener('resize', initMatrixDrops);
}

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

let sigClickCount = 0;
const sigContainer = document.querySelector(".signature-container");

if (sigContainer) {
    sigContainer.style.cursor = "pointer";
    const handleSignatureActivation = (e) => {
        if (e.type === 'touchstart') e.preventDefault(); 
        sigClickCount++;
        if (sigClickCount >= 3) {
            toggleBackgroundMode();
            sigClickCount = 0; 
        }
    };
    sigContainer.addEventListener("click", handleSignatureActivation);
    sigContainer.addEventListener("touchstart", handleSignatureActivation, { passive: false });
}

function animateBackgroundPipeline(){
    if(!canvas) return;
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
if(canvas) animateBackgroundPipeline();


// ============================================================================
// 7. DUAL-STATE CASSETTE TAPE TRACKING ENGINE
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
if(cassette) updateCassette();


// ============================================================================
// 8. CLOUD PARALLAX ENGINE
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
// 9. REAL SIGNATURE AUTOMATIC WRITE-ON ENGINE LOOP
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
// 10. INTERACTIVE FAQ ACCORDION TOGGLE
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
// 11. "WANT EASTER EGGS?" AD SIMULATOR
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


// ============================================================================
// 12. APPLE STYLE iMESSAGE POPUP TRIGGER INTERACTION
// ============================================================================
const contactHeader = document.getElementById("contactHeader");
const appleMsgNotify = document.getElementById("appleMsgNotify");
const appleMsgClose = document.getElementById("appleMsgClose");
let hasFiredMessage = false;

if (contactHeader && appleMsgNotify && appleMsgClose) {
    const triggerMessageAnimation = (e) => {
        if(e.type === 'touchstart') e.preventDefault();
        
        if(!hasFiredMessage) {
            appleMsgNotify.classList.add("show");
            hasFiredMessage = true;
            
            setTimeout(() => {
                appleMsgNotify.classList.remove("show");
            }, 7000);
        }
    };

    contactHeader.addEventListener("mouseenter", triggerMessageAnimation);
    contactHeader.addEventListener("touchstart", triggerMessageAnimation, { passive: false });

    appleMsgClose.addEventListener("click", () => {
        appleMsgNotify.classList.remove("show");
    });
}


// ============================================================================
// 13. INFINITE TIMELINE DRAG & CROSS-PLATFORM HAPTIC SCRUBBING SYSTEM
// ============================================================================
const scrubZone = document.getElementById("interactiveTimelineBar");
const ticksTrack = document.getElementById("timelineTicksTrack");
const readoutText = document.getElementById("scrubTimecode");

if (scrubZone && ticksTrack && readoutText) {
    let isDraggingTrack = false;
    let baselineStartX = 0;
    let trackCurrentTranslateX = -1000; 
    let simulationFrameCount = 24 * 12;  
    let lastRegisteredStepX = 0;

    function triggerHapticPulse() {
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(8); 
        }
    }

    function executeScrubMovement(deltaOffsetValue) {
        trackCurrentTranslateX += deltaOffsetValue;
        
        if (trackCurrentTranslateX > 0) trackCurrentTranslateX = -2000;
        if (trackCurrentTranslateX < -3000) trackCurrentTranslateX = -1000;
        
        ticksTrack.style.transform = `translateX(${trackCurrentTranslateX}px)`;

        if (Math.abs(trackCurrentTranslateX - lastRegisteredStepX) > 14) {
            if (deltaOffsetValue > 0) {
                simulationFrameCount++;
            } else {
                simulationFrameCount--;
                if (simulationFrameCount < 0) simulationFrameCount = 24 * 60 * 60; 
            }
            
            lastRegisteredStepX = trackCurrentTranslateX;
            triggerHapticPulse(); 

            let calculatedFrames = simulationFrameCount % 24;
            let calculatedSeconds = Math.floor(simulationFrameCount / 24) % 60;
            let calculatedMinutes = Math.floor(simulationFrameCount / (24 * 60)) % 60;
            let calculatedHours = Math.floor(simulationFrameCount / (24 * 60 * 60)) % 24;

            let formatZ = (val) => String(val).padStart(2, '0');
            readoutText.innerText = `TC ${formatZ(calculatedHours)}:${formatZ(calculatedMinutes)}:${formatZ(calculatedSeconds)}:${formatZ(calculatedFrames)}`;
        }
    }

    scrubZone.addEventListener("mousedown", (e) => {
        isDraggingTrack = true;
        baselineStartX = e.clientX;
        scrubZone.style.cursor = "ew-resize";
    });

    scrubZone.addEventListener("touchstart", (e) => {
        isDraggingTrack = true;
        baselineStartX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener("mousemove", (e) => {
        if (!isDraggingTrack) return;
        let movementDeltaX = e.clientX - baselineStartX;
        baselineStartX = e.clientX;
        executeScrubMovement(movementDeltaX);
    });

    document.addEventListener("touchmove", (e) => {
        if (!isDraggingTrack || e.touches.length === 0) return;
        let movementDeltaX = e.touches[0].clientX - baselineStartX;
        baselineStartX = e.touches[0].clientX;
        executeScrubMovement(movementDeltaX);
    }, { passive: true });

    const terminateDragState = () => {
        isDraggingTrack = false;
        if(scrubZone) scrubZone.style.cursor = "ew-resize";
    };

    document.addEventListener("mouseup", terminateDragState);
    document.addEventListener("touchend", terminateDragState);
}


// ============================================================================
// 14. DYNAMIC JUMPING MONEY EMOTICONS PARTICLE CANVAS PIPELINE
// ============================================================================
const moneyZone = document.getElementById("moneyLaunchZone");
const moneyCanvas = document.getElementById("moneyCanvasMesh");

if (moneyZone && moneyCanvas) {
    const mCtx = moneyCanvas.getContext("2d");
    let cashArray = [];
    let isHoveringZone = false;
    let loopId = null;

    function resizeMoneyCanvas() {
        moneyCanvas.width = moneyZone.offsetWidth + 200;
        moneyCanvas.height = moneyZone.offsetHeight + 300;
    }

    const assetTokens = ["💵", "💸", "💰", "💲"];

    class MoneyToken {
        constructor() {
            this.x = moneyCanvas.width / 2 + (Math.random() * 60 - 30);
            this.y = moneyCanvas.height - 40;
            this.token = assetTokens[Math.floor(Math.random() * assetTokens.length)];
            this.size = 18 + Math.random() * 12;
            this.vx = Math.random() * 6 - 3;
            this.vy = -(6 + Math.random() * 7);
            this.gravity = 0.22;
            this.alpha = 1;
            this.spinAngle = Math.random() * Math.PI;
            this.spinSpeed = Math.random() * 0.06 - 0.03;
        }
        update() {
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.spinAngle += this.spinSpeed;
            if (this.vy > 2) this.alpha -= 0.02; 
        }
        draw() {
            mCtx.save();
            mCtx.globalAlpha = Math.max(0, this.alpha);
            mCtx.translate(this.x, this.y);
            mCtx.rotate(this.spinAngle);
            mCtx.font = `${this.size}px serif`;
            mCtx.fillText(this.token, -this.size/2, this.size/2);
            mCtx.restore();
        }
    }

    function processRenderLoop() {
        mCtx.clearRect(0, 0, moneyCanvas.width, moneyCanvas.height);

        if (isHoveringZone && cashArray.length < 70) {
            cashArray.push(new MoneyToken());
        }

        cashArray.forEach((item, index) => {
            item.update();
            item.draw();
            if (item.alpha <= 0 || item.y > moneyCanvas.height) cashArray.splice(index, 1);
        });

        if (cashArray.length > 0 || isHoveringZone) {
            loopId = requestAnimationFrame(processRenderLoop);
        } else {
            loopId = null;
        }
    }

    moneyZone.addEventListener("mouseenter", () => {
        resizeMoneyCanvas();
        isHoveringZone = true;
        if (!loopId) processRenderLoop();
    });

    moneyZone.addEventListener("mouseleave", () => { isHoveringZone = false; });
    moneyZone.addEventListener("touchstart", () => {
        resizeMoneyCanvas();
        isHoveringZone = true;
        if (!loopId) processRenderLoop();
    }, { passive: true });
    moneyZone.addEventListener("touchend", () => { isHoveringZone = false; });
}


// ============================================================================
// 15. UPDATED: DEFENSIVE INTERCEPTION LOGIC REDIRECTING TO INSTAGRAM PROFILE
// ============================================================================
const selectionMenu = document.getElementById("contactChannelSelect");
const inputLabel = document.getElementById("dynamicFieldLabel");
const inputField = document.getElementById("dynamicFieldInput");
const clientFormElement = document.getElementById("clientIntakeForm");

if (selectionMenu && inputLabel && inputField) {
    const valueMapGuide = {
        instagram: { label: "Your Instagram Handle", holder: "@username" },
        linkedin: { label: "Your LinkedIn Profile URL", holder: "https://linkedin.com/in/username" },
        phone: { label: "Your Phone / WhatsApp Number", holder: "+1 (555) 000-0000" },
        email: { label: "Your Corporate Email Address", holder: "name@company.com" }
    };

    selectionMenu.addEventListener("change", (e) => {
        const pickedCoordinates = valueMapGuide[e.target.value];
        if (pickedCoordinates) {
            inputLabel.innerText = pickedCoordinates.label;
            inputField.placeholder = pickedCoordinates.holder;
            inputField.disabled = false;
            inputField.value = "";
            inputField.focus();
        }
    });
}

// CONVERTED: Intercepts form submit vectors and loads your main public feed page
if (clientFormElement) {
    clientFormElement.addEventListener("submit", (e) => {
        e.preventDefault(); 
        
        const clientName = document.getElementById("clientNameInput") ? document.getElementById("clientNameInput").value : "";
        const companyName = document.getElementById("companyNameInput") ? document.getElementById("companyNameInput").value : "";
        const pickedChannel = selectionMenu ? selectionMenu.value : "";
        const handleDetail = inputField ? inputField.value : "";

        console.log("Timeline Onboarding Intent Captured:", { clientName, companyName, pickedChannel, handleDetail });

        // Redirects your clients directly to your main Instagram profile feed wall cleanly
        window.location.href = "https://www.instagram.com/thecatguy.editz/";
    });
}
