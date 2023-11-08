const $form = document.querySelector('#form')

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

document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;

    const datosUsuario = {
        nombre: nombre,
        apellido: apellido,
        correo: correo
    };

    fetch('/api/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
    })
    .then(response => {
        if (response.status === 201) {
            // El registro se ha creado exitosamente
            alert('Registro exitoso');
            // Puedes redirigir al usuario a una página de confirmación o hacer otras acciones
        } else {
            // Ocurrió un error en el servidor
            alert('Hubo un problema durante el registro');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});