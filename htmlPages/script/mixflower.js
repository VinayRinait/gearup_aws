import Footer from "../components/Footer.js";
import Header from "../components/Header.js";

document.getElementById("footer").innerHTML = Footer();

document.getElementById("header").innerHTML = Header();

function addToCartHandler(event) {
  event.preventDefault();
  const productId = event.target.getAttribute("data-product-id");
  fetch("https://www.bloomb.in/userCart/addToCart", {
    method: "POST",
    body: JSON.stringify({ productId }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Product added to cart successfully!");
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to add product to cart.");
    });
}

function createProductCard(product) {
  const {
    _id,
    productName,
    productDescription,
    productQuantity,
    productImage,
    status,
    price,
  } = product;
  const image = productImage[0]?.path;
  const name = productName;
  const quantity = productQuantity;
  const statuss = status;
  const pricee = price;
  const desc = productDescription;

  const card = document.createElement("div");
  card.classList.add("col-lg-4", "col-md-6", "col-sm-12");

  const innerHtml = `
    <div class="single-product-item text-center">
      <div class="product-image">
        <a href="p6_singleProduct.jsp">
          <img src="${image}" alt="${name} image" />
        </a>
      </div>
      <h3>${name}</h3>
      <p class="product-price">
        <span>Per Kg</span> ${pricee} Rs
      </p>
      <p class="product-status">
        <span>Status</span> ${statuss} 
      </p>
      <p class="product-quantity">
        <span>Quantity</span> ${quantity} Rs
      </p>
      <p class="product-description">
        <span>Description:-</span> ${desc} 
      </p>
      <a href="#" class="cart-btn" data-product-id="${_id}">
        <i class="fas fa-shopping-cart"></i> Add to Cart
      </a>
    </div>
  `;
  card.innerHTML = innerHtml;

  const addToCartBtn = card.querySelector(".cart-btn");
  addToCartBtn.addEventListener("click", addToCartHandler);

  return card;
}

function renderProductList(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center">
        <h4>No data found.</h4>
      </div>
    `;
  } else {
    const fragment = document.createDocumentFragment();
    products.forEach((product) => {
      const card = createProductCard(product);
      fragment.appendChild(card);
    });
    container.appendChild(fragment);
  }
}

function filterMixCategories(products) {
  return products.filter((product) => product.productName.includes("Mix"));
}

function fetchData() {
  fetch("https://www.bloomb.in/products/getProduct", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const filteredData = filterMixCategories(data.data);
      renderProductList(filteredData);
    })
    .catch((error) => {
      console.log(error);
      const container = document.getElementById("product-list");
      container.innerHTML = `
        <div class="col-12 text-center">
          <h4>Error fetching data.</h4>
        </div>
      `;
    });
}

const productContainer = document.getElementById("product-list");
productContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("cart-btn")) {
    addToCartHandler(event);
  }
});

fetchData();
