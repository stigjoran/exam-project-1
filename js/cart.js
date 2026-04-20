console.log("cart page started");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const clearCartButton = document.querySelector("#clear-cart-button");

function renderCart() {
    cartItems.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];

        cartItems.innerHTML += `
        <div class="cart-item card">
            <img src="${product.image.url}" alt="${product.image.alt}" class="cart-item-image">

            <div class="cart-item-details">
                <h3>${product.title}</h3>
                <p class="cart-item-price">$${product.price}</p>
                <button class="remove-button" data-id="${product.id}">Remove</button>
                </div>
            </div>
        `; 
    }
}

function renderTotal() {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price;
    }
    cartTotal.textContent = `Total $${total.toFixed(2)}`;
}

renderCart(cart);
renderTotal();
function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

const removeButtons = document.querySelectorAll(".remove-button");

for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", function () {
        const productId = this.dataset.id;
        removeFromCart(productId);
    });
}

clearCartButton.addEventListener("click", () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
});
