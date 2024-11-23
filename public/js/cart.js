document.getElementById('checkout-btn').addEventListener('click', function(event) {
    // Prevent form submission for now
    event.preventDefault();

    const clientName = document.getElementById('name').value;
    const clientEmail = document.getElementById('email').value;
    const clientAddress = document.getElementById('address').value;

    const totalItems = parseInt(document.getElementById('total-items').textContent);
    const totalPrice = document.getElementById('total-price').textContent;
    document.getElementById('itemCountToSend').value = totalItems;
    document.getElementById('itemPriceToSend').value = totalPrice;

    if (totalItems === 0) {
      alert("Your cart is empty. Please add items to your cart before proceeding.");
      return;
    }

    if (!clientName || !clientEmail || !clientAddress) {
      alert("Please fill in all the details before proceeding.");
      return; 
    }

    // Now submit the form
    document.getElementById('checkoutForm').submit();
});

// Function to load and display cart from localStorage
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsList = document.getElementById('cart-items-list');
  const totalItemsElem = document.getElementById('total-items');
  const totalPriceElem = document.getElementById('total-price');
  
  // Clear the previous items
  cartItemsList.innerHTML = '';

  // Render each item in the cart
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;

    const cartItemHtml = `
        <div class="cart-item mb-4 col-md-6 col-xl-4" id="cart-item-${index}">
            <div class="">
                <div class="card">
                  <img class="card-img-top" src="${item.image}" alt="${item.name}">
                  <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">₹${item.price} per item</p>
                    <p class="card-text">₹${item.price * item.quantity} in total</p>

                    <div class="container">
                      <div class="row">
                        <div class="col-6">
                          <div class="d-flex justify-content-center">
                            <button class="btn btn-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                            <input type="number" class="form-control w-25 mx-2 text-center" value="${item.quantity}" min="1" id="quantity-${index}" onchange="updateQuantityFromInput(${index})">
                            <button class="btn btn-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                          </div>
                        </div>
                        <div class="col-6 text-center">
                            <button class="btn btn-danger w-100" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i> Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    `;
    
    cartItemsList.innerHTML += cartItemHtml;
  });

  // Update the summary
  totalItemsElem.textContent = totalItems;
  totalPriceElem.textContent = totalPrice.toFixed(2);
}

// Function to update the quantity
function updateQuantity(index, change) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart[index];
  item.quantity = Math.max(1, item.quantity + change);  // Prevent quantity from going below 1
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

// Function to update quantity from the input field
function updateQuantityFromInput(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const input = document.getElementById(`quantity-${index}`);
  const quantity = parseInt(input.value, 10);
  if (!isNaN(quantity) && quantity > 0) {
    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
}

// Function to remove an item from the cart
function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

// Load the cart when the page loads
window.onload = loadCart;