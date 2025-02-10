// Adjust animation speed based on the container width dynamically
const scrollingWrapper = document.querySelector('.scrolling-wrapper');
const cards = document.querySelectorAll('.feature-card');

const totalWidth = Array.from(cards).reduce((acc, card) => acc + card.offsetWidth + 10, 0); // 10px gap
scrollingWrapper.style.animation = `scroll ${totalWidth / 50}s linear infinite`;


document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-float-in");
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        },
        { threshold: 0.5 } // Adjust as needed for timing of the animation
    );

    document.querySelectorAll(".mission-vision").forEach((section) => {
        observer.observe(section);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const scrollWrapper = document.querySelector(".scroll-wrapper");
    const featureCards = Array.from(document.querySelectorAll(".feature-card"));

    // Duplicate feature cards for seamless scrolling
    featureCards.forEach((card) => {
        const clone = card.cloneNode(true);
        scrollWrapper.appendChild(clone);
    });
});
