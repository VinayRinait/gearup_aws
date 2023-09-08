fetch("https://www.bloomb.in/userCart/getUserCart")
  .then((response) => response.json())
  .then((data) => {
    // Process the data here
  })
  .catch((error) => console.error(error));
