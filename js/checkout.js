const cart = JSON.parse(localStorage.getItem("cart")) || [];
const checkoutForm = document.querySelector("#checkout-form"); 
const checkoutTotal = document.querySelector("#checkout-total");
const checkoutItems = document.querySelector("#checkout-items");
const checkoutError = document.querySelector("#checkout-error");


function renderCheckoutTotal() {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total+= cart[i].price * cart[i].quantity;
    }

    checkoutTotal.textContent = `$${total.toFixed(2)}`;

}

function renderCheckout(products) {
    checkoutItems.innerHTML = "";

    if (products.length === 0) {
        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
        checkoutTotal.textContent = "$0.00";
        return;
    }

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        checkoutItems.innerHTML += `
        <div class="summary-row">
            <span>${product.title} x ${product.quantity}</span>
            <span>$${(product.price * product.quantity).toFixed(2)}</span>
        </div>
        `;
    }
}

if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (cart.length === 0) {
            checkoutError.textContent = "Your cart is empty.";
            return;
        }

        localStorage.setItem("cart", JSON.stringify([]));
        window.location.href = "../success/index.html";
    });
}

    renderCheckout(cart);
    renderCheckoutTotal();
