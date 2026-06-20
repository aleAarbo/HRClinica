const formulario = document.querySelector('form');
const entradaContrasenia = document.getElementById('contrasenia');

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const patron = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}/;

    if (patron.test(entradaContrasenia.value)) {
        alert('exacto');
    } else {
        alert('incorrecto');
    }
});
