document.addEventListener("DOMContentLoaded", () => {
    console.log("Kicksify ready!");
});


const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartCount = document.querySelector(".cart-count");
    const checkoutBtn = document.getElementById("checkout-btn");
    
    // Termék hozzáadása a kosárhoz
    function addToCart(productName, productPrice) {
        const existingProduct = cart.find(item => item.name === productName);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    }

    // Kosár frissítése
    function updateCartUI() {
        cartItemsContainer.innerHTML = "";
        let totalItems = 0;
        
        cart.forEach((item, index) => {
            totalItems += item.quantity;
            const cartItem = document.createElement("div");
            cartItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            cartItem.innerHTML = `
                ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartCount.textContent = totalItems;
        attachRemoveEvent();
    }

    // Termék eltávolítása a kosárból
    function attachRemoveEvent() {
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartUI();
            });
        });
    }

    // Kosár kiürítése és vásárlás
    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        
        alert("Thank you for your purchase!");
        localStorage.removeItem("cart");
        cart.length = 0;
        updateCartUI();
    });

    // Termék gombok eseménykezelése
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            const productPrice = parseFloat(this.getAttribute("data-price"));
            addToCart(productName, productPrice);
        });
    });
    
    // Betöltéskor frissítjük a kosarat
    updateCartUI();


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

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const authModalEl = document.getElementById("authModal");
    const authModal = new bootstrap.Modal(authModalEl, {
        backdrop: false,
        keyboard: true
    });
    const authTitle = document.getElementById("authModalTitle");
    const authForm = document.getElementById("authForm");
    const authSection = document.getElementById("auth-section");
    const profileDropdown = document.getElementById("profile-dropdown");
    
    let isLoggedIn = false;
    let users = JSON.parse(localStorage.getItem("users")) || {};

    loginBtn.addEventListener("click", function () {
        authTitle.innerText = "Login";
        authModal.show();
    });

    registerBtn.addEventListener("click", function () {
        authTitle.innerText = "Register";
        authModal.show();
    });

    authForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        if (authTitle.innerText === "Register") {
            if (users[email]) {
                alert("This email is already registered!");
            } else {
                users[email] = password;
                localStorage.setItem("users", JSON.stringify(users));
                alert("Registration successful! Please log in.");
                authModal.hide();
            }
        } else if (authTitle.innerText === "Login") {
            if (users[email] && users[email] === password) {
                isLoggedIn = true;
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("loggedInUser", email);
                authModal.hide();
                updateAuthUI();
            } else {
                alert("Invalid email or password.");
            }
        }
    });

    logoutBtn.addEventListener("click", function () {
        isLoggedIn = false;
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInUser");
        updateAuthUI();
    });

    function updateAuthUI() {
        if (isLoggedIn) {
            authSection.classList.add("d-none");
            profileDropdown.classList.remove("d-none");
        } else {
            authSection.classList.remove("d-none");
            profileDropdown.classList.add("d-none");
        }
    }

    if (localStorage.getItem("isLoggedIn") === "true") {
        isLoggedIn = true;
    }
    updateAuthUI();
});
