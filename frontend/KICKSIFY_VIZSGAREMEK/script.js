document.addEventListener("DOMContentLoaded", () => {
    console.log("Kicksify ready!");
});


const cart = [];

// Termékek megjelenítése
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        productList.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Kosárba helyezés
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        displayCart();
    }
}

// Kosár megjelenítése
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                ${item.name} - $${item.price.toFixed(2)}
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
}

// Eltávolítás a kosárból
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Kezdő funkciók betöltése
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});

// Checkout gomb esemény
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart.length = 0; // Kosár kiürítése
    displayCart();
});



//SLIDESHOW

let slideIndex = 0;
showSlides(slideIndex);

// Következő/előző slide váltás
function changeSlide(n) {
  showSlides(slideIndex += n);
}

// Aktív slide megjelenítése
function showSlides(n) {
  let slides = document.getElementsByClassName("slide");

  // Körkörös megjelenítés
  if (n >= slides.length) { slideIndex = 0; }
  if (n < 0) { slideIndex = slides.length - 1; }

  // Alapértelmezett elrejtés
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Aktuális slide megjelenítése
  slides[slideIndex].style.display = "block";
}

// Automatikus diaváltás (opcionális)
setInterval(() => {
  changeSlide(1);
}, 900); // 2 másodpercenként vált


// Kosár hozzáadása (például egy gombnyomásra)
function addToCart(productName) {
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
  
    // Hozzáadjuk a terméket a kosárhoz
    const productElement = document.createElement('p');
    productElement.textContent = productName;
    cartItems.appendChild(productElement);
  
    // Frissítjük a kosár számot
    let itemCount = parseInt(cartCount.textContent);
    cartCount.textContent = itemCount + 1;
}

// Hozzáadunk eseménykezelőt az összes termékhez tartozó "Add to Cart" gombhoz
document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', function() {
        // Kivesszük a termék nevét a kártyából
        const productName = button.closest('.card').querySelector('.card-title').textContent;
        // Kosárhoz adás
        addToCart(productName);
    });
});


