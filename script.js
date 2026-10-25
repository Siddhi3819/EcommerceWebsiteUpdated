
/* =====================================
   ShopEasy - E-commerce Website
===================================== */

// 1. Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        category: "Electronics",
        image: "https://picsum.photos/seed/headphones/400/300"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        category: "Electronics",
        image: "https://picsum.photos/seed/smartwatch/400/300"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 999,
        category: "Electronics",
        image: "https://picsum.photos/seed/speaker/400/300"
    },
    {
        id: 4,
        name: "Casual T-Shirt",
        price: 599,
        category: "Fashion",
        image: "https://picsum.photos/seed/tshirt/400/300"
    },
    {
        id: 5,
        name: "Stylish Jacket",
        price: 1999,
        category: "Fashion",
        image: "https://picsum.photos/seed/jacket/400/300"
    },
    {
        id: 6,
        name: "Running Shoes",
        price: 1799,
        category: "Shoes",
        image: "https://picsum.photos/seed/runningshoes/400/300"
    },
    {
        id: 7,
        name: "Casual Sneakers",
        price: 1299,
        category: "Shoes",
        image: "https://picsum.photos/seed/sneakers/400/300"
    },
    {
        id: 8,
        name: "Denim Jeans",
        price: 1099,
        category: "Fashion",
        image: "https://picsum.photos/seed/jeans/400/300"
    }
];


// 2. HTML Elements
const productContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalElement = document.getElementById("total");

const search = document.getElementById("search");
const category = document.getElementById("category");
const sort = document.getElementById("sort");


// 3. Load Cart from Local Storage
let cart = [];

try {
    const savedCart = JSON.parse(
        localStorage.getItem("shopEasyCart") || "[]"
    );

    if (Array.isArray(savedCart)) {
        cart = savedCart
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


// 4. Display Products
function displayProducts(productList) {
    productContainer.innerHTML = "";

    if (productList.length === 0) {
        productContainer.innerHTML = `
            <div class="no-products">
                <h3>No Products Found!</h3>
                <p>Try another product name or category.</p>
            </div>
        `;
        return;
    }

    productList.forEach(product => {
        productContainer.innerHTML += `
            <div class="card">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <div class="card-content">
                    <h3>${product.name}</h3>

                    <p class="price">₹${product.price}</p>

                    <p>Category: ${product.category}</p>

                    <div class="product-buttons">
                        <button
                            onclick="viewDetails(${product.id})"
                        >
                            View Details
                        </button>

                        <button
                            onclick="addToCart(${product.id})"
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}


// 5. Search, Category Filter and Price Sorting
function filterProducts() {
    const searchText = search.value.toLowerCase().trim();
    const selectedCategory = category.value;
    const sortValue = sort.value;

    let filteredProducts = products.filter(product => {
        const matchesName = product.name
            .toLowerCase()
            .includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesName && matchesCategory;
    });

    if (sortValue === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(filteredProducts);
}

search.addEventListener("input", filterProducts);
category.addEventListener("change", filterProducts);
sort.addEventListener("change", filterProducts);


// 6. Add Product to Cart
function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}


// 7. Display Actual Cart Products
function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">Your cart is empty!</p>
        `;
    } else {
        cart.forEach(item => {
            const subtotal = item.price * item.quantity;

            total += subtotal;
            itemCount += item.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        loading="lazy"
                    >

                    <div class="cart-item-details">
                        <h4>${item.name}</h4>

                        <p>Price: ₹${item.price}</p>

                        <p>Quantity: ${item.quantity}</p>

                        <p>
                            Subtotal: ₹${subtotal}
                        </p>

                        <div class="cart-item-buttons">
                            <button
                                onclick="decreaseQuantity(${item.id})"
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>

                            <button
                                onclick="increaseQuantity(${item.id})"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>

                            <button
                                onclick="removeFromCart(${item.id})"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    cartCount.textContent = itemCount;
    totalElement.textContent = total;

    // Save cart so it survives page refreshes
    localStorage.setItem(
        "shopEasyCart",
        JSON.stringify(cart)
    );
}


// 8. Increase Product Quantity
function increaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
        updateCart();
    }
}


// 9. Decrease Product Quantity
function decreaseQuantity(id) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}


// 10. Remove Product from Cart
function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);
    updateCart();
}


// 11. View Product Details Popup
function viewDetails(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const modal = document.getElementById("product-modal");

    if (!modal) {
        alert(
            product.name +
            "\nCategory: " + product.category +
            "\nPrice: ₹" + product.price
        );
        return;
    }

    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-image").alt = product.name;

    document.getElementById("modal-name").textContent =
        product.name;

    document.getElementById("modal-category").textContent =
        "Category: " + product.category;

    document.getElementById("modal-price").textContent =
        "₹" + product.price;

    document.getElementById("modal-add-cart").onclick = function () {
        addToCart(product.id);
        closeDetails();
    };

    modal.style.display = "flex";
}


// 12. Close Product Details Popup
function closeDetails() {
    const modal = document.getElementById("product-modal");

    if (modal) {
        modal.style.display = "none";
    }
}


// Close popup when clicking outside it
const productModal = document.getElementById("product-modal");

if (productModal) {
    productModal.addEventListener("click", function (event) {
        if (event.target === productModal) {
            closeDetails();
        }
    });
}


// 13. Initial Page Setup
displayProducts(products);
updateCart();
