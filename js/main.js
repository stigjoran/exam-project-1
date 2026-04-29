console.log("App started");

const API_URL = "https://v2.api.noroff.dev/online-shop";

const productList = document.querySelector("#product-list");
const carouselItem = document.querySelector("#carousel-item");
const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");

let currentIndex = 0;
let carouselProducts = [];

/* Fetch is supposed to retrieve products from the API */
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
            }

            const data = await response.json();

            console.log(data);

            return data.data;

    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

/* Render is supposed to display the products */

function renderProducts(products) {
    productList.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        productList.innerHTML += `
        <a class="product-card" href="product/index.html?id=${product.id}">
            <img src="${product.image.url}" alt="${product.image.alt}">
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
            </a>
        `;
    }
}

function renderCarousel() {
    if (carouselProducts.length === 0) {
        carouselItem.innerHTML = "<p>Loading...</p>"
        return;
    }

    const product = carouselProducts[currentIndex];

    carouselItem.innerHTML = `
    <img src="${product.image.url}" alt="${product.image.alt}">
    <h2>${product.title}</h2>
    <p>$${product.price}</p>
    <a href="product/index.html?id=${product.id}" class="button--primary">View Product</a>
    `;
}

nextButton.addEventListener("click", function () {
    currentIndex++;

    if (currentIndex >= carouselProducts.length) {
        currentIndex = 0;
    }
    renderCarousel();
});

prevButton.addEventListener("click", function () {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = carouselProducts.length - 1;
    }
    renderCarousel();
});



/* Init is supposed to initialize the application */
    async function init() {
        const products = await fetchProducts();

        console.log(products);

        carouselProducts = products.slice(0, 3);
        renderCarousel();

        renderProducts(products.slice(0, 12));
    }

        init(); 

