document.addEventListener("DOMContentLoaded", function () {
    let allProducts = [];

    // Fetch Data from JSONBin.io (external URL)
    fetch("https://api.jsonbin.io/v3/b/67df0a0b8561e97a50f0ebe5") // Replace with your bin's raw URL
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data);  // Log the fetched data to the console

            // Directly use the fetched data (assuming it's an array)
            allProducts = data;  // If the data is already an array
            loadProducts(allProducts);
            document.getElementById("loading").style.display = "none"; // Hide loading
        })
        .catch(error => console.error("Error loading products:", error));

    // Load Products into Page
    function loadProducts(products) {
        const productContainer = document.getElementById("product-list");
        productContainer.innerHTML = "";

        // Check if products is an array and then iterate through it
        if (Array.isArray(products)) {
            products.forEach(product => {
                let productHTML = `
                    <div class="product-card">
                        <img src="${product.img}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p class="rating">⭐ ${product.rating}</p>
                        <a href="${product.link}" target="_blank" class="buy-btn">Buy Now</a>
                    </div>
                `;
                productContainer.innerHTML += productHTML;
            });
        } else {
            console.error("Fetched data is not an array:", products);
        }
    }

    // Category Filter
    document.getElementById("categoryFilter").addEventListener("change", function () {
        let selectedCategory = this.value;
        let filteredProducts = selectedCategory === "all" ? allProducts : allProducts.filter(p => p.category === selectedCategory);
        loadProducts(filteredProducts);
    });
});
