// Announcement, Featured Products, and Category Images functionality
document.addEventListener("DOMContentLoaded", async function () {
    let allAnnouncements = [];
    let allProducts = [];
    let categoryImages = { electronics: [], books: [] };
    const announcementBanner = document.getElementById("announcementBanner");
    const announcementContent = document.getElementById("announcementContent");
    const announcementClose = document.getElementById("announcementClose");
    const featuredProductsContainer = document.getElementById("featuredProducts");
    const electronicsImage = document.getElementById("electronicsImage");
    const booksImage = document.getElementById("booksImage");
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
        featuredProductsContainer,
        electronicsImage,
        booksImage
    });

    // Check if the announcement has been dismissed
    const isDismissed = localStorage.getItem("announcementDismissed");
    console.log("Is Announcement Dismissed:", isDismissed);

    // Function to fetch with retries
    const fetchWithRetries = async (url, retries = 3, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
                return await response.json();
            } catch (error) {
                if (i === retries - 1) throw error; // Last retry failed
                console.warn(`Fetch attempt ${i + 1} failed, retrying in ${delay}ms...`, error);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    };

    // Fetch Announcements
    if (!isDismissed) {
        try {
            const data = await fetchWithRetries("https://raw.githubusercontent.com/souravdpal/data.json/master/announcements.json");
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
            announcementContent.innerHTML = `<span>Unable to load announcements. Please try again later.</span>`;
            announcementBanner.style.display = "block";
        }

        announcementClose.addEventListener("click", () => {
            console.log("Closing announcement banner.");
            announcementBanner.style.display = "none";
            localStorage.setItem("announcementDismissed", "true");
        });
    } else {
        console.log("Announcement dismissed, not showing banner.");
    }

    // Fetch Category Images
    try {
        const response = await fetch("https://raw.githubusercontent.com/souravdpal/data.json/master/images.json");
        if (!response.ok) throw new Error("Failed to fetch category images");
        const data = await response.json();
        console.log("Fetched Category Images:", data);

        categoryImages = data;

        // Function to get a random image from an array
        const getRandomImage = (imageArray) => {
            if (imageArray && imageArray.length > 0) {
                const randomIndex = Math.floor(Math.random() * imageArray.length);
                return imageArray[randomIndex];
            }
            return "https://picsum.photos/300/200?random=1"; // Fallback image
        };

        // Initial image display
        electronicsImage.src = getRandomImage(categoryImages.electronics);
        booksImage.src = getRandomImage(categoryImages.books);

        // Update images every 5 seconds with a 1-second delay between categories
        setInterval(() => {
            electronicsImage.src = getRandomImage(categoryImages.electronics);
            setTimeout(() => {
                booksImage.src = getRandomImage(categoryImages.books);
            }, 1000); // 1-second delay for Books image
        }, 5000); // Change every 5 seconds
    } catch (error) {
        console.error("Error fetching category images:", error);
        // Fallback to Unsplash images if fetch fails
        electronicsImage.src = "https://picsum.photos/300/200?random=1";
        booksImage.src = "https://picsum.photos/300/200?random=2";
    }

    // Fetch Featured Products
    try {
        const response = await fetch("https://raw.githubusercontent.com/souravdpal/data.json/master/data.json");
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
