console.log("product page started");

const API_URL = "https://v2.api.noroff.dev/online-shop";

const productImage = document.querySelector("#product-image");
const productTitle = document.querySelector("#product-title");
const productPrice = document.querySelector("#product-price");
const productDescription = document.querySelector("#product-description");
const productTags = document.querySelector("#product-tags");
const productRating = document.querySelector("#product-rating");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let currentProduct;

console.log(productId);

async function fetchProduct() {
    try {
        const response = await fetch(`${API_URL}/${productId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

async function init() {
    currentProduct= await fetchProduct();

    if (currentProduct) {
        productImage.src = currentProduct.image.url;
        productImage.alt = currentProduct.image.alt;
        productTitle.textContent = currentProduct.title;
        productPrice.textContent = `$${currentProduct.price}`;

        if (currentProduct.rating) {
        productRating.textContent = `Rating: ${currentProduct.rating} / 5`;
        } else {
            productRating.textContent = "No rating";
        } 
        
        productDescription.textContent = currentProduct.description;
        productTags.innerHTML = currentProduct.tags.map(tag => `<span class="tag">${tag}</span>`).join("");
    }
}

document.querySelector(".add-to-cart-button").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(currentProduct);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Added to cart:", currentProduct);
});

init();