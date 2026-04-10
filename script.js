// Khởi tạo dữ liệu mẫu (nếu LocalStorage trống)
let cart = JSON.parse(localStorage.getItem('myCart')) || [
    { id: 1, name: "iPhone 15 Pro Max 256GB Chính hãng VN/A", price: 29590000, qty: 1, img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png" },
    { id: 2, name: "Củ sạc Apple USB-C 20W Chính hãng", price: 520000, qty: 1, img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/h/mjt23_fe_1.png" }
];

const cartList = document.getElementById('cart-list');
const subtotalEl = document.getElementById('subtotal');
const finalTotalEl = document.getElementById('final-total');

// Hàm định dạng tiền tệ VNĐ
function formatCurrency(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

// Hàm render giỏ hàng
function renderCart() {
    if (cart.length === 0) {
        cartList.innerHTML = "<p style='text-align:center; padding:20px;'>Giỏ hàng trống!</p>";
        updateTotals();
        return;
    }

    cartList.innerHTML = cart.map((item, index) => `
        <div class="product-item">
            <img src="${item.img}" class="product-img">
            <div class="product-info">
                <p class="product-name">${item.name}</p>
                <p class="product-price">${formatCurrency(item.price)}</p>
                <div class="quantity-box">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <input type="text" value="${item.qty}" readonly>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>
            <div class="btn-delete" onclick="removeItem(${index})">🗑 Xóa</div>
        </div>
    `).join('');

    updateTotals();
    saveToStorage();
}

// Thay đổi số lượng
window.changeQty = (index, delta) => {
    cart[index].qty += delta;
    if (cart[index].qty < 1) cart[index].qty = 1;
    renderCart();
};

// Xóa sản phẩm
window.removeItem = (index) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        cart.splice(index, 1);
        renderCart();
    }
};

// Cập nhật tổng tiền
function updateTotals() {
    let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    subtotalEl.innerText = formatCurrency(total);
    finalTotalEl.innerText = formatCurrency(total);
}

// Lưu vào LocalStorage
function saveToStorage() {
    localStorage.setItem('myCart', JSON.stringify(cart));
}

// Chạy lần đầu khi load trang
renderCart();
