// Obtén una referencia al formulario HTML que contiene los datos
const formulario = document.getElementById('post-form'); // Reemplaza con el ID de tu formulario

// Obtén los valores de los campos del formulario
const description_data = document.getElementById('text').value; // Reemplaza con el ID de tu campo 1

console.log(description_data);
const image_data = document.getElementById('image-upload').value; // Reemplaza con el ID de tu campo 1


  // Obtén los datos del formulario
  // const formData = new FormData(formulario);

// Crea un objeto dtoData con los valores del formulario
const dtoData = {
    descripcion: description_data,
    idUser: 17,
  // Agrega los campos del DTO aquí
};

// Agrega el objeto JSON (DTO) al FormData con la clave "info"
  formData.append('info', JSON.stringify(dtoData));

  formData.append('image', image_data);

  console.log(formData.get('info'));

// Escucha el evento de envío del formulario
// formulario.addEventListener('submit', function (event) {
//   event.preventDefault(); // Evita el envío del formulario por defecto

//   console.log(formData.get('info'));

//   // Realiza la solicitud POST
//   fetch('http://localhost:8080/api/publicaciones', {
//     method: 'POST',
//     body: formData,
//     // mode: 'no-cors',
//     headers: {
//       // Asegúrate de incluir esta cabecera para indicar que estás enviando datos multipart/form-data
//       'Content-Type': 'multipart/form-data',
//     },
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('La solicitud no pudo completarse con éxito');
//       }
//       return response.json();
//     })
//     .then(data => {
//         console.log("1ero")
//       console.log('Respuesta del servidor:', data);
//       // Hacer algo con la respuesta del servidor
//     })
//     .catch(error => {
//       console.error('Error al enviar la solicitud:', error);
//     });
// });



let formdata = new FormData(formulario);
formdata.append("info", "{\n  \"descripcion\" : \"nueva publi\",\n  \"idUser\" : 17\n}");
formdata.append("image", image_data);

console.log(formdata.get('image'));

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};


formulario.addEventListener('submit', function (event) {

  fetch("http://localhost:8080/api/publicaciones", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

});