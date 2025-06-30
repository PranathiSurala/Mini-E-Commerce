const products = [
  // Clothing
  { id: 1, name: "T-Shirt", price: 10.99, category: "clothing", image: "images/tshirt.png" },
  { id: 4, name: "Jeans", price: 24.99, category: "clothing", image: "images/jeans.png" },

  // Footwear
  { id: 2, name: "Sneakers", price: 39.99, category: "footwear", image: "images/sneakers.png" },
  { id: 6, name: "Boots", price: 59.99, category: "footwear", image: "images/boots.png" },

  // Accessories
  { id: 3, name: "Cap", price: 7.49, category: "accessories", image: "images/cap.png" },
  { id: 5, name: "Watch", price: 49.99, category: "accessories", image: "images/watch.png" },

  // Electronics
  { id: 7, name: "Smartphone", price: 299.99, category: "electronics", image: "images/phone.png" },
  { id: 8, name: "Headphones", price: 89.99, category: "electronics", image: "images/headphones.png" },
  { id: 9, name: "Laptop", price: 899.99, category: "electronics", image: "images/laptop.png" },

  // Home
  { id: 10, name: "Cushion", price: 14.99, category: "home", image: "images/cushion.png" },
  { id: 11, name: "Wall Clock", price: 19.99, category: "home", image: "images/wall clock.png" },
  { id: 12, name: "Lamp", price: 34.99, category: "home", image: "images/lamp.png" },

  // Beauty
  { id: 13, name: "Lipstick", price: 9.99, category: "beauty", image: "images/lipstick.png" },
  { id: 14, name: "Face Wash", price: 5.99, category: "beauty", image: "images/facewash.png" },
  { id: 15, name: "Moisturizer", price: 12.99, category: "beauty", image: "images/moist.png" }
];

// Initialize cart safely
let cart;
try {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!Array.isArray(cart)) cart = [];
} catch (e) {
  cart = [];
}

// Initialize category
let currentCategory = localStorage.getItem("selectedCategory") || "all";

function renderProducts(filtered = products) {
  const productContainer = document.getElementById("products");
  productContainer.innerHTML = "";
  filtered.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(div);
  });
}

function filterProducts() {
  const category = document.getElementById("category").value;
  localStorage.setItem("selectedCategory", category);
  if (category === "all") {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

function renderCart() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";
  let totalPrice = 0;
  let totalItems = 0;

  // Filter invalid entries
  cart = cart.filter(item => item && item.id && !isNaN(item.price) && item.quantity > 0);

  cart.forEach((item, index) => {
    const quantity = parseInt(item.quantity);
    const price = parseFloat(item.price);

    if (!isNaN(quantity) && !isNaN(price)) {
      totalItems += quantity;
      totalPrice += price * quantity;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <h4>${item.name}</h4>
        <p>Price: $${price.toFixed(2)}</p>
        <p>
          Quantity: 
          <button onclick="decreaseQuantity(${index})">-</button>
          ${quantity}
          <button onclick="increaseQuantity(${index})">+</button>
        </p>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartContainer.appendChild(div);
    }
  });

  document.getElementById("total-items").innerText = isNaN(totalItems) ? 0 : totalItems;
  document.getElementById("total-price").innerText = isNaN(totalPrice) ? "0.00" : totalPrice.toFixed(2);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  renderCart();
}

function decreaseQuantity(index) {
  cart[index].quantity -= 1;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function checkout() {
  alert("Your order has been placed successfully!");
  clearCart();
}

// On load
document.getElementById("category").value = currentCategory;
filterProducts();
renderCart();
