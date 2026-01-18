"use strict";

const menuItems = [
  {
    name: "Margherita Pizza",
    description: "Classic cheese pizza with fresh basil",
    price: "₹299",
    image: "images/pizza.jpg"
  },
  {
    name: "Paneer Burger",
    description: "Grilled paneer patty with fresh veggies",
    price: "₹199",
    image: "images/burger.jpg"
  },
  {
    name: "Pasta Alfredo",
    description: "Creamy white sauce pasta",
    price: "₹249",
    image: "images/pasta.jpg"
  },
  {
    name: "French Fries",
    description: "Crispy golden fries",
    price: "₹149",
    image: "images/frenchfries.jpg"
  },
  {
    name: "Veg Sandwich",
    description: "Loaded vegetable sandwich",
    price: "₹179",
    image: "images/vegsandwich.jpg"
  },
  {
    name: "Cold Coffee",
    description: "Chilled coffee with cream",
    price: "₹129",
    image: "images/coldcoffee.jpg"
  },
  {
    name: "Pastry",
    description: "Chilled pastry cream",
    price: "₹149",
    image: "images/pastry.jpg"
  },
  {
    name: "Chocolate Cake",
    description: "Chocolate cake with fruits",
    price: "₹359",
    image: "images/delicious-cake-with-fruits.jpg"
  }
];

const menuContainer = document.getElementById("menuContainer");

function renderMenuItems() {
  menuContainer.innerHTML = "";

  menuItems.forEach( function(item) {
    const card = document.createElement("div");
    card.classList.add("menu-card");

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="menu-card-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span class="menu-price">${item.price}</span>
      </div>
    `;

    menuContainer.appendChild(card);
  });
}

renderMenuItems();