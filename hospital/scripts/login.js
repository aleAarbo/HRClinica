const formularioInicio = document.getElementById('login-form');
const entradaUsuario = document.getElementById('usuario');
const entradaContrasenia = document.getElementById('contrasenia');
const cajaMensaje = document.getElementById('login-message');

formularioInicio.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const usuario = entradaUsuario.value.trim();
    const contrasenia = entradaContrasenia.value.trim();

    if (!usuario || !contrasenia) {
        mostrarMensaje('Completa todos los campos para ingresar.', 'error');
        return;
    }

    if (usuario === 'ale' && contrasenia === 'ale') {
        window.location.href = 'pages/registrar_usuario.html';
        return;
    }

    mostrarMensaje('Usuario o contraseña incorrectos.', 'error');
});

function mostrarMensaje(texto, tipo) {
    cajaMensaje.textContent = texto;
    cajaMensaje.className = `message ${tipo}`;
    cajaMensaje.style.display = 'block';
}
