document.addEventListener("DOMContentLoaded", async function () {
    let allProducts = [];
    const productContainer = document.getElementById("product-list");
    const loadingElement = document.getElementById("loading");
    const categoryFilter = document.getElementById("categoryFilter");

    // Fetch Data from GitHub JSON
    async function fetchProducts() {
        try {
            const response = await fetch("https://raw.githubusercontent.com/souravdpal/data.json/master/data.json");
            if (!response.ok) throw new Error("Failed to fetch products");
            const data = await response.json();
            console.log("Fetched Data:", data);
            allProducts = Array.isArray(data) ? data : [];
            loadProducts(allProducts);
            loadingElement.style.display = "none";
        } catch (error) {
            console.error("Error loading products:", error);
            loadingElement.innerText = "Failed to load products.";
        }
    }

    // Load Products (with fade-in animation)
    function loadProducts(products) {
        productContainer.innerHTML = "";

        if (products.length === 0) {
            productContainer.innerHTML = `<p class="error-message">No products found.</p>`;
            return;
        }

        products.forEach((product, index) => {
            const card = document.createElement("div");
            card.className = "product-card fade-in";
            card.style.animationDelay = `${index * 0.1}s`; // staggered animation effect

            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/150';">
                <h3>${product.name}</h3>
                <p><strong>Price:</strong> ${product.price}</p>
                <p class="rating">⭐ ${product.rating}</p>
                <a href="${product.link}" target="_blank" class="buy-btn">Buy Now</a>
            `;

            productContainer.appendChild(card);
        });
    }

    // Filter by category
    categoryFilter.addEventListener("change", function () {
        const selectedCategory = this.value;
        const filteredProducts = selectedCategory === "all"
            ? allProducts
            : allProducts.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());
        loadProducts(filteredProducts);
    });

    // Fetch products on page load
    fetchProducts();
});
