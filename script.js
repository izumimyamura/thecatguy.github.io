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

const premiumVideo = document.querySelectorAll(".featured-video, .teaser-lane-card video, .ribbon-video-column video");
premiumVideo.forEach(vid => {
    vid.muted = true;
    vid.defaultMuted = true;
    vid.setAttribute("muted", "");
    vid.setAttribute("playsinline", "");
    
    const forceVideoPlay = () => {
        vid.play().catch(err => console.log("Retrying playback stream..."));
    };

    forceVideoPlay();

    document.addEventListener("touchstart", forceVideoPlay, { once: true, passive: true });
    document.addEventListener("click", forceVideoPlay, { once: true });
    document.addEventListener("scroll", forceVideoPlay, { once: true, passive: true });
});

// ============================================================================
// SCROLL DETECTOR FOR APPLE MUSIC GLASS NAVBAR TRANSFORMATION
// ============================================================================
const appNavbar = document.getElementById("masterAppNavbar");
window.addEventListener("scroll", () => {
    if (appNavbar) {
        if (window.scrollY > 120) {
            appNavbar.classList.add("apple-music-style");
        } else {
            appNavbar.classList.remove("apple-music-style");
        }
    }
});


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
// 4. SPARKLE CONFETTI PARTY POPS BUTTON CANVAS PIPELINE
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
                this.waveHistory.push({x: this.x + (normalX/len) * waveOffset, y: this.y + (normalY/len) * waveOffset});
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

    const stopBurstTrigger = () => { isHoveringButton = false; };
    burstBtnWrapper.addEventListener("mouseenter", startBurstTrigger);
    burstBtnWrapper.addEventListener("mouseleave", stopBurstTrigger);
    burstBtnWrapper.addEventListener("touchstart", startBurstTrigger, { passive: true });
    burstBtnWrapper.addEventListener("touchend", stopBurstTrigger);
}


// ============================================================================
// 5. PORTFOLIO CARD HOVER MOUSE-TILT 3D MATRIX EFFECT
// ============================================================================
const cards = document.querySelectorAll('.js-tilt-card, .portfolio-card, .mg-card-row');
cards.forEach(card => {
    const bgImage = card.querySelector('.card-bg-image');
    function processTiltCalculation(clientX, clientY) {
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left; 
        const y = clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -20;
        const rotateY = ((x / rect.width) - 0.5) * 20;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        if (bgImage) bgImage.style.transform = `scale(1.15) translate3d(${((x / rect.width) - 0.5) * -15}px, ${((y / rect.height) - 0.5) * -15}px, -10px)`;
    }
    function resetTiltState() {
        card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        if (bgImage) bgImage.style.transform = `scale(1.15) translate3d(0, 0, -10px)`;
    }
    card.addEventListener('mousemove', (e) => processTiltCalculation(e.clientX, e.clientY));
    card.addEventListener('mouseleave', resetTiltState);
});


// ============================================================================
// 6. CANVAS RENDERING ENGINE & PROOFED TRIPLE-TAP LOGIC
// ============================================================================
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let backgroundState = "starfield"; 
let inputBuffer = ""; 

function resizeCanvas() {
    if(canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
}
if(canvas) { resizeCanvas(); window.addEventListener('resize', resizeCanvas); }

const stars = [];
if(canvas) {
    for(let i=0; i<60; i++){ stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 }); }
}

const catEmojis = ["🐾", "🐱", "🐈", "💡", "😺", "😸", "😽", "🐈‍⬛"];
const fontSize = 16;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = [];

function initMatrixDrops() {
    columns = Math.floor(window.innerWidth / fontSize); drops = [];
    for (let x = 0; x < columns; x++) drops[x] = Math.random() * -100;
}
if(canvas) { initMatrixDrops(); window.addEventListener('resize', initMatrixDrops); }

function toggleBackgroundMode() {
    backgroundState = (backgroundState === "starfield") ? "matrix" : "starfield";
    inputBuffer = ""; if (backgroundState === "matrix") initMatrixDrops();
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
    sigContainer.addEventListener("click", () => {
        sigClickCount++;
        if (sigClickCount >= 3) { toggleBackgroundMode(); sigClickCount = 0; }
    });
}

