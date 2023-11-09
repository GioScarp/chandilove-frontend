


    // fetch('http://localhost:8080/api/usuario/2') // Reemplaza 'URL_del_endpoint_en_java' con la URL real de tu endpoint
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('La solicitud no pudo completarse con éxito');
    //   }
    //   return response.json(); // Parsea la respuesta JSON
    // })
    // .then(data => {
    //   // Los datos JSON están disponibles aquí
    //   console.log('Datos obtenidos:', data);
  
    //   // Puedes realizar cualquier otra operación con los datos aquí, como mostrarlos en la página web.
    // })
    // .catch(error => {
    //   console.error('Error al obtener los datos:', error);
    // });




function mifunc(){
fetch('http://localhost:8080/api/publicaciones/4')
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud no pudo completarse con éxito');
    }
    return response.json(); // Utiliza .arrayBuffer() para obtener los datos binarios
  })
  .then(data => {

    // console.log(data.idUser);
    // console.log(data.imagen);

    const blob = base64ToBlob(data.imagen, "image/png");

    function base64ToBlob(base64, contentType){
      const binaryStr = window.atob(base64);
      const binaryArray = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i ++){
        binaryArray[i] = binaryStr.charCodeAt(i)
      }

      return new Blob([binaryArray], {type: contentType})
    }

    const urlImagen = URL.createObjectURL(blob);

    // Ahora, 'url' contiene una URL que puedes utilizar para mostrar la imagen en una etiqueta <img> o realizar otras operaciones.
    
    // Ejemplo de cómo mostrar la imagen en una etiqueta <img> en el DOM:
    const imgElement = document.createElement('img');
    imgElement.src = urlImagen;
    document.body.appendChild(imgElement);
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });

}
