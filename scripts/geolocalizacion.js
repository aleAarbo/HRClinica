// geolocalizacion.js - código simple para principiantes
// Este archivo contiene la lógica para inicializar el mapa
// y buscar una dirección usando OpenStreetMap.

var mapa; // variable global para el mapa
var marcador; // marcador en el mapa

function iniciarMapa() {
  var centro = [-34.397, 150.644];
  mapa = L.map('map').setView(centro, 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(mapa);

  var entrada = document.getElementById('direccionInput');
  if (entrada) {
    entrada.addEventListener('keypress', function (evento) {
      if (evento.key === 'Enter') {
        evento.preventDefault();
        buscarUbicacion();
      }
    });
  }
}

function buscarUbicacion() {
  var entrada = document.getElementById('direccionInput');
  if (!entrada) {
    alert('No se encontró el campo de dirección.');
    return;
  }

  var direccion = entrada.value.trim();
  if (!direccion) {
    alert('Por favor ingresa una dirección.');
    return;
  }

  var direccionBusqueda = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(direccion);

  fetch(direccionBusqueda)
    .then(function (respuesta) {
      if (!respuesta.ok) throw new Error('Respuesta del servidor no válida');
      return respuesta.json();
    })
    .then(function (datos) {
      if (datos && datos.length > 0) {
        var primerResultado = datos[0];
        var posicion = [parseFloat(primerResultado.lat), parseFloat(primerResultado.lon)];

        mapa.setView(posicion, 15);

        if (marcador) {
          marcador.setLatLng(posicion);
        } else {
          marcador = L.marker(posicion).addTo(mapa);
        }

        marcador.bindPopup('Ubicación de ' + direccion).openPopup();
      } else {
        alert('No se encontró la dirección.');
      }
    })
    .catch(function (error) {
      console.error('Error al buscar ubicación:', error);
      alert('Ocurrió un error. Revisa la consola.');
    });
}

window.buscarUbicacion = buscarUbicacion;
window.addEventListener('load', iniciarMapa);
