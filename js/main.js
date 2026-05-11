

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

            

            return data.data;

    } catch (error) {
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
        carouselItem.innerHTML = "<p>Loading...</p>";
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

if (nextButton) {
nextButton.addEventListener("click", function () {
    currentIndex++;

    if (currentIndex >= carouselProducts.length) {
        currentIndex = 0;
    }
    renderCarousel();
});

}
if (prevButton) {
prevButton.addEventListener("click", function () {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = carouselProducts.length - 1;
    }
    renderCarousel();
});

}


/* Init is supposed to initialize the application */
    async function init() {
        const products = await fetchProducts();

        if (products.length === 0) {
            productList.innerHTML = "<p>Could not load products.</p>";
            carouselItem.innerHTML = "<p>Could not load featured products.</p>";
            return;
        }

        

        carouselProducts = products.slice(0, 3);
        renderCarousel();

        renderProducts(products.slice(0, 12));
    }

    const userInfo = document.querySelector("#user-info");
    const username = localStorage.getItem("username");

    if (userInfo && username) {
        userInfo.textContent = `Logged in as ${username} `;

        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Logout";

        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userEmail");
            location.reload();
        });
        userInfo.appendChild(logoutButton);
    }

        init(); 

