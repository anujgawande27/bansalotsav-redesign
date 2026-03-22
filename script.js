gsap.registerPlugin(ScrollTrigger);

  // HERO ANIMATION
  gsap.from(".hero h1", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.3
  });

  // TIMELINE
  gsap.from(".timeline div", {
    scrollTrigger: ".timeline",
    x: -100,
    opacity: 0,
    stagger: 0.3
  });

  const cursor = document.querySelector(".cursor");
const cursorBlur = document.querySelector(".cursor-back");

let mouseX = 0;
let mouseY = 0;

let posX = 0;
let posY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  // Smooth follow (lerp)
  posX += (mouseX - posX) * 0.15;
  posY += (mouseY - posY) * 0.15;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";

  cursorBlur.style.left = posX + "px";
  cursorBlur.style.top = posY + "px";

  requestAnimationFrame(animate);
}

animate();

const cards = document.querySelectorAll(".event-card");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeBtn = document.querySelector(".close");

const modalContent = document.querySelector(".modal-content");

// CLICK CARD
cards.forEach(card => {
  card.addEventListener("click", () => {

    // Reset state before opening
    gsap.set(modalContent, { scale: 0.7, opacity: 0 });

    modal.classList.add("active");

    modalImg.src = card.querySelector("img").src;
    modalTitle.innerText = card.querySelector("h2")?.innerText || "Event";
    modalDesc.innerText = "Detailed info about this event...";

    gsap.to(modalContent, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out"
    });
  });
});

// CLOSE
closeBtn.onclick = () => closeModal();

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  gsap.to(modalContent, {
    scale: 0.7,
    opacity: 0,
    duration: 0.3,
    ease: "power3.in",
    onComplete: () => {
      modal.classList.remove("active");

      // IMPORTANT RESET 🔥
      gsap.set(modalContent, { clearProps: "all" });
    }
  });
}

const eventDate = new Date("April 7, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = eventDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

}, 1000);
