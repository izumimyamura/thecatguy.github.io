// Mouse Glow

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Animated Text Reveal

gsap.from(".reveal",{
  y:100,
  opacity:0,
  duration:1.5,
  stagger:0.2
});

// Scroll Animation

gsap.utils.toArray(".card").forEach(card => {

  gsap.from(card,{
    scrollTrigger:{
      trigger:card,
      start:"top 80%"
    },
    y:100,
    opacity:0,
    duration:1
  });

});

// Hover Play Video

document.querySelectorAll(".card").forEach(card=>{

  const video = card.querySelector("video");

  card.addEventListener("mouseenter",()=>{
    video.play();
  });

  card.addEventListener("mouseleave",()=>{
    video.pause();
  });

});
