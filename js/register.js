

const form = document.querySelector("#register-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const registerMessage = document.querySelector("#register-message");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

const name = nameInput.value;
const email = emailInput.value;
const password = passwordInput.value;

registerMessage.textContent = "Creating account...";

if (!email.endsWith("@stud.noroff.no")) {
    registerMessage.textContent = "Email must be stud.noroff.no adress";
    return;
}

try {
const response = await fetch("https://v2.api.noroff.dev/auth/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
        name: name,
        email: email,
        password: password
    })
});

const data = await response.json();

if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || "Register failed");
    }

    registerMessage.textContent = "Account created! Redirecting to login...";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);

} catch (error) {
    registerMessage.textContent = error.message;
}
});