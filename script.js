// DATOS DE PRODUCTOS
const productos = [
    {
        id: 1,
        nombre: "Tarta Chocolate Belga",
        descripcion: "3 capas de chocolate belga premium con relleno de crema de avellana. Puro deleite en cada bocado.",
        precio: 28,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        nombre: "Fraisier Clásico",
        descripcion: "Delicada combinación de fresas frescas, crema pastelera y bizcocho esponjoso. Exquisitez hecha postre.",
        precio: 24,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        nombre: "Vainilla Francesa",
        descripcion: "Clásica vainilla francesa con infusión de Madagascar. Elegancia y sofisticación en cada porción.",
        precio: 22,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        nombre: "Bosque Negro Artesanal",
        descripcion: "Tradicional Black Forest con cerezas confitadas y copos de chocolate. Una joya de la repostería.",
        precio: 32,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        nombre: "Tiramisú Premium",
        descripción: "Auténtico tiramisú italiano con mascarpone de calidad superior. Sabor intenso y textura perfecta.",
        precio: 19,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        nombre: "Lemon Cheesecake",
        descripcion: "Cremoso cheesecake con toques cítricos de limón siciliano. Frescura y sabor combinados.",
        precio: 21,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        nombre: "Millefeuille Artesanal",
        descripcion: "Mil hojas perfectas con crema pastelera artesanal y cobertura de fondant. Sofisticación en capas.",
        precio: 20,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        nombre: "Stroopwafel Premium",
        descripcion: "Galletas holandesas rellenas de caramelo toffee artesanal. Textura crujiente y sabor adictivo.",
        precio: 15,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        nombre: "Croquembouche Elegante",
        descripcion: "Pirámide de profiteroles cubiertos con caramelo y azúcar hilada. Presentación espectacular.",
        precio: 35,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },
    {
        id: 10,
        nombre: "Brownies Artesanales",
        descripcion: "Brownies caseros con chocolate de origen único. Intenso, riquísimo y totalmente adictivo.",
        precio: 12,
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    }
];

// CARRITO
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// INICIALIZAR
function init() {
    renderProductos();
    updateCartCount();
    setupEventListeners();
}

// RENDERIZAR PRODUCTOS
function renderProductos() {
    const grid = document.getElementById('productosGrid');
    grid.innerHTML = productos.map(producto => `
        <div class="producto-card">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
            <div class="producto-info">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <div class="producto-footer">
                    <span class="producto-precio">€${producto.precio}</span>
                    <button class="btn-carrito" onclick="addToCart(${producto.id})">Añadir</button>
                </div>
            </div>
        </div>
    `).join('');
}

// AÑADIR AL CARRITO
function addToCart(productId) {
    const producto = productos.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.cantidad++;
    } else {
        cart.push({
            ...producto,
            cantidad: 1
        });
    }

    saveCart();
    updateCartCount();
    updateCartDisplay();
    
    // Animación visual
    setTimeout(() => toggleCart(true), 200);
}

// GUARDAR CARRITO
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ACTUALIZAR CONTADOR CARRITO
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('cartCount').textContent = count;
}

// TOGGLE CARRITO MODAL
function toggleCart(open = null) {
    const modal = document.getElementById('modalCart');
    if (open === null) {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    } else {
        modal.style.display = open ? 'flex' : 'none';
    }
    if (open !== false) {
        updateCartDisplay();
    }
}

// ACTUALIZAR DISPLAY CARRITO
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
    } else {
        cartItemsDiv.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <div class="cart-item-qty">
                        <button onclick="updateQty(${item.id}, -1)">−</button>
                        <span>${item.cantidad}</span>
                        <button onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div class="cart-item-price">€${(item.precio * item.cantidad).toFixed(2)}</div>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">Eliminar</button>
                </div>
            </div>
        `).join('');
    }

    updateTotals();
}

// ACTUALIZAR CANTIDAD
function updateQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.cantidad += change;
        if (item.cantidad <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            updateCartDisplay();
        }
    }
}

// ELIMINAR DEL CARRITO
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

// ACTUALIZAR TOTALES
function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    document.getElementById('subtotal').textContent = `€${subtotal.toFixed(2)}`;
    document.getElementById('iva').textContent = `€${iva.toFixed(2)}`;
    document.getElementById('total').textContent = `€${total.toFixed(2)}`;

    document.getElementById('checkoutBtn').disabled = cart.length === 0;
}

// CHECKOUT
function checkout() {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0) * 1.21;
    const message = `Pedido confirmado:\n\n${cart.map(item => `${item.nombre} x${item.cantidad}: €${(item.precio * item.cantidad).toFixed(2)}`).join('\n')}\n\nTotal: €${total.toFixed(2)}\n\nNos pondremos en contacto en breve para confirmar los detalles de entrega.`;
    
    alert(message);
    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
    toggleCart(false);
}

// FORMULARIO DE CONTACTO
function setupEventListeners() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;

        if (!nombre || !email || !asunto || !mensaje) {
            showFormMessage('Por favor completa todos los campos', 'error');
            return;
        }

        // Simulación de envío
        showFormMessage('¡Mensaje enviado correctamente! Te responderemos pronto.', 'success');
        this.reset();

        setTimeout(() => {
            document.getElementById('formMessage').style.display = 'none';
        }, 5000);
    });

    // MENU MOBILE
    document.getElementById('menuToggle').addEventListener('click', function() {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.toggle('active');
    });

    // CERRAR MENU AL HACER CLICK EN UN LINK
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            document.getElementById('navLinks').classList.remove('active');
        });
    });

    // CERRAR MODAL AL HACER CLICK FUERA
    document.getElementById('modalCart').addEventListener('click', function(e) {
        if (e.target === this) {
            toggleCart(false);
        }
    });

    // CARRITO ICON CLICK
    document.getElementById('cartIcon').addEventListener('click', toggleCart);
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
}

// SCROLL SUAVE
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// INICIAR
init();