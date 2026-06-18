const userForm = document.getElementById('user-form');
const nameInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const roleInput = document.getElementById('rol');
const userNameInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');
const messageBox = document.getElementById('form-message');
const usersBody = document.getElementById('users-body');
const cancelButton = document.getElementById('cancel-button');

let users = [];
let editUserId = null;

const savedUsers = localStorage.getItem('hospitalUsers');
if (savedUsers) {
    users = JSON.parse(savedUsers);
}

userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    saveUser();
});

cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    resetForm();
});

function saveUser() {
    const nombre = nameInput.value.trim();
    const email = emailInput.value.trim();
    const rol = roleInput.value;
    const usuario = userNameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!nombre || !email || !rol || !usuario || !password) {
        showMessage('Completa todos los campos antes de guardar.', 'error');
        return;
    }

    if (editUserId) {
        users = users.map((user) => {
            if (user.id === editUserId) {
                return { ...user, nombre, email, rol, usuario, password };
            }
            return user;
        });
        showMessage('Usuario actualizado correctamente.', 'success');
    } else {
        if (users.some((user) => user.usuario.toLowerCase() === usuario.toLowerCase())) {
            showMessage('El nombre de usuario ya existe. Elige otro.', 'error');
            return;
        }
        const newUser = {
            id: Date.now().toString(),
            nombre,
            email,
            rol,
            usuario,
            password,
        };
        users.push(newUser);
        showMessage('Usuario creado correctamente.', 'success');
    }

    saveUsers();
    resetForm();
    renderUsers();
}

function renderUsers() {
    usersBody.innerHTML = '';
    if (users.length === 0) {
        usersBody.innerHTML = `<tr><td colspan="6">No hay usuarios guardados.</td></tr>`;
        return;
    }

    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td>${user.rol}</td>
            <td>${user.usuario}</td>
            <td>${'*'.repeat(user.password.length)}</td>
            <td class="actions">
                <button type="button" class="button secondary" onclick="editUser('${user.id}')">Editar</button>
                <button type="button" class="button danger" onclick="deleteUser('${user.id}')">Eliminar</button>
            </td>
        `;
        usersBody.appendChild(row);
    });
}

function editUser(id) {
    const user = users.find((item) => item.id === id);
    if (!user) return;

    editUserId = id;
    nameInput.value = user.nombre;
    emailInput.value = user.email;
    roleInput.value = user.rol;
    userNameInput.value = user.usuario;
    passwordInput.value = user.password;
    showMessage('Edita los datos del usuario y presiona Guardar.', 'success');
}

function deleteUser(id) {
    users = users.filter((user) => user.id !== id);
    saveUsers();
    renderUsers();
    showMessage('Usuario eliminado.', 'success');
}

function saveUsers() {
    localStorage.setItem('hospitalUsers', JSON.stringify(users));
}

function resetForm() {
    editUserId = null;
    userForm.reset();
    messageBox.style.display = 'none';
}

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `message ${type}`;
    messageBox.style.display = 'block';
}

window.editUser = editUser;
window.deleteUser = deleteUser;

renderUsers();
