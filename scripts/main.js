import './contactForm.js';

window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
});

window.addEventListener('DOMContentLoaded', (event) => {

    const point = document.querySelector('.moving-point-wrapper'); // <- Jediná změna zde

    function movePoint() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const pointSize = 250; // Velikost z CSS

        const newX = Math.random() * (screenWidth - pointSize);
        const newY = Math.random() * (screenHeight - pointSize);

        point.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    movePoint();
    setInterval(movePoint, 10000); 
});