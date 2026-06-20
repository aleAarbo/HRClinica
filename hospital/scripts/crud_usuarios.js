const entradaNombre = document.getElementById('nombre');
const entradaCorreo = document.getElementById('email');
const entradaRol = document.getElementById('rol');
const entradaUsuario = document.getElementById('usuario');
const entradaContrasenia = document.getElementById('password');
const cuadroMensaje = document.getElementById('form-message');
const cuerpoUsuarios = document.getElementById('users-body');
const botonCancelar = document.getElementById('cancel-button');
const formularioUsuario = document.getElementById('user-form');

let usuarios = [];
let identificadorUsuarioEditar = null;

const usuariosGuardados = localStorage.getItem('hospitalUsuarios');
if (usuariosGuardados) {
    usuarios = JSON.parse(usuariosGuardados);
}

formularioUsuario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    guardarUsuario();
});

botonCancelar.addEventListener('click', function (evento) {
    evento.preventDefault();
    reiniciarFormulario();
});

function guardarUsuario() {
    const nombre = entradaNombre.value.trim();
    const correo = entradaCorreo.value.trim();
    const rol = entradaRol.value;
    const usuario = entradaUsuario.value.trim();
    const contrasenia = entradaContrasenia.value.trim();

    if (!nombre || !correo || !rol || !usuario || !contrasenia) {
        mostrarMensaje('Completa todos los campos antes de guardar.', 'error');
        return;
    }

    if (identificadorUsuarioEditar) {
        usuarios = usuarios.map(function (usuarioGuardado) {
            if (usuarioGuardado.identificador === identificadorUsuarioEditar) {
                return { ...usuarioGuardado, nombre: nombre, correo: correo, rol: rol, usuario: usuario, contrasenia: contrasenia };
            }
            return usuarioGuardado;
        });
        mostrarMensaje('Usuario actualizado correctamente.', 'success');
    } else {
        if (usuarios.some(function (usuarioGuardado) { return usuarioGuardado.usuario.toLowerCase() === usuario.toLowerCase(); })) {
            mostrarMensaje('El nombre de usuario ya existe. Elige otro.', 'error');
            return;
        }

        var usuarioNuevo = {
            identificador: Date.now().toString(),
            nombre: nombre,
            correo: correo,
            rol: rol,
            usuario: usuario,
            contrasenia: contrasenia,
        };
        usuarios.push(usuarioNuevo);
        mostrarMensaje('Usuario creado correctamente.', 'success');
    }

    guardarUsuarios();
    reiniciarFormulario();
    mostrarUsuarios();
}

function mostrarUsuarios() {
    cuerpoUsuarios.innerHTML = '';
    if (usuarios.length === 0) {
        cuerpoUsuarios.innerHTML = '<tr><td colspan="6">No hay usuarios guardados.</td></tr>';
        return;
    }

    usuarios.forEach(function (usuarioItem) {
        var fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuarioItem.nombre}</td>
            <td>${usuarioItem.correo}</td>
            <td>${usuarioItem.rol}</td>
            <td>${usuarioItem.usuario}</td>
            <td>${'*'.repeat(usuarioItem.contrasenia.length)}</td>
            <td class="actions">
                <button type="button" class="button secondary" onclick="editarUsuario('${usuarioItem.identificador}')">Editar</button>
                <button type="button" class="button danger" onclick="eliminarUsuario('${usuarioItem.identificador}')">Eliminar</button>
            </td>
        `;
        cuerpoUsuarios.appendChild(fila);
    });
}

function editarUsuario(identificadorUsuario) {
    var usuarioItem = usuarios.find(function (usuarioGuardado) { return usuarioGuardado.identificador === identificadorUsuario; });
    if (!usuarioItem) return;

    identificadorUsuarioEditar = identificadorUsuario;
    entradaNombre.value = usuarioItem.nombre;
    entradaCorreo.value = usuarioItem.correo;
    entradaRol.value = usuarioItem.rol;
    entradaUsuario.value = usuarioItem.usuario;
    entradaContrasenia.value = usuarioItem.contrasenia;
    mostrarMensaje('Edita los datos del usuario y presiona Guardar.', 'success');
}

function eliminarUsuario(identificadorUsuario) {
    usuarios = usuarios.filter(function (usuarioGuardado) { return usuarioGuardado.identificador !== identificadorUsuario; });
    guardarUsuarios();
    mostrarUsuarios();
    mostrarMensaje('Usuario eliminado.', 'success');
}

function guardarUsuarios() {
    localStorage.setItem('hospitalUsuarios', JSON.stringify(usuarios));
}

function reiniciarFormulario() {
    identificadorUsuarioEditar = null;
    formularioUsuario.reset();
    cuadroMensaje.style.display = 'none';
}

function mostrarMensaje(texto, tipo) {
    cuadroMensaje.textContent = texto;
    cuadroMensaje.className = 'message ' + tipo;
    cuadroMensaje.style.display = 'block';
}

window.editarUsuario = editarUsuario;
window.eliminarUsuario = eliminarUsuario;

mostrarUsuarios();
