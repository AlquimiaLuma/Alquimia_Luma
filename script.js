let carrito = {}; 
let totalPrecio = 0;
let totalArticulos = 0;

// Lee de forma autónoma el archivo productos.json
fetch('productos.json')
    .then(respuesta => respuesta.json())
    .then(datos => {
        let contenedor = document.getElementById("contenedor-catalogo");
        contenedor.innerHTML = ""; 
        
        datos.forEach(producto => {
            // Verifica si está agotado
            let esAgotado = producto.stock <= 0 ? "agotado" : "";
            
            // Renderiza botón activo o deshabilitado según las existencias
            let botonHTML = producto.stock > 0 
                ? `<button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Añadir al carrito</button>`
                : `<button disabled>No disponible</button>`;
                
            let textoStock = producto.stock > 0 ? `Disponibles: ${producto.stock}` : "Agotado";

            contenedor.innerHTML += `
                <div class="tarjeta ${esAgotado}">
                    <h2>${producto.nombre}</h2>
                    <div class="imagen-placeholder">${producto.imagen}</div>
                    <p class="desc">${producto.desc}</p>
                    <p class="precio">$${producto.precio}</p>
                    <p class="stock">${textoStock}</p>
                    ${botonHTML}
                </div>
            `;
        });
    });

function agregarAlCarrito(nombre, precio) {
    if (carrito[nombre]) {
        carrito[nombre].cantidad += 1;
    } else {
        carrito[nombre] = { precio: precio, bandwidth: 1, cantidad: 1 };
    }
    totalPrecio += precio;
    totalArticulos += 1;
    document.getElementById("contador").innerText = totalArticulos;
    alert("¡Agregaste " + nombre + " al carrito!");
}

function abrirCarrito() {
    let divLista = document.getElementById("lista-carrito");
    divLista.innerHTML = ""; 
    
    if (totalArticulos === 0) {
        divLista.innerHTML = "<p style='color:#777;'>Tu carrito está vacío.</p>";
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
    if (totalArticulos === 0) {
        alert("Agrega productos antes de enviar tu pedido.");
        return;
    }

    let mensaje = "¡Hola! Quiero hacer un pedido desde la página de Alquimia Luma:%0A%0A";
    for (let nombre in carrito) {
        let item = carrito[nombre];
        mensaje += `✅ ${item.cantidad}x ${nombre} ($${item.precio * item.cantidad})%0A`;
    }
    mensaje += "%0A*Total a pagar: $" + totalPrecio + "*";
    
    // --- IMPORTANTE: REEMPLAZA ESTE TEXTO POR TU NÚMERO DE WHATSAPP ---
    // Coloca tu número de 10 dígitos conservando el 52 de México. Ejemplo: "522221234567"
    let numeroWhatsApp = "525649314335"; 
    
    window.open("https://wa.me/" + numeroWhatsApp + "?text=" + mensaje, "_blank");
}