const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const nacimiento = document.querySelector('#nacimiento');
const aceptar = document.getElementById('aceptar');
const edad_calculada = document.getElementById('edad');

nacimiento.addEventListener('blur', (event) => {

    event.preventDefault();


    const url = 'https://timeapi.io/api/Time/current/zone?timeZone=America/Montevideo';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const fechaHoraActual = data.dateTime;
            const fechaActual = new Date(fechaHoraActual);
            let fecNac = new Date(nacimiento.value);

            let edad = fechaActual.getFullYear() - fecNac.getFullYear();
            let difmeses = fechaActual.getMonth() - fecNac.getMonth();

            if (difmeses < 0 || (difmeses === 0 && fechaActual.getDate() < fecNac.getDate())) {
                edad--;
            }

            edad_calculada.value = edad;
        })
        .catch(error => {
            alert(`Hubo un problema al consultar la API: ${error.message}`);
        });



})

