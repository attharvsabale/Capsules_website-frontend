gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2.5,
  smoothTouch: 0.1,
  effects: true,
});

const tl = gsap.timeline();

tl.to(".loading", {
  width: "100%",
  duration: 0.7,
  delay: 0.3,
})
.to(".capsuleLogo", {
  scale: 2,
  duration: 0.5,
  opacity: 0,
}, 'a')
.to(".capsul", {
  clipPath: "inset(0% 0% 0% 0%)",
}, 'a')

const tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1",
    start: "90% 80%",
    end: "155% 80%",
    // markers: true,
    scrub: true,
  }
})

tl1.to("#bgImage", {
  transform: "scale(1.05)",
})

// page2 animation

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2",
    start: "28% 70%",
    end: "100% 70%",
    // markers: true,
    scrub: 1,
  }
})

tl2.to(".page2 .bottom", {
  y: 760,
})

// page3 animation

const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page3",
    start: "25% 50%",
    end: "60% 50%",
    // markers: true,
    scrub: 1,
  }
})

tl3.to(".hide", {
  top: "-100%",
  stagger: 0.1
})

// page4 animation
const tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page4",
    start: "30% 30%",
    end: "220% 30%",
    // markers: true,
    scrub: 1,
    pin: true,
  }
})

tl4.to(".box h3", {
  opacity: 0,
}, 'a')
.to(".page4 .background", {
  width: "calc(100vw - 1rem)",
  height: "calc(100vh - 1rem)",
  borderRadius: "3.5rem",
  y: -40,
}, 'a')
.to(".page4 .background img", {
  transform: "scale(1)",
}, 'a')
.from(".background .topText h4, .background .topText h3, .background .bottomText h3", {
  opacity: 0,
  x: 50,
})
tl4.to({}, { duration: 0.4 }, "+=0")

.to("#second", {
  transform: "translate(-50%, -56%)",
}, 'b')
.to("#second img", {
  transform: "scale(1)",
}, 'b')
.to(".page4 .background", {
  scale: 0.9,
  opacity: 0,
  y: -50
}, 'b')
.from("#second .topText h4, #second .topText h3, #second .bottomText h3", {
  opacity: 0,
  x: 50,
})
tl4.to({}, { duration: 0.4 }, "+=0")

.to("#third", {
  transform: "translate(-50%, -56%)",
}, 'c')
.to("#third img", {
  transform: "scale(1)",
}, 'c')
.to("#second", {
  scale: 0.9,
  opacity: 0,
}, 'c')
.from("#third .topText h4, #third .topText h3, #third .bottomText h3", {
  opacity: 0,
  x: 50,
})
tl4.to({}, { duration: 0.4 }, "+=0")


const hoverLink = document.querySelector('.hover-link');
const popup = hoverLink.querySelector('.popup');

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
let rafId = null;
const EASE = 0.15; // smoothness

hoverLink.addEventListener('mouseenter', e => {
  const rect = hoverLink.getBoundingClientRect();
  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;
  currentX = targetX;
  currentY = targetY;
  popup.classList.add('visible');
  if (!rafId) loop();
});

hoverLink.addEventListener('mousemove', e => {
  const rect = hoverLink.getBoundingClientRect();
  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;
});

hoverLink.addEventListener('mouseleave', () => {
  popup.classList.remove('visible');
});

