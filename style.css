* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    background: #000000;
    color: white;
    font-family: 'Space Grotesk', sans-serif;
    overflow-x: hidden;
}

/* Custom Premium Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: #000000;
}
::-webkit-scrollbar-thumb {
    background: #1c1c1e;
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background: #ff8c00;
}

/* Apple-Style Glass Navbar */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    z-index: 1000;
}

.logo {
    font-weight: 700;
    letter-spacing: -0.5px;
    font-size: 1.1rem;
}

.nav-controls {
    display: flex;
    align-items: center;
    gap: 40px;
}

.nav-links {
    display: flex;
    gap: 30px;
}

.nav-links a {
    color: #f5f5f7;
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.3s;
    font-size: 0.85rem;
    font-weight: 400;
}

.nav-links a:hover {
    opacity: 1;
}

/* Cat Mode Toggle Button Switch */
.cat-toggle-wrapper {
    position: relative;
    display: inline-block;
    width: 54px;
    height: 28px;
    cursor: pointer;
}

.cat-toggle-wrapper input {
    opacity: 0;
    width: 0;
    height: 0;
}

.cat-slider {
    position: absolute;
    inset: 0;
    background-color: #2c2c2e;
    border-radius: 34px;
    transition: 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.slider-icon {
    position: absolute;
    left: 4px;
    bottom: 2px;
    font-size: 0.95rem;
    transition: 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.cat-toggle-wrapper input:checked + .cat-slider {
    background-color: #ff8c00;
    box-shadow: 0 0 15px rgba(255, 140, 0, 0.4);
}

.cat-toggle-wrapper input:checked + .cat-slider .slider-icon {
    transform: translateX(24px) rotate(360deg);
}

/* Canvas & Cursor Engine */
#stars {
    position: fixed;
    inset: 0;
    z-index: -2;
    pointer-events: none;
}

.cursor-glow {
    position: fixed;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 140, 0, 0.08), rgba(255, 140, 0, 0));
    pointer-events: none;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    transition: width 0.3s, height 0.3s;
}

/* Cat Mode Vector SVG Paw Cursor Override */
body.cat-mode-active .cursor-glow {
    width: 45px;
    height: 45px;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff8c00'><path d='M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 2.08V22h2v-5.92c4.42-.49 8-4.24 8-8.83h-2c0 3.86-3.14 7-7 7s-7-3.14-7-7H3c0 4.59 3.58 8.34 8 8.83z'/></svg>") no-repeat center;
    background-size: contain;
    transform: translate(-20px, -20px);
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
    position: relative;
    background: #000000;
}

.hero-content {
    position: relative;
    z-index: 2;
}

.hero-content h1 {
    font-size: 7.5rem;
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -4px;
    background: linear-gradient(180deg, #ffffff 40%, #a1a1a6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-content p {
    margin-top: 15px;
    font-size: 1.5rem;
    color: #86868b;
    font-weight: 400;
}

.btn-container {
    position: relative;
    display: inline-block;
    z-index: 10;
}

.btn {
    display: inline-block;
    margin-top: 35px;
    padding: 12px 28px;
    background: #0071e3;
    color: white;
    text-decoration: none;
    font-weight: 400;
    font-size: 0.95rem;
    border-radius: 30px;
    transition: background 0.2s, transform 0.1s ease-out;
}

.btn:hover {
    background: #147ce5;
}

/* Layout Structural Wrapper forcing Cassette asset Landscape Horizontal */
.cassette-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(90deg); /* Change to -90deg if your source text orientation fields are flipped */
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.7));
    z-index: 2;
}

.cassette {
    width: 320px;
    transition: transform 0.1s ease-out;
    will-change: transform;
}

/* Cinematic Video Timeline Components */
.apple-video-container {
    position: relative;
    height: 450vh; 
    background: #000000;
}

.video-sticky-wrapper {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.video-scale-target {
    width: 100vw;
    height: 100vh;
    position: relative;
    will-change: transform, border-radius;
}

.featured-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0px;
}

.video-overlay-text {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    opacity: 0;
    transform: translateY(20px);
    will-change: transform, opacity;
}

