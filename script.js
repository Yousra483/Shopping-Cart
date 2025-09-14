


let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// 🟢 Add to cart
addToCartButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const productElement = button.parentElement;
    const productName = productElement.querySelector("h3").textContent;
    const productPrice = parseFloat(productElement.querySelector("p").textContent.replace("$", ""));

    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
      existingItem.qty++;
    } else {
      cart.push({ name: productName, price: productPrice, qty: 1 });
    }

    updateCart();
  });
});

// 🟡 Update Cart
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>
        <button onclick="changeQty(${index}, -1)">-</button>
        ${item.qty}
        <button onclick="changeQty(${index}, 1)">+</button>
      </td>
      <td>$${item.price * item.qty}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    `;
    cartItemsContainer.appendChild(row);
    total += item.price * item.qty;
  });

  cartTotal.textContent = `Total: $${total}`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 🔴 Change Qty
function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCart();
}

// 🔴 Remove Item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// 🟣 Checkout
document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Order placed successfully!");
  cart = [];
  updateCart();
  localStorage.removeItem("cart");
});

updateCart();