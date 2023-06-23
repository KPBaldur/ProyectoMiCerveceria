$(document).ready(function() {
	// Manejar el envío del formulario
	$('#form-producto').submit(function(event) {
		event.preventDefault(); // Prevenir el envío por defecto

		// Recuperar los datos del formulario
		var nombre = $('#nombre').val();
		var precio = $('#precio').val();
		var descripcion = $('#descripcion').val();

		// Validar los datos (opcional)

		// Enviar los datos al servidor
		$.ajax({
			url: 'insertar_producto.php', // Aquí debes colocar la ruta correcta de tu archivo PHP
			type: 'POST',
			data: {
				nombre: nombre,
				precio: precio,
				descripcion: descripcion
			},
			success: function(result) {
				// Manejar la respuesta del servidor (opcional)
				console.log(result);
				alert('Producto agregado correctamente');
				$('#form-producto')[0].reset(); // Limpiar el formulario
			},
			error: function() {
				// Manejar errores (opcional)
				alert('Ocurrió un error al agregar el producto');
			}
		});
	});
});