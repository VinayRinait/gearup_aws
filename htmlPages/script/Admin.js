const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const productName = document.querySelector('input[name="productName"]').value;
  const category = document.querySelector('select[name="category"]').value;
  const quantity = document.querySelector('input[name="quantity"]').value;
  const price = document.querySelector('input[name="price"]').value;
  const description = document.querySelector('input[name="description"]').value;
  const status = document.querySelector('select[name="status"]').value;
  const attach = document.querySelector('input[name="attach"]').files[0];

  const formData = new FormData();
  formData.append("productName", productName);
  formData.append("category", category);
  formData.append("quantity", quantity);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("status", status);
  formData.append("attach", attach);

  fetch("https://www.bloomb.in/products/addProduct", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      form.reset();
    })
    .catch((error) => console.error(error));
});
