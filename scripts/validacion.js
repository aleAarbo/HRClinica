const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const nacimiento = document.querySelector('#nacimiento');
const aceptar = document.getElementById('aceptar');
const edadCalculada = document.getElementById('edad');

nacimiento.addEventListener('blur', function (evento) {
    evento.preventDefault();

    const direccionPeticion = 'https://timeapi.io/api/Time/current/zone?timeZone=America/Montevideo';

    fetch(direccionPeticion)
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error(`Error en la petición: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then(function (datos) {
            const fechaHoraActual = datos.dateTime;
            const fechaActual = new Date(fechaHoraActual);
            let fechaNacimiento = new Date(nacimiento.value);

            let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
            let difMeses = fechaActual.getMonth() - fechaNacimiento.getMonth();

            if (difMeses < 0 || (difMeses === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
                edad--;
            }

            edadCalculada.value = edad;
        })
        .catch(function (error) {
            alert(`Hubo un problema al consultar la API: ${error.message}`);
        });
});
