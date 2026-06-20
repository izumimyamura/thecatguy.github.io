// Mouse Glow

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

// Text Reveal

gsap.from(".reveal", {
    y:100,
    opacity:0,
    duration:1.5,
    stagger:0.2
});

// Cassette Rotation

const cassette = document.querySelector(".cassette");

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    cassette.style.transform =
        `rotateY(${x}deg) rotateX(${-y}deg)`;

});
