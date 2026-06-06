let carrito = {}; 
let totalPrecio = 0;
let totalArticulos = 0;

// Aquí la página lee tu base de datos automáticamente
fetch('productos.json')
    .then(respuesta => respuesta.json())
    .then(datos => {
        let contenedor = document.getElementById("contenedor-catalogo");
        contenedor.innerHTML = ""; 
        
        datos.forEach(producto => {
            // Solo dibuja el producto si hay stock mayor a 0
            if(producto.stock > 0) {
                contenedor.innerHTML += `
                    <div class="tarjeta">
                        <h2>${producto.nombre}</h2>
                        <div class="imagen-placeholder">${producto.imagen}</div>
                        <p class="desc">${producto.desc}</p>
                        <p class="precio">$${producto.precio}</p>
                        <p class="stock">Disponibles: ${producto.stock}</p>
                        <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Añadir al carrito</button>
                    </div>
                `;
            }
        });
    });

function agregarAlCarrito(nombre, precio) {
    if (carrito[nombre]) {
        carrito[nombre].cantidad += 1;
    } else {
        carrito[nombre] = { precio: precio, cantidad: 1 };
    }
    totalPrecio += precio;
    totalArticulos += 1;
    document.getElementById("contador").innerText = totalArticulos;
}

function abrirCarrito() {
    let divLista = document.getElementById("lista-carrito");
    divLista.innerHTML = ""; 
    
    if (totalArticulos === 0) {
        divLista.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
        for (let nombre in carrito) {
            let item = carrito[nombre];
            divLista.innerHTML += `
                <div class="item-carrito">
                    <span>${item.cantidad}x ${nombre}</span>
                    <span>$${item.cantidad * item.precio}</span>
                </div>
            `;
        }
    }
    document.getElementById("total-precio").innerText = totalPrecio;
    document.getElementById("modal-carrito").style.display = "block";
}

function cerrarCarrito() {
    document.getElementById("modal-carrito").style.display = "none";
}

function enviarPedido() {
    if (totalArticulos === 0) return;

    let mensaje = "¡Hola! Quiero hacer un pedido desde la página de Alquimia Luma:%0A%0A";
    for (let nombre in carrito) {
        let item = carrito[nombre];
        mensaje += `✅ ${item.cantidad}x ${nombre} ($${item.precio * item.cantidad})%0A`;
    }
    mensaje += "%0A*Total a pagar: $" + totalPrecio + "*";
    
    // CAMBIA ESTO POR TU NÚMERO DE WHATSAPP
    let numeroWhatsApp = "TU_NUMERO_AQUI"; 
    window.open("https://wa.me/" + numeroWhatsApp + "?text=" + mensaje, "_blank");
}