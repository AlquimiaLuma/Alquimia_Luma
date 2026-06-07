let carrito = {}; 
let totalPrecio = 0;
let totalArticulos = 0;

fetch('productos.json')
    .then(respuesta => respuesta.json())
    .then(datos => {
        let contenedor = document.getElementById("contenedor-catalogo");
        contenedor.innerHTML = ""; 
        
        datos.forEach(producto => {
            let esAgotado = producto.stock <= 0 ? "agotado" : "";
            let botonHTML = producto.stock > 0 
                ? `<button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Comprar ahora</button>`
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
        carrito[nombre] = { precio: precio, cantidad: 1 };
    }
    totalPrecio += precio;
    totalArticulos += 1;
    document.getElementById("contador").innerText = totalArticulos;
    alert("🌙 ¡Agregaste " + nombre + " a tu pedido!");
}

function abrirCarrito() {
    let divLista = document.getElementById("lista-carrito");
    divLista.innerHTML = ""; 
    if (totalArticulos === 0) {
        divLista.innerHTML = "<p>Aún no has agregado ninguna esencia mágica.</p>";
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

    let mensaje = "🌙 ¡Hola! Quiero hacer un pedido mágico desde la página de Alqimia Luma:%0A%0A";
    for (let nombre in carrito) {
        let item = carrito[nombre];
        mensaje += `✨ ${item.cantidad}x ${nombre} ($${item.precio * item.cantidad})%0A`;
    }
    mensaje += "%0A*Total a pagar: $" + totalPrecio + "*";
    
    // Configurado con la lada +52 para México y el número correcto
    let numeroWhatsApp = "525649314335"; 
    
    window.open("https://wa.me/" + numeroWhatsApp + "?text=" + mensaje, "_blank");
}