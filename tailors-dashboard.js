// tailors-dashboard.js
document.addEventListener("DOMContentLoaded", () => {
    fetchClothItems();
});

function fetchClothItems() {
    fetch("http://localhost:5001/api/retailer-dashboard/list")
        .then(response => response.json())
        .then(data => displayClothItems(data))
        .catch(error => console.error("Error fetching cloth items:", error));
}

function displayClothItems(clothItems) {
    const homeContent = document.getElementById("homeContent");
    homeContent.innerHTML = ""; // Clear existing content

    clothItems.forEach(item => {
        const clothItemDiv = document.createElement("div");
        clothItemDiv.classList.add("cloth-item");

        clothItemDiv.innerHTML = `
            <h3>${item.type}</h3>
            <p>Quantity: ${item.quantity} kg</p>
            <p>Price: ₹${item.price}/kg</p>
            <button onclick="addToCart('${item.type}', ${item.quantity}, ${item.price})">Add to Cart</button>
        `;
        homeContent.appendChild(clothItemDiv);
    });
}

// Array to store cart items
let cart = [];

// Function to handle adding to the cart
function addToCart(type, quantity, price) {
    const clothItem = {
        name: type,
        quantity: quantity,
        price: price
    };

    // Add item to cart
    cart.push(clothItem);

    // Display message
    alert(`${clothItem.name} added to your cart!`);

    // Optionally, update the cart count or show the cart contents
    updateCart();
}

// Function to update the cart display (if necessary)
function updateCart() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = ''; // Clear the current list

    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - ₹${item.price} (Quantity: ${item.quantity} kg)`;
        cartList.appendChild(listItem);
    });

    // Update the cart visibility if needed
    document.getElementById("cartContent").style.display = 'block';
}

// Add event listener for the "Proceed To Pay" button
document.querySelector(".proceed-button").addEventListener("click", function () {
    // Store cart data in localStorage or sessionStorage to be accessed on payment page
    localStorage.setItem('cart', JSON.stringify(cart));
});
