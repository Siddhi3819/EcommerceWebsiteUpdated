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

// Variables


let cart = [];

try {
    const savedCart = localStorage.getItem("shopEasyCart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    if (Array.isArray(parsedCart)) {
        cart = parsedCart
            .filter(item =>
                item &&
                Number.isInteger(item.id) &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0 &&
                products.some(product => product.id === item.id)
            )
            .map(item => {
                const product = products.find(
                    product => product.id === item.id
                );

                return {
                    ...product,
                    quantity: item.quantity
                };
            });
    }
} catch (error) {
    cart = [];
}
const productContainer = document.getElementById("products");

const cartItems = document.getElementById("cart-items");

const total = document.getElementById("total");

const cartCount = document.getElementById("cart-count");

const search = document.getElementById("search");

const category = document.getElementById("category");
const sort = document.getElementById("sort");

// ==========================

// Display Products

// ==========================


function displayProducts(productList) {
    productContainer.innerHTML = "";

    // Check if no products match
    if (productList.length === 0) {
        productContainer.innerHTML = `
            <div class="no-products">
                <h3>No Products Found!</h3>
                <p>Try searching with another name or category.</p>
            </div>
        `;
        return;
    }

    // Display matching products
    productList.forEach(product => {
        productContainer.innerHTML += `
            <div class="card">
                <img src="${product.image}" alt="${product.name}">
                <div class="card-content">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <p class="price">₹${product.price}</p>
                    
            <div class="product-buttons">
                    <button onclick="viewDetails(${product.id})">
                    View Details
                    </button>

                    <button onclick="addToCart(${product.id})">
                    Add To Cart
                    </button>
            </div>

                </div>
            </div>
        `;
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

total.innerText = grandTotal;
cartCount.innerText = totalItem;

localStorage.setItem("shopEasyCart", JSON.stringify(cart));
}

// ==========================

// Increase

// ==========================


function increase(id) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity++;
    updateCart();
}

function decrease(id) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
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

function filterProducts() {
    const text = search.value.toLowerCase().trim();
    const selectedCategory = category.value;
    const sortValue = sort.value;

    // Filter products by name and category
    let result = products.filter(product => {
        const matchesName =
            product.name.toLowerCase().includes(text);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesName && matchesCategory;
    });

    // Sort the filtered products by price
    if (sortValue === "low-high") {
        result.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-low") {
        result.sort((a, b) => b.price - a.price);
    }

    // Display the final result
    displayProducts(result);
}

search.addEventListener("input", filterProducts);
category.addEventListener("change", filterProducts);
sort.addEventListener("change", filterProducts);
updateCart();
function viewDetails(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-image").alt = product.name;
    document.getElementById("modal-name").textContent = product.name;
    document.getElementById("modal-category").textContent =
        "Category: " + product.category;
    document.getElementById("modal-price").textContent =
        "₹" + product.price;

    document.getElementById("modal-add-cart").onclick = function () {
        addToCart(product.id);
        closeDetails();
    };

    document.getElementById("product-modal").style.display = "flex";
}

function closeDetails() {
    document.getElementById("product-modal").style.display = "none";
}
// ==========================

// Search

// ==========================
