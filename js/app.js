//Definición de clase Producto
function Producto( nombre, precio, cantidad ) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
}

//Catálogo por defecto
const catalogoInicial = [
    {nombre: "lija 60", precio: 90, cantidad: 500},
    {nombre: "lija 80", precio: 90, cantidad: 400},
    {nombre: "lija 100", precio: 90, cantidad: 200},
    {nombre: "lija 120", precio: 90, cantidad: 400},
    {nombre: "lija 150", precio: 90, cantidad: 300},
    {nombre: "lija 180", precio: 90, cantidad: 300},
    {nombre: "cinta enmascarar 40mts x 18 mm", precio: 190, cantidad: 100},
    {nombre: "cinta enmascarar 40mts x 24 mm", precio: 250, cantidad: 100},
    {nombre: "cinta enmascarar 40mts x 36 mm", precio: 360, cantidad: 100},
];


const cargarProducto = () => {
    //limpio los mensajes
    borrarMensajes();

    //recupero el catálogo del storage
    let catalogo = JSON.parse(sessionStorage.getItem( "catalogo" ));
    if(catalogo == null) { catalogo = []; }
    
    let nombreProducto = document.querySelector( "#nombre" ).value;
    let precioProducto = document.querySelector( "#precio" ).value;
    let cantidadProducto = document.querySelector( "#cantidad" ).value;

    p = new Producto( nombreProducto, precioProducto, cantidadProducto );
    catalogo.push( p );

    sessionStorage.setItem( "catalogo", JSON.stringify( catalogo ) );

    document.querySelector( "#mensaje" ).textContent = `Se agregó el producto: ${nombreProducto} con un precio de: ${precioProducto} y un stock de: ${cantidadProducto} unidades`;
}

const mostrarCarga = () => {
    borrarMensajes();

    //muestro los campos a completar
    const inputsAlta = document.querySelector( "#inputsAlta" );
    inputsAlta.style.display = "";
}

const imprimirCatalogo = () => {
    borrarMensajes();

    let catalogoStorage = JSON.parse( sessionStorage.getItem( "catalogo" ) );
    document.querySelector( "#mensaje" ).textContent = "Imprimiendo catálogo";
    
    const lista = document.querySelector( "#lista" );

    for( const producto of catalogoStorage ){
        let item = document.createElement( "li" );
        item.textContent = `Producto: ${producto.nombre} - Precio: ${producto.precio} - Cantidad: ${producto.cantidad}`;
        lista.appendChild( item );
    }

    catalogoDiv.appendChild(lista);

}

const buscarProducto = () => {
    borrarMensajes();

    document.querySelector( "#mensaje" ).textContent = "Buscando producto:";

    let catalogoStorage = JSON.parse(sessionStorage.getItem( "catalogo" ));
    let itemText;

    const busquedaField = document.querySelector( "#busqueda" );
    const busqueda = busquedaField.value;
    
    if( busqueda != "" ){
        let encontrado = catalogoStorage.find( el => el.nombre.includes( busqueda ) );
        itemText = encontrado != undefined ?  `Producto: ${encontrado.nombre} - Precio: ${encontrado.precio} - Cantidad: ${encontrado.cantidad}` : "no se encontró";
        busquedaField.value = "";
    } else {
        itemText = "No se ingresó producto";
    }

    let item = document.createElement( "li" );
    item.textContent = itemText;
    document.querySelector( "#lista" ).appendChild(item);
}

const inicializarCatalogo = () => {
    borrarMensajes();

    sessionStorage.setItem( "catalogo", JSON.stringify( catalogoInicial ) );
    document.querySelector( "#mensaje" ).textContent = "Se inicializó el catálogo por defecto";
}

const borrarMensajes = () => {
    document.querySelector( "#inputsAlta" ).style.display = "none";
    document.querySelector( "#mensaje" ).textContent = "";
    document.querySelector( "#lista" ).innerHTML = "";
}

document.querySelector( "#btnGuardar" ).addEventListener( "click", ( e ) => {
    e.preventDefault();
    cargarProducto();
});