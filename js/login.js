

const form = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginMessage = document.querySelector("#login-message");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

const email = emailInput.value.trim();
const password = passwordInput.value.trim();

loginMessage.textContent ="Logging in...";

try {
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

if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || "Login failed" );
}

localStorage.setItem("token", data.data.accessToken);
localStorage.setItem("username", data.data.name);
localStorage.setItem("userEmail", data.data.email);

loginMessage.textContent = "Login successful!";
window.location.href = "../index.html";

} catch (error) {
    loginMessage.textContent = error.message;
}

});