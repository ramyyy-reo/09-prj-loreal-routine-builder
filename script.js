/* Get references to DOM elements */
const categoryFilter = document.getElementById("categoryFilter");
const productsContainer = document.getElementById("productsContainer");
const chatForm = document.getElementById("chatForm");
const chatWindow = document.getElementById("chatWindow");
const selectedProducts = document.getElementById("selected-products");
const selectedProductsList = document.getElementById("selectedProductsList");

/* Show initial placeholder until user selects a category */
productsContainer.innerHTML = `
  <div class="placeholder-message">
    Select a category to view products
  </div>
`;

/* Load product data from JSON file */
async function loadProducts() {
  const response = await fetch("products.json");
  const data = await response.json();
  return data.products;
}

/* Create HTML for displaying product cards */
function displayProducts(products) {
  productsContainer.innerHTML = products
    .map(
      (product) => `
    <div class="product-card" data-product-name="${product.name}">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.brand}</p>
        <div id="product-desc">
          <button type="button">Add to cart</button>
          <p>${product.description}</p>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

/* Add or remove a product only when its button is clicked */
productsContainer.addEventListener("click", (e) => {
  const productButton = e.target.closest("#product-desc button");
  const productCard = productButton.closest(".product-card");
  
  if (!productCard.classList.contains("selected")) {
    productCard.classList.add("selected");
    productButton.textContent = "Remove from cart";
    selectedProductsList.appendChild(productCard.cloneNode(true));
  } else {
    productCard.classList.remove("selected");
    productButton.textContent = "Add to cart";
    for (const card of selectedProductsList.children) {
      if (card.dataset.productName === productCard.dataset.productName) {
        card.remove();
        break;
      }
    }
  }
});

selectedProductsList.addEventListener("click", (e) => {
  const removeButton = e.target.closest("#product-desc button");
  const selectedCard = removeButton.closest(".product-card.selected");
 
  selectedCard.remove();
  for (const card of productsContainer.children) {
    if (card.dataset.productName === selectedCard.dataset.productName) {
      card.classList.remove("selected");
      card.querySelector("#product-desc button").textContent = "Add to cart";
      break;
    }
  }
});

/* Filter and display products when category changes */
categoryFilter.addEventListener("change", async (e) => {
  const products = await loadProducts();
  const selectedCategory = e.target.value;

  /* filter() creates a new array containing only products 
     where the category matches what the user selected */
  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  displayProducts(filteredProducts);
});



/* Chat form submission handler - placeholder for OpenAI integration */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  chatWindow.innerHTML = "Connect to the OpenAI API for a response!";
});
