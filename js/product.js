const API_URL = "https://v2.api.noroff.dev/online-shop";

const productImage = document.querySelector("#product-image");
const productTitle = document.querySelector("#product-title");
const productPrice = document.querySelector("#product-price");
const productDescription = document.querySelector("#product-description");
const productTags = document.querySelector("#product-tags");
const productRating = document.querySelector("#product-rating");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
      if (!productId) {
        productTitle.textContent = "No product ID found.!";
      }
const productDiscountedPrice = document.querySelector("#product-discounted-price");
const productReviews = document.querySelector("#product-reviews");
const shareButton = document.querySelector("#share-button");
const addToCartButton = document.querySelector(".add-to-cart-button");
const token = localStorage.getItem("token");

let currentProduct;


async function fetchProduct() {
    try {
        const response = await fetch(`${API_URL}/${productId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        return null;
    }
}

async function init() {
    currentProduct= await fetchProduct();

    if (!currentProduct) {
        productTitle.textContent = "Could not load product.";
        return;
    }

    if (currentProduct) {
        productImage.src = currentProduct.image.url;
        productImage.alt = currentProduct.image.alt;
        productTitle.textContent = currentProduct.title;
        productPrice.textContent = `Price: $${currentProduct.price}`;

        if (!token) {
            addToCartButton.textContent = "Login to add to cart";
        }


        if (currentProduct.discountedPrice < currentProduct.price) {
            productDiscountedPrice.textContent = `Discounted price: $${currentProduct.discountedPrice}`;}
            else {
                productDiscountedPrice.textContent = "";
            }

        if (currentProduct.rating) {
        productRating.textContent = `Rating: ${currentProduct.rating} / 5`;
        } else {
            productRating.textContent = "No rating";
        }

        productDescription.textContent = currentProduct.description;
        productTags.innerHTML = currentProduct.tags.map(tag => `<span class="tag">${tag}</span>`).join(""); 

        if (currentProduct.reviews.length === 0) {
            productReviews.innerHTML = "<p>No reviews yet.</p>";
        } else {
            productReviews.innerHTML = "";

            for (let i = 0; i < currentProduct.reviews.length; i++) {
                const review = currentProduct.reviews[i];

                productReviews.innerHTML +=`
                <article class="review-card card">
                <h4>${review.username}</h4>
                <p>Rating: ${review.rating} / 5</p>
                <p>${review.description}</p>
                </article>
                `;
            }
        }
    }
}



addToCartButton.addEventListener("click", () => {


    if (!token) {
        window.location.href = "../account/login.html";
        return;
    }

    let cart  = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(product => product.id === currentProduct.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const productToAdd = {
            ...currentProduct,
            quantity: 1
        };
        cart.push(productToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    addToCartButton.textContent = "Added to cart."
});

shareButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Product link copied!");
    } catch (error) {
        console.error("Failed to copy product link:", error);
    }
});

init();