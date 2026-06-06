let carrito = {}; let total = 0;
fetch('productos.json').then(r => r.json()).then(datos => {
    let cont = document.getElementById("contenedor-catalogo");
    datos.forEach(p => {
        cont.innerHTML += `<div class="tarjeta ${p.stock <= 0 ? 'agotado' : ''}">
            <h2>${p.nombre}</h2>
            <p>$${p.precio}</p>
            <button onclick="alert('Pedido en camino!')">Comprar</button>
        </div>`;
    });
});