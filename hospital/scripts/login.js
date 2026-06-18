const loginForm = document.getElementById('login-form');
const userInput = document.getElementById('usuario');
const passInput = document.getElementById('contrasenia');
const messageBox = document.getElementById('login-message');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = userInput.value.trim();
    const pass = passInput.value.trim();

    if (!user || !pass) {
        showMessage('Completa todos los campos para ingresar.', 'error');
        return;
    }

    if (user === 'ale' && pass === 'ale') {
        window.location.href = 'pages/registrar_usuario.html';
        return;
    }

    showMessage('Usuario o contraseña incorrectos.', 'error');
});

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `message ${type}`;
    messageBox.style.display = 'block';
}
