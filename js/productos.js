window.onload = function() {
    
    const contenedorCards = document.querySelector("#contenedorCards");

    let catalogoStorage = JSON.parse(sessionStorage.getItem("catalogo"));

    for( const producto of catalogoStorage ){
        let item = document.createElement("div");
        item.innerHTML = `<div class="card my-3">
                                <div class="card-body">
                                    <h5 class="card-title">Nombre: ${producto.nombre}</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">Precio: ${producto.precio}</h6>
                                    <p class="card-text">Cantidad: ${producto.cantidad}</p>
                                </div>
                            </div>`;
        contenedorCards.appendChild(item);
    }

    
};