// Definición de clase Producto
function Producto( nombre, precio, cantidad, imagen, id) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.imagen = imagen;
    this.id = id;
}

const cargarProducto = () => {

    // recupero el catálogo del storage
    let catalogo = JSON.parse(sessionStorage.getItem( "catalogo" ));
    if( catalogo == null ) { catalogo = []; }
    
    let nombreProducto = document.querySelector( "#nombre" ).value;
    let precioProducto = document.querySelector( "#precio" ).value;
    let cantidadProducto = document.querySelector( "#cantidad" ).value;
    let imagenProducto = document.querySelector( "#imagen" ).value;
    
    if( nombreProducto && precioProducto  && cantidadProducto && ( imagenProducto != "" ) ) {
        p = new Producto( nombreProducto, precioProducto, cantidadProducto, selectImagen( imagenProducto ), catalogo.length+1 );
        catalogo.push( p );
    
        sessionStorage.setItem( "catalogo", JSON.stringify( catalogo ) );
        
        // limpio los mensajes
        borrarMensajes();

        Swal.fire(
            '¡Carga exitosa!',
            `Se cargó el producto <b>${nombreProducto}</b>`,
            'success'
        )
    } else {
        document.querySelector("#validacion").innerHTML = "Complete todos los campos";
    }
}

const mostrarCarga = () => {
    borrarMensajes();
    // muestro los campos a completar
    const inputsAlta = document.querySelector( "#inputsAlta" );
    inputsAlta.style.display = "";
}

const inicializarCatalogo = () => {
    borrarMensajes();

    Swal.fire({
        title: 'Desea cargar el catálogo?',
        text: "Se borrara el catálogo actual",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cargar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            async function fetchApi() {
                const response = await fetch("./data/datos.json");
                const data = await response.json();
                sessionStorage.setItem( "catalogo", JSON.stringify( data ) );
                Swal.fire(
                    '¡Se inicializó el catálogo<br>por defecto!',
                    `Se cargaron ${data.length} productos`,
                    'success'
                )
            }
            fetchApi();
        }
    })
}

const borrarMensajes = () => {
    document.querySelector( "#inputsAlta" ).style.display = "none";
    document.querySelector( "#mensaje" ).textContent = "";
}

const selectImagen = ( nombreImagen ) => {
    let path = "";
    switch (nombreImagen) {
        case 'lija':
            path = "./images/lijas.png"
            break;
        case 'cinta':
            path = "./images/cinta.png"
            break;
        default:
            path = "./images/no-disponible.png"
      }
    return path;
}

function mostrarPendiente() {
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Página en construcción',
        showConfirmButton: false,
        timer: 1800
    })
}