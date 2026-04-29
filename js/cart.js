console.log("cart page started");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const clearCartButton = document.querySelector("#clear-cart-button");

function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];

        cartItems.innerHTML += `
        <div class="cart-item card">
            <img src="${product.image.url}" alt="${product.image.alt}" class="cart-item-image">

            <div class="cart-item-details">
                <h3>${product.title}</h3>
                <p class="cart-item-price">$${product.price}</p>

                <div class="quantity-controls">
                    <button class="decrease-button" data-id="${product.id}">-</button>
                    <span class="quantity-value">${product.quantity}</span>
                    <button class="increase-button" data-id="${product.id}">+</button>
                </div>

                <button class="remove-button" data-id="${product.id}">Remove</button>
            </div>
        </div>
        `; 
    }
    addEventListeners();
}

function renderTotal() {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    cartTotal.textContent = `Total $${total.toFixed(2)}`;
}

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    renderTotal();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function increaseQuantity(productId) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity += 1;
        }
    }
    updateCart();
}

function decreaseQuantity(productId) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId && cart[i].quantity > 1) {
            cart[i].quantity -= 1;
        }
    }
    updateCart();
}

function addEventListeners() {
    const removeButtons = document.querySelectorAll(".remove-button");
    const increaseButtons = document.querySelectorAll(".increase-button");
    const decreaseButtons = document.querySelectorAll(".decrease-button");

    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", function () {
            const productId = this.dataset.id;
            removeFromCart(productId);
        });
    }

    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener("click", function () {
            const productId = this.dataset.id;
            increaseQuantity(productId);
        });
    }

    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener("click", function () {
            const productId = this.dataset.id;
            decreaseQuantity(productId);
        });
    }
}

clearCartButton.addEventListener("click", () => {
    cart = [];
    updateCart();  
}); 

renderCart();
renderTotal();