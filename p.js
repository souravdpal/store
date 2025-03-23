document.addEventListener("DOMContentLoaded", async function () {
    let allProducts = [];
    const productContainer = document.getElementById("product-list");
    const loadingElement = document.getElementById("loading");
    const categoryFilter = document.getElementById("categoryFilter");
    const searchInput = document.getElementById("searchInput");

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
                <img src="${product.img}" alt="${product.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/150';" onclick="openModal('${product.img}')">
                <h3>${product.name}</h3>
                <p><strong>Price:</strong> ${product.price}</p>
                <p class="rating">⭐ ${product.rating}</p>
                <a href="${product.link}" target="_blank" class="buy-btn" aria-label="Buy ${product.name} for ${product.price}">Buy Now</a>
            `;

            productContainer.appendChild(card);
        });
    }

    // Apply Filters (Category and Search)
    function applyFilters() {
        // Start with all products
        let filteredProducts = allProducts;

        // Apply category filter
        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== "all") {
            filteredProducts = filteredProducts.filter(product => 
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Apply search filter
        const searchQuery = searchInput.value.trim().toLowerCase();
        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchQuery)
            );
        }

        // Load the filtered products
        loadProducts(filteredProducts);
    }

    // Filter by category
    categoryFilter.addEventListener("change", applyFilters);

    // Filter by search input
    searchInput.addEventListener("input", applyFilters);

    // Fetch products on page load
    fetchProducts();
});

// Open the modal and set the image source
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modal.style.display = 'flex';
    modalImage.src = imageSrc;
    modal.focus(); // For accessibility, focus on the modal
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Close the modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Close the modal with the Escape key for accessibility
document.getElementById('imageModal').addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
