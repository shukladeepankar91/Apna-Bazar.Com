const products = [
    { title: "Foxsky 43 inch Full HD Smart TV", price: "₹13,699", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/television/t/6/1/-original-imahhxggzchbd72z.jpeg?q=70" },
    { title: "Foxsky 55 inch 4K Ultra HD Mini LED", price: "₹37,499", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/television/q/z/e/-original-imahpfryfv8jbzpa.jpeg?q=70" },
    { title: "realme TechLife 32 inch QLED TV", price: "₹10,999", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/television/1/s/h/-original-imahqej9zredxjk4.jpeg?q={@quality}" },
    { title: "MOTOROLA 32 inch QLED Google TV", price: "₹12,149", img: "https://rukminim2.flixcart.com/image/312/312/xif0q/television/9/s/l/-original-imahm5dxua6rfgkn.jpeg?q=70" }
];

let cartCount = 0;

function displayProducts() {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.title}">
            <div class="product-title">${p.title}</div>
            <div class="product-price">${p.price}</div>
            <button class="buy-btn" onclick="addToCart()">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart() {
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;
    alert("Item added to your cart!");
}

window.onload = displayProducts;