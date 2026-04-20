console.log("App started");

const API_URL = "https://v2.api.noroff.dev/online-shop";

const productList = document.querySelector("#product-list");

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




/* Init is supposed to initialize the application */
    async function init() {
        const products = await fetchProducts();

        console.log(products);
        renderProducts(products);
    }

        init(); 

