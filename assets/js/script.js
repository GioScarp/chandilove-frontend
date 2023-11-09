const $form = document.querySelector('#form');
const formulario = document.getElementById('formulario');
const mensaje = document.getElementById('mensaje');
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




formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma convencional

    const url = 'http://localhost:8080/api/usuario/login'; // URL de inicio de sesión
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    const datosUsuario = {
      usuario: usuario,
      contrasena: contrasena
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosUsuario)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo iniciar sesión');
        }
        return response.json();
      })
      .then(data => {
        // Manejar la respuesta del servidor, por ejemplo, guardar un token de autenticación
        const token = data.token;
        mensaje.textContent = 'Inicio de sesión exitoso. Token: ' + token;
      })
      .catch(error => {
        // Manejar errores
        mensaje.textContent = 'Error al iniciar sesión: ' + error.message;
      });
  });