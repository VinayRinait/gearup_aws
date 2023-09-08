import Footer from "../components/Footer.js";
import Header from "../components/Header.js";

document.getElementById("footer").innerHTML = Footer();

document.getElementById("header").innerHTML = Header();

// Get the login form element
const loginForm = document.getElementById("loginForm");

// Add event listener for form submission
loginForm.addEventListener("submit", (e) => {
  // Prevent default form submission
  e.preventDefault();

  // Get the input values
  const mobileNo = document.getElementsByName("mobileNo")[0].value;
  const password = document.getElementsByName("password")[0].value;

  // Validate the inputs
  if (!mobileNo || !password) {
    alert("Please enter your mobile number and password");
    return;
  }

  // Perform an AJAX request to the login API endpoint
  fetch("https://www.bloomb.in/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobileNo,
      password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to log in");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);

      console.log(data.data.token);
      // Check if the response data contains a message
      if (data.message) {
        localStorage.setItem("token", data.token);

        alert(data.message);
      } else {
        // Save the token to local storage
      }
    })
    .catch((error) => {
      // Handle login error
      alert(error.message);
    });
});
