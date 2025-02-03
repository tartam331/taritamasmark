async function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
        return;
    }

    let response = await fetch(`http://localhost:5000/products/${productId}`);
    let product = await response.json();

    if (product.error) {
        document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
    } else {
        document.getElementById("product-name").innerText = product.name;
        document.getElementById("product-description").innerText = product.description;
        document.getElementById("product-price").innerText = "$" + product.price;
        document.getElementById("product-image").src = product.image_url;
    }
}

function addToCart() {
    alert("Added to cart!");
}

window.onload = loadProduct;