.video-overlay-text h2 {
    font-size: 5rem;
    font-weight: 700;
    letter-spacing: -2.5px;
    margin-bottom: 12px;
    background: linear-gradient(180deg, #ffffff 30%, #a1a1a6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.video-overlay-text p {
    font-size: 1.4rem;
    color: #e8e8ed;
    max-width: 600px;
    line-height: 1.4;
}

/* Clouds Elements Config */
.cloud {
    position: absolute;
    pointer-events: none;
    opacity: 0.1;
    filter: blur(4px);
    z-index: 1;
}

.cloud svg {
    width: 100%;
    height: auto;
    fill: #ffffff;
}

.cloud-top { width: 400px; top: 15%; left: -5%; }
.cloud-bottom { width: 450px; top: -10%; right: -5%; }

/* Main Section Blocks */
.about, .contact {
    padding: 140px 10%;
    background: #000000;
    position: relative;
}

.about h2, .contact h2 {
    font-size: 3.5rem;
    font-weight: 700;
    letter-spacing: -1.5px;
    margin-bottom: 20px;
}

.about-header {
    max-width: 800px;
    margin-bottom: 50px;
}

.about-subtitle {
    font-size: 1.5rem;
    line-height: 1.5;
    color: #86868b;
}

/* Apple Bento Layout Grid */
.tech-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1200px;
    margin-top: 40px;
    perspective: 1000px;
}

.tech-card {
    position: relative;
    background: #1c1c1e;
    border-radius: 28px;
    overflow: hidden;
    z-index: 1;
    transform-style: preserve-3d;
    will-change: transform;
}

.card-content {
    position: relative;
    padding: 40px 30px;
    z-index: 3;
    pointer-events: none;
    transform: translateZ(30px);
}

.card-bg-image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    z-index: 2;
    transform: scale(1.15) translateZ(-10px);
    transition: opacity 0.4s ease;
    will-change: transform;
}

.card-bg-image::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.75) 100%);
}

.tech-card h3 {
    font-size: 1.8rem;
    margin-bottom: 6px;
    font-weight: 700;
    letter-spacing: -0.5px;
}

.tech-tag {
    display: inline-block;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #ff8c00;
    margin-bottom: 20px;
    font-weight: 500;
}

.tech-card p:not(.tech-tag) {
    font-size: 1.05rem;
    color: #a1a1a6;
    line-height: 1.5;
}

.tech-card.featured {
    background: linear-gradient(180deg, #2c2c2e 0%, #1c1c1e 100%);
}

.tech-card:hover .card-bg-image {
    opacity: 1;
}

/* Social Anchor Formats */
.contact p {
    font-size: 1.3rem;
    color: #86868b;
}

.contact-link-wrapper {
    margin-top: 15px;
    display: inline-block;
}

.contact-link {
    color: #f5f5f7;
    text-decoration: none;
    font-size: 1.3rem;
    font-weight: 500;
    display: inline-block;
    transition: transform 0.2s ease;
}

.contact-link:hover {
    transform: scale(1.02);
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: instagramGradientShift 3s ease infinite;
}

@keyframes instagramGradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Premium Image Reference Signature Vector Layout Typography Block */
.signature-container {
    width: 100%;
    max-width: 280px;
    margin-top: 45px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.sig-svg { 
    width: 100%; 
    height: auto; 
}

.sig-path {
    stroke: #ff8c00; 
    stroke-width: 3.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
}

.sig-title-text {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 6px;
    color: #ffffff;
    margin-top: -30px; /* Pulls text frame seamlessly tight under signature trails */
    text-transform: uppercase;
    opacity: 0; /* JS Timeline reveals this smoothly */
}

.sig-subtitle-text {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.65rem;
    font-weight: 300;
    letter-spacing: 2px;
    color: #86868b;
    margin-top: 2px;
    text-transform: uppercase;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 4px;
    display: inline-block;
    width: 110px;
    opacity: 0;
}

/* Responsive Viewports */
@media(max-width: 900px) {
    .navbar { padding: 15px 5%; }
    .nav-controls { gap: 15px; }
    .hero {
        flex-direction: column-reverse;
        justify-content: center;
        text-align: center;
        padding: 120px 5% 40px 5%;
    }
    .hero-content h1 { font-size: 4.2rem; letter-spacing: -2px; }
    .cassette-frame { margin-bottom: 30px; }
    .cassette { width: 200px; }
    .tech-grid { grid-template-columns: 1fr; gap: 16px; }
    .card-content { padding: 24px 16px; }
    .about h2, .contact h2 { font-size: 2.6rem; }
    .video-overlay-text h2 { font-size: 2.3rem; letter-spacing: -1px; }
    .video-overlay-text p { font-size: 1.1rem; }
}
