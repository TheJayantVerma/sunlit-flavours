// Drag to Scroll functionality
const mainCourseContainer = document.getElementById('mainCourseContainer');
let isMouseDown = false;
let startX;
let scrollLeft;

mainCourseContainer.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - mainCourseContainer.offsetLeft;
    scrollLeft = mainCourseContainer.scrollLeft;
    mainCourseContainer.style.cursor = 'grabbing';
});

mainCourseContainer.addEventListener('mouseleave', () => {
    isMouseDown = false;
    mainCourseContainer.style.cursor = 'grab';
});

mainCourseContainer.addEventListener('mouseup', () => {
    isMouseDown = false;
    mainCourseContainer.style.cursor = 'grab';
});

mainCourseContainer.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - mainCourseContainer.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    mainCourseContainer.scrollLeft = scrollLeft - walk;
});

// Arrow buttons functionality
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

btnPrev.addEventListener('click', () => {
    mainCourseContainer.scrollBy({ left: -mainCourseContainer.offsetWidth, behavior: 'smooth' });
});

btnNext.addEventListener('click', () => {
    mainCourseContainer.scrollBy({ left: mainCourseContainer.offsetWidth, behavior: 'smooth' });
});



// Function to get the current cart from localStorage
function getCart() {
    // If the cart doesn't exist in localStorage, return an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
  }
  
  // Function to save the cart to localStorage
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Event listener for the "Add to Cart" button
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      // Get the data attributes from the button
      const itemId = this.getAttribute('data-id');
      const itemName = this.getAttribute('data-name');
      const itemPrice = parseFloat(this.getAttribute('data-price'));
      const itemImage = this.getAttribute('data-image');
  
      // Get the current cart
      let cart = getCart();
  
      // Check if the item is already in the cart
      const existingItemIndex = cart.findIndex(item => item.id === itemId);
  
      if (existingItemIndex !== -1) {
        // If the item is already in the cart, increase the quantity
        cart[existingItemIndex].quantity += 1;
      } else {
        // If the item is not in the cart, add a new item
        const newItem = {
          id: itemId,
          name: itemName,
          price: itemPrice,
          image: itemImage,
          quantity: 1
        };
        cart.push(newItem);
      }
  
      // Save the updated cart to localStorage
      saveCart(cart);
  
      // Alert the user or update the UI
      alert(`${itemName} has been added to your cart.`);
    });
  });
  