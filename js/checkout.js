console.log("Checkout page started");

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const checkoutTotal = document.querySelector("#checkout-total");
const checkoutItems = document.querySelector("#checkout-items");
const completePurchaseButton = document.querySelector(".checkout-complete-button");

console.log(cart);

function renderCheckoutTotal() {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total+= cart[i].price;
    }

    checkoutTotal.textContent = `$${total.toFixed(2)}`;

}

function renderCheckout(products) {
    checkoutItems.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        checkoutItems.innerHTML += `
        <div class="summary-row">
            <span>${product.title}</span>
            <span>$${product.price}</span>
        </div>
        `;
    }
}

completePurchaseButton.addEventListener("click", () => {
    localStorage.removeItem("cart");
});

    renderCheckout(cart);
    renderCheckoutTotal();
