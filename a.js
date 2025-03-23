document.addEventListener("DOMContentLoaded", function () {
    let aboutCards = document.querySelectorAll(".about-card");

    // Add staggered animation to about cards
    aboutCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`; // Staggered animation effect
    });
});
