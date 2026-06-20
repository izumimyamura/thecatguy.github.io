// Mouse Glow

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove",(e)=>{

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

// Text Reveal

gsap.from(".reveal",{
    y:100,
    opacity:0,
    duration:1.5,
    stagger:0.2
});
