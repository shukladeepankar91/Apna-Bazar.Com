// Default products
let products = JSON.parse(localStorage.getItem('apna_bazar_products')) || [
    { title: "Foxsky 43 inch Full HD Smart TV", price: "₹13,699", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/television/t/6/1/-original-imahhxggzchbd72z.jpeg?q=70" },
    { title: "Foxsky 55 inch 4K Ultra HD Mini LED", price: "₹37,499", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/television/q/z/e/-original-imahpfryfv8jbzpa.jpeg?q=70" },
    { title: "realme TechLife 32 inch QLED TV", price: "₹10,999", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/television/1/s/h/-original-imahqej9zredxjk4.jpeg?q=70" }
];

let cartCount = 0;

function displayProducts() {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.title}" style="height: 140px; object-fit: contain; margin-bottom: 10px;">
            <div class="product-title" style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">${p.title}</div>
            <div class="product-price" style="color: #388e3c; font-weight: bold; margin-bottom: 10px;">${p.price}</div>
            <button class="buy-btn" onclick="addToCart()" style="background: #ff9f00; color: white; border: none; padding: 8px; width: 100%; cursor: pointer; font-weight: bold;">Add to Cart</button>
        </div>
    `).join('');
}

function toggleAdminPanel() {
    const panel = document.getElementById("admin-panel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
}

function addNewProduct() {
    const title = document.getElementById("p-title").value;
    const price = document.getElementById("p-price").value;
    const img = document.getElementById("p-img").value;

    if(title && price && img) {
        products.push({ title, price, img });
        localStorage.setItem('apna_bazar_products', JSON.stringify(products));
        displayProducts();
        alert("Product added successfully!");
        document.getElementById("p-title").value = "";
        document.getElementById("p-price").value = "";
        document.getElementById("p-img").value = "";
    } else {
        alert("Please fill all fields!");
    }
}

function addToCart() {
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;
    alert("Item added to cart!");
}

window.onload = displayProducts;