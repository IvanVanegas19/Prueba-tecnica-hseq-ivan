<?php
// Recibir datos del formulario
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$correo = isset($_POST['correo']) ? $_POST['correo'] : '';
$mensaje = isset($_POST['mensaje']) ? $_POST['mensaje'] : '';

// Validar los datos
if (empty($nombre) || empty($correo) || empty($mensaje) || !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    // Mostrar mensaje de error si los datos no son válidos
    echo 'Error: Por favor, completa todos los campos correctamente.';
} else {
    // Utilizar los valores de conexión definidos en el JavaScript
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "prueba_tecnica_ivan";

    // Conectar a la base de datos
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Preparar la consulta SQL para insertar los datos en la base de datos
    $stmt = $conn->prepare('INSERT INTO formulario_datos (nombre, correo, mensaje) VALUES (?, ?, ?)');
    $stmt->bind_param('sss', $nombre, $correo, $mensaje);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Mostrar mensaje de éxito
        echo '¡Formulario enviado con éxito!';
    } else {
        // Mostrar mensaje de error si la consulta no se ejecuta correctamente
        echo 'Error al enviar el formulario. Inténtalo de nuevo.';
    }

    // Cerrar la conexión y liberar recursos
    $stmt->close();
    $conn->close();
}
?>