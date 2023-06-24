let productos = [];

function agregarProducto() {
  const nombreInput = document.getElementById("nombre");
  const precioInput = document.getElementById("precio");
  const descripcionInput = document.getElementById("descripcion");
  
  const nombre = nombreInput.value;
  const precio = parseFloat(precioInput.value);
  const descripcion = descripcionInput.value;
  
  if (nombre.trim() === "" || isNaN(precio) || descripcion.trim() === "") {
    alert("Por favor ingrese todos los campos");
    return;
  }
  
  const producto = { nombre, precio, descripcion };
  productos.push(producto);
  
  mostrarProductos();
  
  nombreInput.value = "";
  precioInput.value = "";
  descripcionInput.value = "";
}

function mostrarProductos() {
  const tablaProductos = document.getElementById("tabla-productos");
  
  // Limpiar tabla productos
  tablaProductos.innerHTML = "";
  
  // Recorrer lista de productos y agregar filas a la tabla
  productos.forEach(producto => {
    const fila = document.createElement("tr");
    
    const celdaNombre = document.createElement("td");
    celdaNombre.innerText = producto.nombre;
    
    const celdaPrecio = document.createElement("td");
    celdaPrecio.innerText = `$${producto.precio}`;
    
    const celdaDescripcion = document.createElement("td");
    celdaDescripcion.innerText = producto.descripcion;
    
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPrecio);
    fila.appendChild(celdaDescripcion);
    
    tablaProductos.appendChild(fila);
  });
}

// Conexión a SQLite y métodos para manejar la base de datos

// Para conectarse a SQLite, se puede usar la librería "sqlite3"
const sqlite3 = require("sqlite3").verbose();

// Crear una base de datos y una tabla de productos
const db = new sqlite3.Database("mi-tienda.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Conexión a SQLite exitosa");
    
    db.run(`CREATE TABLE productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      precio REAL,
      descripcion TEXT
    )`, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Tabla productos creada");
      }
    });
  }
});

// Insertar un producto en la base de datos
function insertarProducto(producto) {
  db.run(`INSERT INTO productos (nombre, precio, descripcion)
    VALUES (?, ?, ?)`, [producto.nombre, producto.precio, producto.descripcion], (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Producto ${producto.nombre} insertado en la base de datos`);
      }
    });
}

// Obtener todos los productos de la base de datos y agregarlos a la lista de productos
function obtenerProductos() {
  db.all("SELECT * FROM productos", (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      productos = rows;
      mostrarProductos();
    }
  });
}