function animateBackgroundPipeline(){
    if(!canvas) return;
    if (backgroundState === "starfield") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            ctx.beginPath(); ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; ctx.fill(); star.y += 0.1;
            if(star.y > canvas.height){ star.y = 0; star.x = Math.random() * canvas.width; }
        });
    } else if (backgroundState === "matrix") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff8c00"; ctx.font = fontSize + "px Space Grotesk, sans-serif";
        for (let i = 0; i < drops.length; i++) {
            ctx.fillText(catEmojis[Math.floor(Math.random() * catEmojis.length)], i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    requestAnimationFrame(animateBackgroundPipeline);
}
if(canvas) animateBackgroundPipeline();


// ============================================================================
// 8. CLOUD PARALLAX ENGINE
// ============================================================================
window.addEventListener("scroll", () => {
    const parallaxElements = document.querySelectorAll(".scroll-parallax");
    parallaxElements.forEach(el => {
        el.style.transform = `translateY(${window.pageYOffset * el.getAttribute("data-speed")}px)`;
    });
});


// ============================================================================
// 9. REAL SIGNATURE AUTOMATIC WRITE-ON ENGINE LOOP
// ============================================================================
const signaturePath = document.querySelector(".sig-path");
if (signaturePath) {
    const pathLength = signaturePath.getTotalLength();
    signaturePath.style.strokeDasharray = pathLength; signaturePath.style.strokeDashoffset = pathLength;
    const signatureTimeline = gsap.timeline({ repeat: -1 });
    signatureTimeline.set(signaturePath, { strokeDashoffset: pathLength })
        .to(signaturePath, { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut" })
        .fromTo([".sig-title-text", ".sig-subtitle-text"], { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.5")
        .to({}, { duration: 5 }).to([".sig-title-text", ".sig-subtitle-text"], { opacity: 0, duration: 0.3 })
        .to(signaturePath, { strokeDashoffset: pathLength, duration: 1.2, ease: "power2.in" });
}


// ============================================================================
// 10. INTERACTIVE FAQ ACCORDION TOGGLE
// ============================================================================
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement; const answer = item.querySelector('.faq-answer');
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active'); otherItem.querySelector('.faq-answer').style.maxHeight = '0';
            }
        });
        item.classList.toggle('active');
        answer.style.maxHeight = item.classList.contains('active') ? answer.scrollHeight + "px" : "0";
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
const adScriptArray = { 1: "There is no easter egg here.", 2: "Seriously, why are you still clicking? Stop.", 3: "This is completely empty. Go back and watch the showreel.", 4: "Fine. You win! Go down to the very bottom and tap the handwritten signature 3 times." };

if(adTriggerBtn) {
    adTriggerBtn.addEventListener("click", () => { currentAdStep = 1; adMessageText.innerText = adScriptArray[currentAdStep]; adNextBtn.innerText = "Next"; adOverlay.classList.add("active"); });
    adNextBtn.addEventListener("click", () => { currentAdStep++; if (currentAdStep <= 4) { adMessageText.innerText = adScriptArray[currentAdStep]; if (currentAdStep === 4) adNextBtn.innerText = "Got It"; } else { adOverlay.classList.remove("active"); } });
    adCloseBtn.addEventListener("click", () => adOverlay.classList.remove("active"));
}


// ============================================================================
// 12. APPLE STYLE iMESSAGE POPUP TRIGGER INTERACTION
// ============================================================================
const contactHeader = document.getElementById("contactHeader");
const appleMsgNotify = document.getElementById("appleMsgNotify");
const appleMsgClose = document.getElementById("appleMsgClose");
let hasFiredMessage = false;

if (contactHeader && appleMsgNotify) {
    contactHeader.addEventListener("mouseenter", () => {
        if(!hasFiredMessage) { appleMsgNotify.classList.add("show"); hasFiredMessage = true; setTimeout(() => { appleMsgNotify.classList.remove("show"); }, 7000); }
    });
    appleMsgClose.addEventListener("click", () => appleMsgNotify.classList.remove("show"));
}


// ============================================================================
// 13. INFINITE TIMELINE DRAG & CROSS-PLATFORM HAPTIC SCRUBBING SYSTEM
// ============================================================================
const scrubZone = document.getElementById("interactiveTimelineBar");
const ticksTrack = document.getElementById("timelineTicksTrack");
const readoutText = document.getElementById("scrubTimecode");

if (scrubZone && ticksTrack && readoutText) {
    let isDraggingTrack = false; let baselineStartX = 0; let trackCurrentTranslateX = -1000; let simulationFrameCount = 24 * 12; let lastRegisteredStepX = 0;
    function triggerHapticPulse() { if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(8); }
    function executeScrubMovement(deltaOffsetValue) {
        trackCurrentTranslateX += deltaOffsetValue;
        if (trackCurrentTranslateX > 0) trackCurrentTranslateX = -2000; if (trackCurrentTranslateX < -3000) trackCurrentTranslateX = -1000;
        ticksTrack.style.transform = `translateX(${trackCurrentTranslateX}px)`;
        if (Math.abs(trackCurrentTranslateX - lastRegisteredStepX) > 14) {
            if (deltaOffsetValue > 0) { simulationFrameCount++; } else { simulationFrameCount--; if (simulationFrameCount < 0) simulationFrameCount = 24 * 60 * 60; }
            lastRegisteredStepX = trackCurrentTranslateX; triggerHapticPulse();
            let cf = simulationFrameCount % 24, cs = Math.floor(simulationFrameCount / 24) % 60, cm = Math.floor(simulationFrameCount / (24 * 60)) % 60, ch = Math.floor(simulationFrameCount / (24 * 60 * 60)) % 24;
            let fZ = (val) => String(val).padStart(2, '0'); readoutText.innerText = `TC ${fZ(ch)}:${fZ(cm)}:${fZ(cs)}:${fZ(cf)}`;
        }
    }
    scrubZone.addEventListener("mousedown", (e) => { isDraggingTrack = true; baselineStartX = e.clientX; });
    document.addEventListener("mousemove", (e) => { if (isDraggingTrack) { executeScrubMovement(e.clientX - baselineStartX); baselineStartX = e.clientX; } });
    document.addEventListener("mouseup", () => isDraggingTrack = false);
}


// ============================================================================
// 14. DYNAMIC JUMPING MONEY EMOTICONS PARTICLE CANVAS PIPELINE
// ============================================================================
const moneyZone = document.getElementById("moneyLaunchZone");
const moneyCanvas = document.getElementById("moneyCanvasMesh");

if (moneyZone && moneyCanvas) {
    const mCtx = moneyCanvas.getContext("2d"); let cashArray = []; let isHoveringZone = false; let loopId = null;
    function resizeMoneyCanvas() { moneyCanvas.width = moneyZone.offsetWidth + 200; moneyCanvas.height = moneyZone.offsetHeight + 300; }
    const assetTokens = ["💵", "💸", "💰", "💲"];
    class MoneyToken {
        constructor() {
            this.x = moneyCanvas.width / 2 + (Math.random() * 60 - 30); this.y = moneyCanvas.height - 40;
            this.token = assetTokens[Math.floor(Math.random() * assetTokens.length)]; this.size = 18 + Math.random() * 12;
            this.vx = Math.random() * 6 - 3; this.vy = -(6 + Math.random() * 7); this.gravity = 0.22; this.alpha = 1;
            this.spinAngle = Math.random() * Math.PI; this.spinSpeed = Math.random() * 0.06 - 0.03;
        }
        update() { this.vy += this.gravity; this.x += this.vx; this.y += this.vy; this.spinAngle += this.spinSpeed; if (this.vy > 2) this.alpha -= 0.02; }
        draw() { mCtx.save(); mCtx.globalAlpha = Math.max(0, this.alpha); mCtx.translate(this.x, this.y); mCtx.rotate(this.spinAngle); mCtx.font = `${this.size}px serif`; mCtx.fillText(this.token, -this.size/2, this.size/2); mCtx.restore(); }
    }
    function processRenderLoop() {
        mCtx.clearRect(0, 0, moneyCanvas.width, moneyCanvas.height);
        if (isHoveringZone && cashArray.length < 70) cashArray.push(new MoneyToken());
        cashArray.forEach((item, index) => { item.update(); item.draw(); if (item.alpha <= 0 || item.y > moneyCanvas.height) cashArray.splice(index, 1); });
        loopId = (cashArray.length > 0 || isHoveringZone) ? requestAnimationFrame(processRenderLoop) : null;
    }
    moneyZone.addEventListener("mouseenter", () => { resizeMoneyCanvas(); isHoveringZone = true; if (!loopId) processRenderLoop(); });
    moneyZone.addEventListener("mouseleave", () => isHoveringZone = false);
}


// ============================================================================
// 15. DEFENSIVE INTERCEPTION LOGIC REDIRECTING TO INSTAGRAM PROFILE
// ============================================================================
const selectionMenu = document.getElementById("contactChannelSelect");
const inputLabel = document.getElementById("dynamicFieldLabel");
const inputField = document.getElementById("dynamicFieldInput");
const clientFormElement = document.getElementById("clientIntakeForm");

if (selectionMenu && inputLabel && inputField) {
    const valueMapGuide = { instagram: { label: "Your Instagram Handle", holder: "@username" }, linkedin: { label: "Your LinkedIn Profile URL", holder: "https://linkedin.com/in/username" }, phone: { label: "Your Phone / WhatsApp Number", holder: "+1 (555) 000-0000" }, email: { label: "Your Corporate Email Address", holder: "name@company.com" } };
    selectionMenu.addEventListener("change", (e) => {
        const pc = valueMapGuide[e.target.value]; if (pc) { inputLabel.innerText = pc.label; inputField.placeholder = pc.holder; inputField.disabled = false; inputField.value = ""; inputField.focus(); }
    });
}
if (clientFormElement) {
    clientFormElement.addEventListener("submit", (e) => { e.preventDefault(); window.location.href = "https://www.instagram.com/thecatguy.editz/"; });
}


// ============================================================================
// CINEMATIC KINETIC FILMSPAN CORRIDOR COLLAPSE ACTION (IMAGE_410585.JPG)
// ============================================================================
const collapseTriggerBtn = document.getElementById("ribbonCollapseBtn");
const filmstripTrack = document.getElementById("filmstripTrack");

if (collapseTriggerBtn && filmstripTrack) {
    collapseTriggerBtn.addEventListener("click", () => {
        filmstripTrack.classList.toggle("total-zoomed-state");
        filmstripTrack.classList.toggle("zoomed-out-mosaic");

        if (filmstripTrack.classList.contains("zoomed-out-mosaic")) {
            collapseTriggerBtn.innerText = "Zoom Back In 🔍";
        } else {
            collapseTriggerBtn.innerText = "Wanna see all reels?";
        }
    });
}

// ============================================================================
// NEW: ADVANCED INTEGRATED THANOS DISINTEGRATION SNAP SYSTEM FOR SCROLL LABEL
// ============================================================================
const snapTextLabel = document.getElementById("snapLabelText");
const snapCanvas = document.getElementById("thanosSnapCanvas");

if (snapTextLabel && snapCanvas) {
    const sCtx = snapCanvas.getContext("2d");
    let snapParticles = [];
    let hasSnapped = false;

    function initSnapCanvas() {
        snapCanvas.width = 300;
        snapCanvas.height = 80;
    }
    initSnapCanvas();

    function createDustFromText() {
        if (hasSnapped) return;
        hasSnapped = true;

        // Render text temporary directly to local coordinate memory box matrices
        sCtx.fillStyle = "#ff8c00";
        sCtx.font = "bold 14px 'Space Grotesk', sans-serif";
        sCtx.textBaseline = "middle";
        sCtx.textAlign = "center";
        sCtx.fillText("SCROLL DOWN", snapCanvas.width / 2, snapCanvas.height / 2);

        // Scan render pixels to create coordinate particles arrays
        try {
            const rawImgData = sCtx.getImageData(0, 0, snapCanvas.width, snapCanvas.height);
            sCtx.clearRect(0, 0, snapCanvas.width, snapCanvas.height);
            snapTextLabel.style.opacity = "0"; // Hide base text cleanly

            for (let y = 0; y < snapCanvas.height; y += 2) {
                for (let x = 0; x < snapCanvas.width; x += 2) {
                    const pixelIndex = (y * snapCanvas.width + x) * 4;
                    if (rawImgData.data[pixelIndex + 3] > 120) { // Pixel pixel alpha verification thresholds
                        snapParticles.push({
                            x: x,
                            y: y,
                            vx: (Math.random() - 0.3) * 2 + 1.5, // Force horizontal wind drift parameters
                            vy: (Math.random() - 0.5) * 1.5 - 1, // Ascending floating tracks
                            alpha: 1,
                            decay: 0.008 + Math.random() * 0.015
                        });
                    }
                }
            }
            animateSnapDust();
        } catch(e) {
            snapTextLabel.style.opacity = "0";
        }
    }

    function animateSnapDust() {
        sCtx.clearRect(0, 0, snapCanvas.width, snapCanvas.height);
        let activeElements = false;

        snapParticles.forEach(p => {
            if (p.alpha > 0) {
                activeElements = true;
                sCtx.fillStyle = `rgba(255, 140, 0, ${p.alpha})`;
                sCtx.fillRect(p.x, p.y, 1.5, 1.5);
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= p.decay;
            }
        });

        if (activeElements) {
            requestAnimationFrame(animateSnapDust);
        } else {
            document.getElementById("snapContainer").style.display = "none";
        }
    }

    // Intercept scroll vector loops to trigger snap script instantly
    window.addEventListener("scroll", () => {
        if (window.scrollY > 15 && !hasSnapped) {
            createDustFromText();
        }
    }, { passive: true });
}
