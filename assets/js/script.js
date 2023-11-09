const $form = document.querySelector('#form');
const botonIniciarSesion = document.getElementById('boton-iniciar-sesion');

$form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(this)
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            'Accept': 'application/json'
        }
    })
    if (response.ok){
        this.reset()
        alert('Gracias por contactarnos, estamos trabajando para darte respuesta lo más pronto posible <3')
    }
}


document.getElementById('login-button').addEventListener('click', function() {
    // Obtener los valores de correo electrónico y contraseña del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Crear un objeto con los datos del formulario
    const formData = {
        email: email,
        password: password,
    };

    // Realizar una solicitud POST al endpoint
    fetch('http://localhost:8080/api/usuario/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error en la solicitud');
        }
    })
    .then((data) => {
        // Manejar la respuesta exitosa aquí

        // Guardar la información de inicio de sesión en el localStorage
        localStorage.setItem('usuario', JSON.stringify(data));

        // Redirigir a la página de inicio
        window.location.href = '/src/feed/feed.html';
    })
    .catch((error) => {
        console.error('Error:', error);
        // Manejar el error (por ejemplo, mostrar un mensaje de error al usuario)
        Swal.fire({
            title: "Error",
            text: "Error en el inicio de sesión.  Por favor, inténtalo de nuevo.",
            icon: "error"
        });
    });
}); 



// headers: {
//     "Content-Type": "multipart/form-data",
//     
// },

// DATOS REGISTRO
document.getElementById("registrar-persona-button").addEventListener("click", function (e) {
    e.preventDefault();

    // Obtener los valores del formulario de Registro
    const nombreUsuario = document.getElementById("nombre-usuario").value;
    const email = document.getElementById("email1").value;
    const contrasena = document.getElementById("contrasena").value;
    const biografia = document.getElementById("biografia").value;
    const ciudad = document.getElementById("ciudad").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
    const fotoPerfilInput = document.getElementById("foto_perfil");

    // Crear un objeto FormData
    const formData = new FormData();

    // Agregar campos de texto al FormData
    formData.append("nombreUsuario", nombreUsuario);
    formData.append("email", email);
    formData.append("password", contrasena);
    formData.append("biografía", biografia);
    formData.append("ciudad", ciudad);
    formData.append("typeUser", 2);
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("fechaNacimiento", fechaNacimiento);
    formData.append("gender", "FEMENINO");

    // Agregar archivo de imagen al FormData
    formData.append("imagen", fotoPerfilInput.files[0]);

    // Realizar una solicitud 'POST' al endpoint de registro
    fetch("http://localhost:8080/api/usuario/registro", {
        method: "POST",
        body: formData,
        headers:{
            "Content-Type": "multipart/form-data",
        },
        mode: 'no-cors',
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error en la solicitud');
        }
    })
    .then((data) => {
        // Manejar la respuesta del servidor después del registro
        console.log("Usuario registrado:", data);
    })
    .catch((error) => {
        // Manejar los errores, por ejemplo, mostrando un mensaje de error
        console.error("Error al registrar usuario", error);
    });
});