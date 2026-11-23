
const products = [
    {
        id: 1,
        name: "Samsung Smartphone",
        category: "Electronics",
        price: 18500,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 3500,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 3,
        name: "Men's Sneakers",
        category: "Fashion",
        price: 4200,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        name: "Ladies Handbag",
        category: "Fashion",
        price: 2800,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
    },
    {
        id: 5,
        name: "Modern Coffee Table",
        category: "Home",
        price: 7500,
        image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=500"
    },
    {
        id: 6,
        name: "Skincare Collection",
        category: "Beauty",
        price: 2200,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500"
    },
    {
        id: 7,
        name: "Kitchen Blender",
        category: "Home",
        price: 4800,
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500"
    },
    {
        id: 8,
        name: "Grocery Shopping Pack",
        category: "Groceries",
        price: 1500,
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500"
    },

    // VEHICLES FOR SALE

    {
        id: 9,
        name: "Toyota Axio 2018",
        category: "Vehicles",
        price: 1450000,
        year: 2018,
        mileage: "65,000 km",
        fuel: "Petrol",
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700"
    },
    {
        id: 10,
        name: "Toyota Harrier 2019",
        category: "Vehicles",
        price: 2850000,
        year: 2019,
        mileage: "52,000 km",
        fuel: "Petrol",
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1621993202323-f438eec934ff?w=700"
    },
    {
        id: 11,
        name: "Nissan X-Trail 2017",
        category: "Vehicles",
        price: 1950000,
        year: 2017,
        mileage: "80,000 km",
        fuel: "Petrol",
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700"
    },
    {
        id: 12,
        name: "Mazda CX-5 2020",
        category: "Vehicles",
        price: 2600000,
        year: 2020,
        mileage: "48,000 km",
        fuel: "Petrol",
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=700"
    }
];

let cart = JSON.parse(localStorage.getItem("marketCart")) || [];
let currentItems = [...products];

const grid = document.getElementById("productGrid");

function money(value) {
    return value.toLocaleString("en-KE");
}

// DISPLAY LISTINGS

function displayItems(items) {
    grid.innerHTML = "";

    if (items.length === 0) {
        grid.innerHTML = "<p>No listings found.</p>";
        return;
    }

    items.forEach(item => {

        const isVehicle = item.category === "Vehicles";

        grid.innerHTML += `
            <div class="product-card">

                <img src="${item.image}"
                     alt="${item.name}"
                     onerror="this.src='https://placehold.co/500x350?text=Image+Unavailable'">

                <div class="product-info">

                    <span class="tag">${item.category}</span>

                    <h3>${item.name}</h3>

                    ${isVehicle ? `
                        <div class="vehicle-specs">
                            📅 ${item.year} |
                            🛣️ ${item.mileage}<br>
                            ⛽ ${item.fuel} |
                            ⚙️ ${item.transmission}
                        </div>
                    ` : ""}

                    <div class="price">
                        KSh ${money(item.price)}
                    </div>

                    ${isVehicle ? `
                        <button onclick="viewVehicle(${item.id})">
                            View Vehicle Details
                        </button>
                    ` : `
                        <button onclick="addToCart(${item.id})">
                            Add to Cart
                        </button>
                    `}

                </div>
            </div>
        `;
    });
}

// CATEGORY FILTER

function showCategory(category) {

    document.getElementById("searchInput").value = "";

    currentItems = category === "All"
        ? [...products]
        : products.filter(item => item.category === category);

    document.getElementById("listingTitle").textContent =
        category === "All" ? "Featured Products" :
        category === "Vehicles" ? "Vehicles for Sale" :
        category + " Products";

    document.getElementById("listingDescription").textContent =
        category === "Vehicles"
            ? "Explore vehicles available in our marketplace."
            : "Discover great products and amazing deals.";

    displayItems(currentItems);

    document.getElementById("listingSection")
        .scrollIntoView({ behavior: "smooth" });
}

// SEARCH

