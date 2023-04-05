//Definición de clase Producto
function Producto( nombre, precio, cantidad ) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
}

const catalogo = [
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

const cargarProductos = () => {

    let acumPrecio = 0;
    let acumCantidad = 0;
    let cantidadProductos = 0;
    const salida = 'SALIR';

    let nombreProducto = '';
    let cantidadProducto;
    let precioProducto;

    alert( "Comenzando la carga de productos de la tienda..." );

    while( nombreProducto != salida ){
    
        nombreProducto = prompt( "Ingrese el nombre del producto o " + salida + " para terminar" );
        
        if(nombreProducto != salida){
            precioProducto = parseInt( prompt( 'Ingrese el precio del producto' ) );
            cantidadProducto = parseInt( prompt( 'Ingrese la cantidad del producto' ) );

            p = new Producto( nombreProducto, precioProducto, cantidadProducto );
            catalogo.push( p );

            acumPrecio += precioProducto;
            acumCantidad += cantidadProducto;

            cantidadProductos++;
        }

    }

    if( cantidadProductos == 0 ){
        alert( "No se ingresaron productos para procesar" );
    } else {
        let promPrecio = calcularPromedio( acumPrecio, cantidadProductos );
        let promCantidades = calcularPromedio( acumCantidad, cantidadProductos );
        alert( "Se procesaron " + cantidadProductos + " con un promedio de precio de " + promPrecio + " y el promedio de cantidades fue " + promCantidades );
    }

    despedirse();
}

const calcularPromedio = ( acumulado, cantidad ) => { return acumulado / cantidad; }

const despedirse = () => { alert( "Hasta luego" ); }

const imprimirCatalogo = () => {
    for( const producto of catalogo ){
        console.log( producto.nombre );
    }
}

const buscarProducto = () => {
    let busqueda = prompt( "Ingrese producto a buscar:" );
    if( busqueda != "" ){
        let encontrado = catalogo.find( el => el.nombre.includes( busqueda ) );
        alert ( encontrado != undefined ? encontrado.nombre : "no se encontró" );
    } else {
        alert( "No se ingresó producto" );
    }
}

//cargarProductos();
//imprimirCatalogo();
//buscarProducto();
