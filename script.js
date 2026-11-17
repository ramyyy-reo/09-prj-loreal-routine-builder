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
      </div>
    </div>
  `
    )
    .join("");
}

/* Toggle the selected style when a product card is clicked, add it to list */
/* Also removes it from list when selected again */
productsContainer.addEventListener("click", (e) => {
  const productCard = e.target.closest(".product-card");
  if (productCard) {
    if (!productCard.classList.contains("selected")) {
      productCard.classList.toggle("selected");
      selectedProductsList.appendChild(productCard.cloneNode(true));
    } else {
      productCard.classList.remove("selected");
      for (const card of selectedProductsList.children) {
        if (card.dataset.productName === productCard.dataset.productName) {
          card.remove();
          break;
        }
      }
    }
  }
});

selectedProductsList.addEventListener("click", (e) => {
  const selectedCard = e.target.closest(".product-card.selected");
  if (selectedCard) {
    selectedCard.remove();
    for (const card of productsContainer.children) {
      if (card.dataset.productName === selectedCard.dataset.productName) {
        card.classList.remove("selected");
        break;
      }
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
