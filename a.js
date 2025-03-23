document.addEventListener("DOMContentLoaded", function () {
    let aboutCards = document.querySelectorAll(".about-card");

    aboutCards.forEach(card => {
        card.addEventListener("mouseover", () => {
            card.style.transform = "scale(1.05)";
        });
        card.addEventListener("mouseout", () => {
            card.style.transform = "scale(1)";
        });
    });
});
