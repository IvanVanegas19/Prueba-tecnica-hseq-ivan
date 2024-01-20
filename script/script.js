document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario y el contenedor de respuestas
    var form = document.getElementById('form-pt');
    var respuestaContainer = document.getElementById('respuesta');

    // Contador de uso del mismo correo
    var usoCorreoContador = {};

    // Agregar un evento de clic al botón de enviar
    document.getElementById('submit').addEventListener('click', function() {
        // Obtener el correo del formulario
        var correo = document.getElementById('correo').value;

        // Verificar si el correo ha sido utilizado más de 2 veces
        if (usoCorreoContador[correo] && usoCorreoContador[correo] >= 2) {
            respuestaContainer.innerHTML = 'Este correo electrónico ya ha sido utilizado tres veces. Por favor, utiliza otro correo.';
            return;
        }

        // Validar el formulario antes de enviar
        if (validarFormulario()) {
            // Obtener los datos del formulario
            var formData = new FormData(form);

            // Realizar una solicitud AJAX
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'data.php', true);

            // Configurar el manejo de la respuesta
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 400) {
                    // La solicitud fue exitosa, mostrar mensaje de éxito
                    respuestaContainer.innerHTML = '¡Formulario enviado con éxito!';
                    form.reset(); // Limpiar el formulario

                    // Incrementar el contador de uso del correo
                    usoCorreoContador[correo] = (usoCorreoContador[correo] || 0) + 1;
                } else {
                    // La solicitud no fue exitosa, mostrar mensaje de error
                    respuestaContainer.innerHTML = 'Error al enviar el formulario. Inténtalo de nuevo.';
                }
            };

            // Enviar la solicitud con los datos del formulario
            xhr.send(formData);
        } else {
            // Mostrar mensaje de error de validación
            respuestaContainer.innerHTML = 'Por favor, completa todos los campos correctamente.';
        }
    });

    // Función para validar el formulario
    function validarFormulario() {
        var nombre = document.getElementById('nombre').value;
        var correo = document.getElementById('correo').value;
        var mensaje = document.getElementById('mensaje').value;

        // Validar que los campos no estén vacíos y que el correo tenga formato correcto
        if (nombre.trim() === '' || correo.trim() === '' || mensaje.trim() === '') {
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            return false;
        }

        return true;
    }
});