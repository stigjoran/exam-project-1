console.log("register page started");

const form = document.querySelector("#register-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

const name = nameInput.value;
const email = emailInput.value;
const password = passwordInput.value;

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
console.log(data);
console.log(data.errors);
console.log(data.error?.[0]?.message);


console.log(name);
console.log(email);
console.log(password);
});