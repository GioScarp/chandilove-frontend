// Obtén una referencia al formulario HTML que contiene los datos
const formulario = document.getElementById('post-form'); // Reemplaza con el ID de tu formulario

// Obtén los valores de los campos del formulario
const description = document.getElementById('content').value; // Reemplaza con el ID de tu campo 1


// Crea un objeto dtoData con los valores del formulario
const dtoData = {
    descripcion: campo1Valor,
    idUser: campo2Valor,
  // Agrega los campos del DTO aquí
};

// Agrega el objeto JSON (DTO) al FormData con la clave "info"
  formData.append('info', JSON.stringify(dtoData));

// Escucha el evento de envío del formulario
formulario.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita el envío del formulario por defecto

  // Obtén los datos del formulario
  const formData = new FormData(formulario);

  // Realiza la solicitud POST
  fetch('http://localhost:8080/api/publicaciones', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no pudo completarse con éxito');
      }
      return response.json();
    })
    .then(data => {
        console.log("1ero")
      console.log('Respuesta del servidor:', data);
      // Hacer algo con la respuesta del servidor
    })
    .catch(error => {
      console.error('Error al enviar la solicitud:', error);
    });
});