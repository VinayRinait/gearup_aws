import Footer from "../components/Footer.js";
import Header from "../components/Header.js";

document.getElementById("footer").innerHTML = Footer();

document.getElementById("header").innerHTML = Header();

const form = document.querySelector("form");

// Add an event listener for the form submission
form.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the input field values
  const fullName = document.querySelector("#fullName").value;
  const mobile = document.querySelector("#mobile").value;
  const city = document.querySelector("#city").value;
  const email = document.querySelector("#email").value;
  const address = document.querySelector("#address").value;
  const password = document.querySelector("#password").value;

  // Create an object with the form data
  const formData = {
    fullName,
    mobile,
    city,
    email,
    address,
    password,
  };

  // Send a POST request to the server
  fetch("https://www.bloomb.in/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Registration successful!");
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error(error));
});
