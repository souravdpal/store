// Products Page Functionality
document.addEventListener("DOMContentLoaded", async function () {
    let allProducts = [];
    const productContainer = document.getElementById("productContainer");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const categoryFilter = document.getElementById("categoryFilter");
    const subcategoryFilter = document.getElementById("subcategoryFilter");
    const priceFilter = document.getElementById("priceFilter");
    const ratingFilter = document.getElementById("ratingFilter");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Debug: Check if DOM elements are found
    console.log("DOM Elements:", {
        productContainer,
        searchInput,
        searchBtn,
        categoryFilter,
        subcategoryFilter,
        priceFilter,
        ratingFilter,
        hamburger,
        navLinks
    });

    // Toggle Hamburger Menu
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.querySelector("i").classList.toggle("fa-bars");
            hamburger.querySelector("i").classList.toggle("fa-times");
        });
    } else {
        console.error("Hamburger or navLinks not found in DOM.");
    }

    // Fetch Products
    try {
        const response = await fetch("https://raw.githubusercontent.com/souravdpal/data.json/master/data.json");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        console.log("Fetched Products:", data);

        allProducts = Array.isArray(data) ? data : [];
        console.log("All Products:", allProducts);

        // Populate Category and Subcategory Filters
        const categories = [...new Set(allProducts.map(product => product.category))];
        const subcategories = [...new Set(allProducts.map(product => product.subcategory))];

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        subcategories.forEach(subcategory => {
            const option = document.createElement("option");
            option.value = subcategory;
            option.textContent = subcategory;
            subcategoryFilter.appendChild(option);
        });

        // Display All Products Initially
        displayProducts(allProducts);

        // Search Functionality
        const searchProducts = () => {
            const query = searchInput.value.toLowerCase();
            const filteredProducts = allProducts.filter(product => {
                const matchesQuery = 
                    product.name.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query) ||
                    (product.subcategory && product.subcategory.toLowerCase().includes(query));
                const matchesCategory = categoryFilter.value ? product.category === categoryFilter.value : true;
                const matchesSubcategory = subcategoryFilter.value ? product.subcategory === subcategoryFilter.value : true;
                const matchesPrice = priceFilter.value ? checkPriceRange(product.price, priceFilter.value) : true;
                const matchesRating = ratingFilter.value ? product.rating >= parseFloat(ratingFilter.value) : true;

                return matchesQuery && matchesCategory && matchesSubcategory && matchesPrice && matchesRating;
            });

            displayProducts(filteredProducts);
        };

        // Check Price Range (in rupees)
        const checkPriceRange = (price, range) => {
            // Parse price (e.g., "₹1,929" → 1929)
            const priceValue = parseFloat(price.replace(/[^0-9.-]+/g, ""));
            if (range === "0-5000") return priceValue >= 0 && priceValue <= 5000;
            if (range === "5000-10000") return priceValue > 5000 && priceValue <= 10000;
            if (range === "10000-20000") return priceValue > 10000 && priceValue <= 20000;
            if (range === "20000+") return priceValue > 20000;
            return true;
        };

        // Event Listeners for Search and Filters
        searchBtn.addEventListener("click", searchProducts);
        searchInput.addEventListener("input", searchProducts);
        categoryFilter.addEventListener("change", searchProducts);
        subcategoryFilter.addEventListener("change", searchProducts);
        priceFilter.addEventListener("change", searchProducts);
        ratingFilter.addEventListener("change", searchProducts);

        // Pre-filter by Category from URL (if coming from home.html)
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get("category");
        if (categoryFromUrl) {
            categoryFilter.value = categoryFromUrl;
            searchProducts();
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        if (productContainer) {
            productContainer.innerHTML = `<p class="error-message">Failed to load products. Please try again later.</p>`;
        } else {
            console.error("productContainer element not found in DOM.");
        }
    }

    // Display Products
    function displayProducts(products) {
        if (!productContainer) {
            console.error("productContainer element not found in DOM.");
            return;
        }

        productContainer.innerHTML = "";
        if (products.length === 0) {
            productContainer.innerHTML = `<p class="error-message">No products found.</p>`;
            return;
        }

        products.forEach((product, index) => {
            const card = document.createElement("div");
            card.className = "product-card fade-in";
            card.style.animationDelay = `${index * 0.1}s`;

            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}" onerror="this.onerror=null;this.src='https://picsum.photos/150?random=${index + 3}';">
                <h3>${product.name}</h3>
                <p><strong>Price:</strong> ${product.price}</p>
                <p class="rating">⭐ ${product.rating}</p>
                <a href="${product.link}" target="_blank" class="buy-btn" aria-label="Buy ${product.name} for ${product.price}">Buy Now</a>
            `;

            productContainer.appendChild(card);
        });
    }
});
