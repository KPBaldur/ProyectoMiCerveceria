

<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header('Location: error.php');
}
// Recuperar los datos enviados por POST
$nombre = $_POST['nombre'];
$precio = $_POST['precio'];
$descripcion = $_POST['descripcion'];

// Conectar a la base de datos
$conexion = new mysqli('localhost', 'root', '123456789', 'minicerveceria');

// Verificar si se pudo conectar
if ($conexion->connect_error) {
	die('Error de conexión: ' . $conexion->connect_error);
}

// Preparar la consulta SQL y ejecutarla
$sql = "INSERT INTO productos ( nombre, precio, descripcion) VALUES ('$nombre', '$precio', '$descripcion')";
if ($conexion->query($sql) === true) {
	echo 'Producto agregado correctamente';
} else {
	echo 'Error al agregar el producto: ' . $conexion->error;
}

// Cerrar la conexión
$conexion->close();
?>