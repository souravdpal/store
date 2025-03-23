// Announcement and Featured Products functionality
document.addEventListener("DOMContentLoaded", async function () {
    let allAnnouncements = [];
    let allProducts = [];
    const announcementBanner = document.getElementById("announcementBanner");
    const announcementContent = document.getElementById("announcementContent");
    const announcementClose = document.getElementById("announcementClose");
    const featuredProductsContainer = document.getElementById("featuredProducts");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Exchange rate: 1 USD = 83 INR (approximate as of early 2025)
    const EXCHANGE_RATE = 83;

    // Toggle Hamburger Menu
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.querySelector("i").classList.toggle("fa-bars");
        hamburger.querySelector("i").classList.toggle("fa-times");
    });

    // Debug: Check if DOM elements are found
    console.log("DOM Elements:", {
        announcementBanner,
        announcementContent,
        announcementClose,
        featuredProductsContainer
    });

    // Check if the announcement has been dismissed
    const isDismissed = localStorage.getItem("announcementDismissed");
    console.log("Is Announcement Dismissed:", isDismissed);

    // Fetch Announcements
    if (!isDismissed) {
        try {
            const response = await fetch("https://raw.githubusercontent.com/souravdpal/data.json/master/announcements.json");
            if (!response.ok) throw new Error("Failed to fetch announcements");
            const data = await response.json();
            console.log("Fetched Announcements:", data);

            allAnnouncements = Array.isArray(data) ? data : [];
            console.log("All Announcements:", allAnnouncements);

            if (allAnnouncements.length > 0) {
                let currentIndex = 0;
                const randomIndex = Math.floor(Math.random() * allAnnouncements.length);
                currentIndex = randomIndex;
                console.log("Random Initial Index:", currentIndex);

                const displayAnnouncement = () => {
                    const announcement = allAnnouncements[currentIndex];
                    console.log("Displaying Announcement:", announcement);
                    announcementContent.innerHTML = `
                        <i class="${announcement.icon}"></i>
                        <span>${announcement.message}</span>
                        ${announcement.link ? `<a href="${announcement.link}" class="announcement-link">Shop Now</a>` : ""}
                    `;
                    setTimeout(() => {
                        announcementBanner.style.display = "block";
                        console.log("Announcement Banner Display Style After Setting:", announcementBanner.style.display);
                        console.log("Computed Display Style:", window.getComputedStyle(announcementBanner).display);
                    }, 100);
                };

                displayAnnouncement();

                setInterval(() => {
                    currentIndex = (currentIndex + 1) % allAnnouncements.length;
                    displayAnnouncement();
                }, 5000);
            } else {
                console.log("No announcements to display.");
            }
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }

        announcementClose.addEventListener("click", () => {
            console.log("Closing announcement banner.");
            announcementBanner.style.display = "none";
            localStorage.setItem("announcementDismissed", "true");
        });
    } else {
        console.log("Announcement dismissed, not showing banner.");
    }

    // Fetch Featured Products
    try {
        const response = await fetch("https://raw.githubusercontent.com/souravdpal/data.json/main/data.json");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        console.log("Fetched Products:", data);

        allProducts = Array.isArray(data) ? data : [];
        console.log("All Products:", allProducts);

        // Convert prices to rupees and add rupeePrice field
        allProducts = allProducts.map(product => {
            const priceInDollars = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
            const priceInRupees = priceInDollars * EXCHANGE_RATE;
            return {
                ...product,
                rupeePrice: priceInRupees.toFixed(2)
            };
        });

        // Display up to 3 featured products
        const featuredProducts = allProducts.slice(0, 3); // Take the first 3 products
        featuredProducts.forEach((product, index) => {
            const card = document.createElement("div");
            card.className = "product-card fade-in";
            card.style.animationDelay = `${index * 0.1}s`;

            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}" onerror="this.onerror=null;this.src='https://picsum.photos/150?random=${index + 3}';">
                <h3>${product.name}</h3>
                <p><strong>Price:</strong> ₹${product.rupeePrice}</p>
                <p class="rating">⭐ ${product.rating}</p>
                <a href="${product.link}" target="_blank" class="buy-btn" aria-label="Buy ${product.name} for ₹${product.rupeePrice}">Buy Now</a>
            `;

            featuredProductsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching featured products:", error);
        featuredProductsContainer.innerHTML = `<p class="error-message">Failed to load featured products.</p>`;
    }
});
