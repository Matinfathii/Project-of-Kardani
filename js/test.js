document.addEventListener('DOMContentLoaded', function () {

    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const dropdownItems = document.querySelectorAll('.nav-links .dropdown > a');

    // رویداد کلیک برای دکمه همبرگری
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        if (!navLinks.classList.contains('active')) {
            closeAllSubmenus();
        }
    });

    // رویداد کلیک برای آیتم‌های دارای زیرمنو (فقط در حالت موبایل)
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const isMobileView = window.getComputedStyle(hamburger).display !== 'none';

            if (isMobileView) {
                e.preventDefault();
                const parentLi = item.parentElement;
                const submenu = parentLi.querySelector('.submenu');
                if (parentLi.classList.contains('open')) {
                    parentLi.classList.remove('open');
                } else {
                    closeAllSubmenus();
                    parentLi.classList.add('open');
                }
            }
        });
    });


    function closeAllSubmenus() {
        document.querySelectorAll('.nav-links .dropdown.open').forEach(openDropdown => {
            openDropdown.classList.remove('open');
        });
    }


    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            closeAllSubmenus();
        }
    });



});
// -----------------------


//  دریافت سبد خرید از localStorage یا ایجاد لیست خالی
let cart = JSON.parse(localStorage.getItem('cart')) || [];

//  به‌روزرسانی تعداد نمایش داده‌شده کنار آیکن سبد خرید
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const el = document.getElementById('cart-count');
    if (el) el.innerText = count;
}

// افزودن محصول به سبد خرید (مخصوص صفحه محصولات)
function addToCart(button) {
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));

    let existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

//  رندر جدول سبد خرید در صفحه Shopping-page.html
function renderCart() {
    const tbody = document.getElementById('cart-table-body');
    if (!tbody) return;
    tbody.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()} تومان</td>
            <td style="display: flex; flex-direction: row;align-items: center;justify-content:center;text-align: center;">
                <div>${item.quantity}</div>
                <div style="display: flex; flex-direction: column; align-items: center; margin-top: 5px;">
                    <span onclick="increaseQuantity(${index})" style="cursor: pointer; font-size: 14px; color: green;">➕</span>
                    <span onclick="decreaseQuantity(${index})" style="cursor: pointer; font-size: 14px; color: red; margin-top: 5px;">➖</span>
                </div>
            </td>
            <td><span class="remove-btn" onclick="removeProduct(${index})" style="color: red; cursor: pointer;">&times;</span></td>
        `;
        tbody.appendChild(row);
    });

    const totalEl = document.getElementById('total-price');
    if (totalEl) totalEl.innerText = total.toLocaleString() + " تومان";
}

// افزایش تعداد محصول در جدول سبد خرید
function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// کاهش تعداد محصول
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    else {
        // اگر مقدار رسید به 1 و باز کم کرد، کلا حذفش کن
        // cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// حذف محصول از سبد
function removeProduct(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// زمان بارگذاری صفحه، اجرای لازم:
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
});
//---------------------


// Gift - section
const products = [
    { id: 1, name: 'دستبند آویز قلب', price: 1700000, img: 'img/Products/Bracelet/دستبند آویز قلبjpg.webp' },
    { id: 2, name: 'دستبند برگ', price: 2200000, img: 'img/Products/Bracelet/دستبند برگ.png' },
    { id: 3, name: 'دستبند دایره', price: 2900000, img: 'img/Products/Bracelet/دستبند دایره.png' },
    { id: 4, name: 'دستبند دو پروانه مخراجی', price: 4700000, img: 'img/Products/Bracelet/دستبند دو پروانه مخراجی.png' },
    { id: 5, name: 'دستبند پر گل', price: 5800000, img: 'img/Products/Bracelet/دستبند پر گل.png' },
    { id: 6, name: 'دستبند پروانه تو خالی', price: 6550000, img: 'img/Products/Bracelet/دستبند پروانه تو خالی.jpg' },
    { id: 6, name: 'دستبند پروانه تو خالی', price: 8900000, img: 'img/Products/Bracelet/دستبند پروانه تو خالی.jpg' },
    { id: 6, name: 'دستبند پروانه تو خالی', price: 20000000, img: 'img/Products/Bracelet/دستبند پروانه تو خالی.jpg' },
    { id: 6, name: 'دستبند پروانه تو خالی', price: 6550000, img: 'img/Products/Bracelet/دستبند پروانه تو خالی.jpg' },
    { id: 6, name: 'دستبند پروانه تو خالی', price: 8900000, img: 'img/Products/Bracelet/دستبند پروانه تو خالی.jpg' },
    { id: 6, name: 'دستبند پروانه تو خالی', price: 20000000, img: 'img/Products/Bracelet/دستبند پروانه تو خالی.jpg' },

];
let cart_1 = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart_1.reduce((total, item) => total + item.quantity, 0);
    const el = document.getElementById('cart-count');
    if (el) el.innerText = count;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let existing = cart_1.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart_1.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart_1));
    updateCartCount();
}

function displayProducts(filtered) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
<img src="${p.img}" alt="${p.name}">
<h3>${p.name}</h3>
<div class="card-footer">
  <div class="price">${p.price.toLocaleString()} تومان</div>
  <button class="button" onclick="addToCart(${p.id})">
      افزودن به سبد
  </button>
</div>
`;
        productList.appendChild(card);
    });
}

function filterProducts(min, max) {
    const filtered = products.filter(p => p.price >= min && p.price < max);
    displayProducts(filtered);
}

//  شروع اولیه: نمایش محصولات ۱ تا ۲ میلیون تومان
filterProducts(0, 2000000);
updateCartCount();
// ---------


// دکمه اسکرول به بالا
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
