// ==========================

// Product Data

// ==========================

const products = [

{

id:1,

name:"Wireless Headphones",

price:1999,

category:"Electronics",

image:"https://picsum.photos/300/220?random=1"

},

{

id:2,

name:"Smart Watch",

price:2499,

category:"Electronics",

image:"https://picsum.photos/300/220?random=2"

},

{

id:3,

name:"Men T-Shirt",

price:699,

category:"Fashion",

image:"https://picsum.photos/300/220?random=3"

},

{

id:4,

name:"Women Dress",

price:1299,

category:"Fashion",

image:"https://picsum.photos/300/220?random=4"

},

{

id:5,

name:"Running Shoes",

price:1899,

category:"Shoes",

image:"https://picsum.photos/300/220?random=5"

},

{

id:6,

name:"Sneakers",

price:1599,

category:"Shoes",

image:"https://picsum.photos/300/220?random=6"

},

{

id:7,

name:"Bluetooth Speaker",

price:999,

category:"Electronics",

image:"https://picsum.photos/300/220?random=7"

},

{

id:8,

name:"Jeans",

price:1199,

category:"Fashion",

image:"https://picsum.photos/300/220?random=8"

}

];

// ==========================

// Variables

// ==========================

let cart = [];

const productContainer = document.getElementById("products");

const cartItems = document.getElementById("cart-items");

const total = document.getElementById("total");

const cartCount = document.getElementById("cart-count");

const search = document.getElementById("search");

const category = document.getElementById("category");

// ==========================

// Display Products

// ==========================

function displayProducts(productList){

productContainer.innerHTML="";

productList.forEach(product=>{

productContainer.innerHTML += `

<div class="card"><img src="${product.image}"><div class="card-content"><h3>${product.name}</h3><p>${product.category}</p><p class="price">₹${product.price}</p><button onclick="addToCart(${product.id})">Add To Cart

</button></div></div>`;

});

}

displayProducts(products);

// ==========================

// Add To Cart

// ==========================

function addToCart(id){

const item = cart.find(product=>product.id===id);

if(item){

item.quantity++;

}

else{

const product = products.find(product=>product.id===id);

cart.push({

...product,

quantity:1

});

}

updateCart();

}

// ==========================

// Update Cart

// ==========================

function updateCart(){

cartItems.innerHTML="";

let grandTotal=0;

let totalItem=0;

if(cart.length===0){

cartItems.innerHTML="<p>Your Cart is Empty.</p>";

}

cart.forEach(item=>{

grandTotal += item.price*item.quantity;

totalItem += item.quantity;

cartItems.innerHTML += `

<div class="cart-item"><div><h4>${item.name}</h4><p>₹${item.price}</p></div><div class="quantity"><button onclick="decrease(${item.id})">-</button>

<span>${item.quantity}</span>

<button onclick="increase(${item.id})">+</button>

</div><button onclick="removeItem(${item.id})">Remove

</button></div>`;

});

total.innerText=grandTotal;

cartCount.innerText=totalItem;

}

// ==========================

// Increase

// ==========================

function increase(id){

const item = cart.find(product=>product.id===id);

item.quantity++;

updateCart();

}

// ==========================

// Decrease

// ==========================

function decrease(id){

const item = cart.find(product=>product.id===id);

item.quantity--;

if(item.quantity===0){

cart = cart.filter(product=>product.id!==id);

}

updateCart();

}

// ==========================

// Remove

// ==========================

function removeItem(id){

cart = cart.filter(product=>product.id!==id);

updateCart();

}

// ==========================

// Search

// ==========================

search.addEventListener("keyup",()=>{

const text = search.value.toLowerCase();

const result = products.filter(product=>{

return product.name.toLowerCase().includes(text);

});

displayProducts(result);

});

// ==========================

// Category Filter

// ==========================

category.addEventListener("change",()=>{

if(category.value==="All"){

displayProducts(products);

}

else{

const result = products.filter(product=>{

return product.category===category.value;

});

displayProducts(result);

}

});