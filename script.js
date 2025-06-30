const products = [
  { name: "T-Shirt", price: 10.99, category: "Clothing", image: "images/tshirt.png" },
  { name: "Jeans", price: 24.99, category: "Clothing", image: "images/jeans.png" },
  { name: "Sneakers", price: 39.99, category: "Footwear", image: "images/sneakers.png" },
  { name: "Boots", price: 59.99, category: "Footwear", image: "images/boots.png" },
  { name: "Cap", price: 7.49, category: "Accessories", image: "images/cap.png" },
  { name: "Watch", price: 29.99, category: "Accessories", image: "images/watch.png" },
  { name: "Laptop", price: 499.99, category: "Electronics", image: "images/laptop.png" },
  { name: "Smartphone", price: 399.99, category: "Electronics", image: "images/smartphone.png" },
  { name: "Headphones", price: 59.99, category: "Electronics", image: "images/headphones.png" },
  { name: "Cushions", price: 15.00, category: "Home Decor", image: "images/cushions.png" },
  { name: "Lamp", price: 25.00, category: "Home Decor", image: "images/lamp.png" },
  { name: "Wall Clock", price: 18.00, category: "Home Decor", image: "images/clock.png" },
  { name: "Lipstick", price: 9.99, category: "Beauty Products", image: "images/lipstick.png" },
  { name: "Moisturizer", price: 12.99, category: "Beauty Products", image: "images/moisturizer.png" },
  { name: "Face Wash", price: 8.49, category: "Beauty Products", image: "images/facewash.png" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(filter = "All") {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products
    .filter(p => filter === "All" || p.category === filter)
    .forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price.toFixed(2)}</p>
        <button onclick="addToCart('${product.name}')">Add to Cart</button>
      `;
      productList.appendChild(div);
    });
}

function addToCart(name) {
  const product = products.find(p => p.name === name);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartSummary();
}

function updateCartSummary() {
  document.getElementById("cart-count").textContent = cart.length;
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  document.getElementById("total-price").textContent = total.toFixed(2);
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartSummary();
}

function checkout() {
  if (cart.length === 0) return alert("Your cart is empty!");
  alert("Order placed successfully!");
  clearCart();
}

document.getElementById("categoryFilter").addEventListener("change", (e) => {
  renderProducts(e.target.value);
});

window.onload = () => {
  renderProducts();
  updateCartSummary();
};
