console.log("login page started");

const form = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

const email = emailInput.value;
const password = passwordInput.value;

const response = await fetch("https://v2.api.noroff.dev/auth/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
});
const data = await response.json();

localStorage.setItem("token", data.data.accessToken);
localStorage.setItem("username", data.data.name);

console.log(data);

window.location.href = "../index.html";
});