function loop() {
  rafId = requestAnimationFrame(loop);

  currentX += (targetX - currentX) * EASE;
  currentY += (targetY - currentY) * EASE;

  popup.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${popup.classList.contains('visible') ? 1 : 0.5})`;
  popup.style.opacity = popup.classList.contains('visible') ? 1 : 0;
}


const stars = document.querySelectorAll('.star-symbol');

let rotation = 0;
let velocity = 0;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY;
  lastScrollY = currentScrollY;

  // Very slow sensitivity
  velocity += delta * 0.05;

  // Cap max speed
  velocity = Math.max(Math.min(velocity, 1), -1);
});

function animate() {
  rotation += velocity;
  velocity *= 0.97; // smooth, gradual slowdown

  stars.forEach(star => {
    star.style.transform = `rotate(${rotation}deg)`;
  });

  requestAnimationFrame(animate);
}

animate();


document.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger, SplitText);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const initTextSplit = () => {
    const textElements = document.querySelectorAll(".col-3 h1, .col-3 p");

    textElements.forEach((element) => {
      const split = new SplitText(element, {
        type: "lines",
        linesClass: "line",
      });
      
      split.lines.forEach(
        (line) => (line.innerHTML = `<span>${line.textContent}</span>`)
      );
    });
  };

  initTextSplit();

  gsap.set(".col-3 .col-content-wrapper .line span", { y: "0%" });
  gsap.set(".col-3 .col-content-wrapper-2 .line span", { y: "-125%" });

  let currentPhase = 0;

  ScrollTrigger.create({
    trigger: ".sticky-cols",
    start: "top top",
    end: `+=${window.innerHeight * 5}px`,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      const progress = self.progress;

      if (progress >= 0.25 && currentPhase === 0) {
        currentPhase = 1;

        gsap.to(".col-1", { opacity: 0, scale: 0.75, duration: 0.75 });
        gsap.to(".col-2", { x: "0%", duration: 0.75 });
        gsap.to(".col-3", { y: "0%", duration: 0.75 });

        gsap.to(".col-img-1 img", { scale: 1.25, duration: 0.75 });
        gsap.to(".col-img-2", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.75,
        });
        gsap.to(".col-img-2 img", { scale: 1, duration: 0.75 });
      }

      if (progress >= 0.5 && currentPhase === 1) {
        currentPhase = 2;

        gsap.to(".col-2", { opacity: 0, scale: 0.75, duration: 0.75 });
        gsap.to(".col-3", { x: "0%", duration: 0.75 });
        gsap.to(".col-4", { y: "0%", duration: 0.75 });

        gsap.to(".col-3 .col-content-wrapper .line span", {
          y: "-125%",
          duration: 0.75,
        });
        gsap.to(".col-3 .col-content-wrapper-2 .line span", {
          y: "0%",
          duration: 0.75,
          delay: 0.5,
        });
      }

      if (progress < 0.25 && currentPhase >= 1) {
        currentPhase = 0;

        gsap.to(".col-1", { opacity: 1, scale: 1, duration: 0.75 });
        gsap.to(".col-2", { x: "100%", duration: 0.75 });
        gsap.to(".col-3", { y: "100%", duration: 0.75 });

        gsap.to(".col-img-1 img", { scale: 1, duration: 0.75 });
        gsap.to(".col-img-2", {
          clipPath: "polygon(0% 0%, 100% 0%, 0% 0%)",
          duration: 0.75,
        });
        gsap.to(".col-img-2 img", { scale: 1.25, duration: 0.75 });
      }

      if (progress < 0.5 && currentPhase === 2) {
        currentPhase = 1;

        gsap.to(".col-2", { opacity: 1, scale: 1, duration: 0.75 });
        gsap.to(".col-3", { x: "100%", duration: 0.75 });
        gsap.to(".col-4", { y: "100%", duration: 0.75 });

        gsap.to(".col-3 .col-content-wrapper .line span", {
          y: "0%",
          duration: 0.75,
          delay: 0.5,
        });
        gsap.to(".col-3 .col-content-wrapper-2 .line span", {
          y: "-125%",
          duration: 0.75,
        });
      }
    },
  });
});




  gsap.registerPlugin(ScrollTrigger);

  // Elements
  const container = document.querySelector(".page9-slider-container");
  const track = document.querySelector(".page9-slider-track");
  const slides = gsap.utils.toArray(".page9-slide");

  // Helper: how far we need to move horizontally
  const getMaxX = () => track.scrollWidth - container.clientWidth;

  // Main animation
  gsap.to(track, {
    x: () => -getMaxX(),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      end: () => "+=" + getMaxX(),
      snap: {
        snapTo: 1 / (slides.length - 1),
        duration: 0.2,
        inertia: false
      }
    }
  });


  window.addEventListener("load", () => ScrollTrigger.refresh());
  window.addEventListener("resize", () => ScrollTrigger.refresh());


gsap.registerPlugin(ScrollTrigger); 

const reviews = document.querySelectorAll(".page10-review");
const progressBar = document.querySelector(".page10-progress-bar");
let currentIndex = 0;

function animateReviewChange(newIndex, direction) {
  let currentReview = reviews[currentIndex];
  let nextReview = reviews[newIndex];


  gsap.to(currentReview, {
    opacity: 0,
    x: direction === "next" ? -50 : 50,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => {
      currentReview.classList.remove("active");

      // Show next review
      nextReview.classList.add("active");
      gsap.fromTo(
        nextReview,
        { opacity: 0, x: direction === "next" ? 50 : -50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.inOut" }
      );
    }
  });


  gsap.to(progressBar, {
    width: `${((newIndex + 1) / reviews.length) * 100}%`,
    duration: 0.5,
    ease: "power2.out"
  });

  currentIndex = newIndex;
}

document.getElementById("prevReview").addEventListener("click", () => {
  let newIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  animateReviewChange(newIndex, "prev");
});

document.getElementById("nextReview").addEventListener("click", () => {
  let newIndex = (currentIndex + 1) % reviews.length;
  animateReviewChange(newIndex, "next");
});


reviews.forEach((r, i) => {
  if (i !== 0) r.style.opacity = 0;
});
reviews[0].classList.add("active");
progressBar.style.width = `${(1 / reviews.length) * 100}%`;


gsap.registerPlugin(ScrollTrigger);

const marqueeTrack = document.querySelector(".scroll-inner");


marqueeTrack.innerHTML += marqueeTrack.innerHTML;
const contentWidth = marqueeTrack.offsetWidth / 2;

const baseSpeed = 20;


const marqueeTween = gsap.to(marqueeTrack, {
  x: `-=${contentWidth}`,
  duration: contentWidth / baseSpeed,
  ease: "linear",
  repeat: -1,
  paused: true,
  modifiers: {
    x: gsap.utils.unitize(x => parseFloat(x))
  }
});


ScrollTrigger.create({
  trigger: ".adventure-section",
  start: "top+=200 bottom", 
  end: "bottom top",
  onEnter: () => marqueeTween.play(),
  onEnterBack: () => marqueeTween.play(),
  onLeave: () => marqueeTween.pause(),
  onLeaveBack: () => marqueeTween.pause(),
  onUpdate: (self) => {
    const velocity = self.getVelocity() * 0.05;
    if (velocity > 0) {
      marqueeTween.timeScale(1 + velocity);
    } else if (velocity < 0) {
      marqueeTween.timeScale(-1 + velocity);
    } else {
      marqueeTween.timeScale(1);
    }
  }
});


gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".footer-title span",
  {
    clipPath: "inset(0 100% 0 0)", // fully hidden from right
    opacity: 1
  },
  {
    clipPath: "inset(0 0% 0 0)", // fully revealed
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.05,
    scrollTrigger: {
      trigger: ".footer",
      start: "top 80%",
      toggleActions: "restart none none reverse"
    }
  }
);
