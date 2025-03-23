document.addEventListener("DOMContentLoaded", function () {
    let allProducts = [];

    // Fetch Data (Unchanged)
    fetch("https://api.jsonbin.io/v3/b/67df0a0b8561e97a50f0ebe5")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data);
            allProducts = data.record || [];
            loadProducts(allProducts);
            document.getElementById("loading").style.display = "none";
        })
        .catch(error => {
            console.error("Error loading products:", error);
            document.getElementById("loading").innerText = "Failed to load products.";
        });

    // Load Products (with fade-in animation)
    function loadProducts(products) {
        const productContainer = document.getElementById("product-list");
        productContainer.innerHTML = "";

        if (!Array.isArray(products) || products.length === 0) {
            productContainer.innerHTML = `<p class="error-message">No products found.</p>`;
            return;
        }

        products.forEach((product, index) => {
            const card = document.createElement("div");
            card.className = "product-card fade-in";
            card.style.animationDelay = `${index * 0.1}s`; // delay animation for staggered effect

            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p><strong>Price:</strong> ${product.price}</p>
                <p class="rating">⭐ ${product.rating}</p>
                <a href="${product.link}" target="_blank" class="buy-btn">Buy Now</a>
            `;

            productContainer.appendChild(card);
        });
    }

    // Filter by category
    document.getElementById("categoryFilter").addEventListener("change", function () {
        const selectedCategory = this.value;
        const filtered = selectedCategory === "all"
            ? allProducts
            : allProducts.filter(p => p.category === selectedCategory);
        loadProducts(filtered);
    });
});
