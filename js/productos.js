const catalogoStorage = JSON.parse(sessionStorage.getItem("catalogo"));

window.onload = () => renderCatalogo(catalogoStorage);

renderCatalogo = (catalogoStorage, filtro) => {

    const contenedorCards = document.querySelector("#contenedorCards");
    contenedorCards.innerHTML = "";

    if( catalogoStorage ) {
        for( const producto of catalogoStorage ){
            if( filtro == null || producto.nombre.includes( filtro ) ){
                let item = document.createElement("div");
                item.innerHTML =    `<div class="card producto">
                                    <img class="card-img-top" src="${producto.imagen}" alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Precio: $ ${producto.precio}</h6>
                                        <p class="card-text">Stock: ${producto.cantidad}</p>
                                        <a href="#" class="btn btn-primary" onclick="editarProducto(${producto.id})">Editar artículo</a>
                                    </div>
                                    </div>`;
                item.classList.add( "my-4","col-12","col-lg-3","col-md-4","col-sm-6" );
                contenedorCards.appendChild( item );
            }
        }
    } else {
        Swal.fire(
            '¡No hay catálogo para mostrar!',
            'Prueba cargar productos en la home',
            'error'
        )
    }

}

document.querySelector( "#formulario__input" ).addEventListener( "keyup",() =>{
    valor = document.querySelector( "#formulario__input") .value;
    renderCatalogo( catalogoStorage, valor );
})

const editarProducto = ( id ) => {
    Swal.fire({
        title: 'Ingrese nuevo stock',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Actualizar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Exito',
            'Eñ stock ha sido actualizado.',
            'success'
            )
            actualizarStock( id, result.value );
        }
    })
}

const actualizarStock = ( id, valor ) => {

    const isId = (element) => element.id == id;
    let idx = catalogoStorage.findIndex(isId);
    catalogoStorage[idx].cantidad = valor;
    renderCatalogo(catalogoStorage);
    
}