function searchItems() {

    const query = document.getElementById("searchInput")
        .value.toLowerCase().trim();

    currentItems = products.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.year && String(item.year).includes(query))
    );

    document.getElementById("listingTitle").textContent =
        "Search Results";

    displayItems(currentItems);
}

// SORT

function sortItems() {

    let sorted = [...currentItems];

    const option = document.getElementById("sortSelect").value;

    if (option === "low") {
        sorted.sort((a, b) => a.price - b.price);
    }

    if (option === "high") {
        sorted.sort((a, b) => b.price - a.price);
    }

    displayItems(sorted);
}

// VEHICLE DETAILS

function viewVehicle(id) {

    const vehicle = products.find(item => item.id === id);

    if (!vehicle) return;

    document.getElementById("vehicleDetailsContent").innerHTML = `
        <h2>${vehicle.name}</h2>

        <img src="${vehicle.image}" alt="${vehicle.name}">

        <h3 class="price">KSh ${money(vehicle.price)}</h3>

        <p><strong>Year:</strong> ${vehicle.year}</p>
        <p><strong>Mileage:</strong> ${vehicle.mileage}</p>
        <p><strong>Fuel:</strong> ${vehicle.fuel}</p>
        <p><strong>Transmission:</strong> ${vehicle.transmission}</p>

        <p>Contact our team for more information about this vehicle.</p>

        <a class="primary-btn" href="tel:0746081189">
            Call 0746081189
        </a>

        <a class="whatsapp-btn"
           href="https://wa.me/254746081189?text=${encodeURIComponent("Hello, I am interested in " + vehicle.name)}"
           target="_blank">
           Enquire on WhatsApp
        </a>
    `;

    document.getElementById("vehicleModal").style.display = "flex";
}

function closeVehicleDetails() {
    document.getElementById("vehicleModal").style.display = "none";
}

// SHOPPING CART

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product || product.category === "Vehicles") return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();

    alert(product.name + " added to cart!");
}

function saveCart() {
    localStorage.setItem("marketCart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {

    const container = document.getElementById("cartItems");

    const count = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    document.getElementById("cartCount").textContent = count;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach(item => {

        container.innerHTML += `
            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong>
                    <p>KSh ${money(item.price)} × ${item.quantity}</p>
                    <p>Subtotal: KSh ${money(item.price * item.quantity)}</p>
                </div>

                <div>
                    <button onclick="changeQuantity(${item.id},-1)">−</button>
                    <button onclick="changeQuantity(${item.id},1)">+</button>
                    <button onclick="removeItem(${item.id})">🗑</button>
                </div>

            </div>
        `;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cartTotal").textContent = money(total);
}

function changeQuantity(id, amount) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    saveCart();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
}

// CART PANEL

function toggleCart() {

    document.getElementById("cartPanel")
        .classList.toggle("active");

    document.getElementById("overlay")
        .classList.toggle("active");
}

function closePanels() {

    document.getElementById("cartPanel")
        .classList.remove("active");

    document.getElementById("overlay")
        .classList.remove("active");
}

// CHECKOUT

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    closePanels();

    document.getElementById("checkoutModal").style.display = "flex";
}

function closeCheckout() {
    document.getElementById("checkoutModal").style.display = "none";
}

document.getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const order = {

            customer: document.getElementById("customerName").value,

            phone: document.getElementById("customerPhone").value,

            address: document.getElementById("customerAddress").value,

            items: cart,

            total: cart.reduce(
                (sum, item) => sum + item.price * item.quantity, 0
            ),

            date: new Date().toISOString()
        };

        const orders = JSON.parse(
            localStorage.getItem("marketOrders") || "[]"
        );

        orders.push(order);

        localStorage.setItem("marketOrders", JSON.stringify(orders));

        alert(
            "Thank you " + order.customer +
            "! Your demonstration order has been saved on this device. " +
            "Please contact 0746081189 to confirm."
        );

        cart = [];

        saveCart();

        document.getElementById("checkoutForm").reset();

        closeCheckout();
    });

// LIVE SEARCH

document.getElementById("searchInput")
    .addEventListener("input", searchItems);

// INITIALIZE

displayItems(products);
updateCart();
