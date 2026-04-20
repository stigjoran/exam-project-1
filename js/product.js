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
    const product = await fetchProduct();

    if (product) {
        productImage.src = product.image.url;
        productImage.alt = product.image.alt;
        productTitle.textContent = product.title;
        productPrice.textContent = `$${product.price}`;

        if (product.rating) {
        productRating.textContent = `Rating: ${product.rating} / 5`;
        } else {
            productRating.textContent = "No rating";
        } 
        
        productDescription.textContent = product.description;
        productTags.innerHTML = product.tags.map(tag => `<span class="tag">${tag}</span>`).join("");
    }
}

init();