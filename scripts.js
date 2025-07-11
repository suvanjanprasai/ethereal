// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = document.querySelector('.theme-icon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    updateThemeIcon();

    // Save theme preference
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light-theme');
    } else {
        localStorage.removeItem('theme');
    }
});

function updateThemeIcon() {
    if (body.classList.contains('light-theme')) {
        themeIcon.textContent = '🌞';
    } else {
        themeIcon.textContent = '🌙';
    }
}

// Product data
const products = [
    {
        id: 1,
        name: "Soléa Gold Bangle",
        price: 1400,
        image: "products/bracelet-1.jpg",
        category: "bracelets",
        description: "Sleek and radiant 18K gold with a mirror finish—crafted for effortless everyday luxury."
    },
    {
        id: 2,
        name: "Sapphire Blue Earrings",
        price: 1950,
        image: "products/earrings-1.jpg",
        category: "earrings",
        description: "Deep ocean sapphires set in platinum—where timeless beauty meets refined elegance."
    },
    {
        id: 3,
        name: "24K Gold Earrings",
        price: 2200,
        image: "products/earrings-2.jpg",
        category: "earrings",
        description: "Pure 24K gold earrings crafted for bold, unmistakable luxury."
    },
    {
        id: 4,
        name: "Lune Gold Rings",
        price: 980,
        image: "products/ring-1.jpg",
        category: "rings",
        description: "Minimalist 14K gold bands inspired by the graceful arc of the moon."
    },
    {
        id: 5,
        name: "Celestia Diamond Pendant",
        price: 3650,
        image: "products/necklace-1.jpg",
        category: "necklaces",
        description: "A radiant diamond centerpiece that captures the brilliance of the stars."
    },
    {
        id: 6,
        name: "Aurum Luxe Set",
        price: 5600,
        image: "products/set-1.jpg",
        category: "sets",
        description: "A dazzling ensemble of 22K gold elegance—where tradition meets timeless sophistication."
    },
    {
        id: 7,
        name: "Pearl Drop Earrings",
        price: 1250,
        image: "products/earrings-3.jpg",
        category: "earrings",
        description: "Elegant freshwater pearls suspended from delicate gold settings."
    },
    {
        id: 8,
        name: "Eternal Diamond Ring",
        price: 2800,
        image: "products/ring-2.jpg",
        category: "rings",
        description: "A stunning solitaire diamond ring that captures eternal love and commitment."
    },
    {
        id: 9,
        name: "Tennis Bracelet",
        price: 4200,
        image: "products/bracelet-2.jpg",
        category: "bracelets",
        description: "Classic tennis bracelet featuring a continuous line of brilliant diamonds."
    },
    {
        id: 10,
        name: "Vintage Rose Gold Ring",
        price: 2400,
        image: "products/ring-3.jpg",
        category: "rings",
        description: "Delicate rose gold ring with vintage-inspired detailing and precious diamond."
    },
    {
        id: 11,
        name: "Diamond Stud Earrings",
        price: 2150,
        image: "products/earrings-4.jpg",
        category: "earrings",
        description: "Classic diamond studs that add sparkle and sophistication to any look."
    },
    {
        id: 12,
        name: "Gold Chain Necklace",
        price: 1890,
        image: "products/necklace-2.jpg",
        category: "necklaces",
        description: "Sophisticated 18K gold chain perfect for layering or wearing alone."
    },
    {
        id: 13,
        name: "Emerald Pendant Necklace",
        price: 2750,
        image: "products/necklace-3.jpg",
        category: "necklaces",
        description: "Stunning emerald pendant surrounded by delicate diamond accents."
    },
    {
        id: 14,
        name: "Charm Bracelet",
        price: 980,
        image: "products/bracelet-3.jpg",
        category: "bracelets",
        description: "Delicate gold bracelet with customizable charms to tell your story."
    },
    {
        id: 15,
        name: "Bridal Collection Set",
        price: 8950,
        image: "products/set-2.jpg",
        category: "sets",
        description: "Complete bridal set featuring matching necklace and earrings with diamonds."
    },
    {
        id: 16,
        name: "Royal Heritage Set",
        price: 12000,
        image: "products/set-3.jpg",
        category: "sets",
        description: "Exquisite heritage collection with intricate designs and precious gemstones."
    },
];

function loadProducts(filter = 'all') {
    const productsGrid = document.getElementById('productGrid');
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toLocaleString()}</div>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to My Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart functionality
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCartDisplay();
    updateCartBadge();
    saveCartToStorage();

    // Show feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#4CAF50';
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1500);
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartBadge();
    saveCartToStorage();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            updateCartBadge();
            saveCartToStorage();
        }
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛍️</div>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.textContent = '$0.00';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toLocaleString()}`;
        checkoutBtn.disabled = false;
    }
}

function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const isOpen = cartSidebar.classList.contains('open');

    if (isOpen) {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    } else {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
    }
}

function checkout() {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    alert(`Thank you for your purchase!\n\nItems: ${itemCount}\nTotal: $${total.toLocaleString()}\n\nYour order will be processed shortly.`);

    // Clear cart after checkout
    cart = [];
    updateCartDisplay();
    updateCartBadge();
    saveCartToStorage();
    toggleCart();
}

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Filter products
            const filter = button.dataset.filter;
            loadProducts(filter);
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

function featuredProducts(productIds) {
    const productsGrid = document.getElementById('featuredGrid');
    const selectedProducts = products.filter(product => productIds.includes(product.id));

    productsGrid.innerHTML = selectedProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toLocaleString()}</div>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to My Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function displayFilteredProducts(filteredProducts) {
    const productsGrid = document.getElementById('productsGrid');

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #CCCCCC;">
                <i class="fa-solid fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No products found matching your search.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toLocaleString()}</div>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to My Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Animation observer for product cards
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe all product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key closes cart
    if (e.key === 'Escape' && document.getElementById('cartSidebar').classList.contains('open')) {
        toggleCart();
    }

    // Ctrl/Cmd + K for search (if search is implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Focus search input if it exists
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load all products if productGrid exists
    if (document.getElementById('productGrid')) {
        loadProducts();
    }

    // Load featured products if featuredGrid exists
    if (document.getElementById('featuredGrid')) {
        featuredProducts([2, 3, 5, 6, 10, 11]);
    }

    // Initialize filters, scroll effects, theme icon
    initializeFilters();
    initializeScrollEffects();
    updateThemeIcon();

    // Restore cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
        updateCartBadge();
    }

    // Initialize product animations after loading
    setTimeout(() => {
        initializeAnimations();
    }, 100);

    // Setup accordion behavior and animations
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const accordionItem = this.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isActive = accordionContent.classList.contains('active');

            accordionHeaders.forEach(otherHeader => {
                const otherItem = otherHeader.parentElement;
                const otherContent = otherItem.querySelector('.accordion-content');
                otherHeader.classList.remove('active');
                otherContent.classList.remove('active');
            });

            if (!isActive) {
                this.classList.add('active');
                accordionContent.classList.add('active');
            }
        });
    });

    // Open first accordion by default if present
    if (accordionHeaders.length > 0) {
        const firstHeader = accordionHeaders[0];
        const firstContent = firstHeader.parentElement.querySelector('.accordion-content');
        firstHeader.classList.add('active');
        firstContent.classList.add('active');
    }

    // Animate accordion items on load
    accordionItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
});
