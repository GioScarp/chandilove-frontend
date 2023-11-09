const fotoPerfil1 = document.getElementById("nav_foto_perfil");
const fotoPerfil2 = document.getElementById("foto_perfil");
const profileInfo = document.querySelector('.profile-info');
const description = document.querySelector('.description');
const navNombre = document.getElementById("nav_nombre");
const username = document.querySelector('.text-muted');
const numPublicaciones = document.getElementById("numero_publicaciones");


function base64ToBlob(base64, contentType) {
    const binaryArray = new Uint8Array(
      Uint8Array.from(atob(base64), c => c.charCodeAt(0))
    );
    return new Blob([binaryArray], { type: contentType });
  }

fetch('http://localhost:8080/api/persona/2')
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud no pudo completarse con éxito');
    }
    return response.json(); 
  })
  .then(data => {

    // console.log(data.idUser);
    // console.log(data.imagen);

    const blob = base64ToBlob(data.fotoPerfil, "image/png");

    const urlImagen = URL.createObjectURL(blob);
    fotoPerfil1.src = urlImagen;
    fotoPerfil2.src = urlImagen;

    // Obtén los datos del servidor
    const nombre = data.nombre;
    const apellido = data.apellido;

    navNombre.innerHTML = `${nombre}`;
    username.innerHTML = `@${data.nombreUsuario}`;

    // Crea elementos HTML basados en los datos
    const h1 = document.createElement("h1");
    h1.innerHTML = `${nombre} <br><span>${apellido}</span></br>`;

    const button = document.createElement("button");
    button.innerHTML = "<span>Seguir +</span>";

    const biografia = document.createElement("p")
    biografia.innerHTML = `${data.biografia}`;

    // Agrega los elementos creados al elemento padre
    profileInfo.appendChild(h1);
    profileInfo.appendChild(button);
    description.appendChild(biografia);



  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });




// /**
//  * Fetches images from the Unsplash API based on a predefined query and renders them as posts in an HTML container.
//  *
//  * @param {string} containerId - The ID of the HTML container where the image posts will be rendered.
//  * @returns {Promise} A promise that resolves when the images have been fetched and rendered.
//  */
// function renderPost(containerId) {
//     // Define endpoints and queries
//     const endPoint = "https://api.unsplash.com/search/photos";
//     const clientId = "7DtjXncAiKf5JFGHnAfn5ERz_8XdxWGxViYQ49TTSgc";
//     const query = "perros y gatos";
//     const page = 1;
//     const size = 10;
//     const requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };

//     let postsContent = "";

//     // Make the HTTP request, interpolación de variables
//     return fetch(`${endPoint}?client_id=${clientId}&query=${query}&page=${page}&per_page=${size}`, requestOptions)
//         .then(response => response.json()) // Convert the response to JSON
//         .then(data => {
//             // Process the data in JSON format
//             data.results.forEach(result => {
//                 // Loop through the results using forEach
//                 postsContent += templatePost(result.urls.raw);
//             });

//             // Render the posts in the specified container
//             document.getElementById(containerId).innerHTML = postsContent;
//         })
//         .catch(error => {
//             console.log('Error:', error);
//             throw error; // Propagate the error if necessary
//         });
// }

let postsContent = "";
fetch('http://localhost:8080/api/publicaciones/usuario/17')
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud no pudo completarse con éxito');
    }
    return response.json(); // Utiliza .arrayBuffer() para obtener los datos binarios
  })
  .then(data => {

    numPublicaciones.innerHTML = `${data.content.length} <span>Publicaciones</span>`;

    data.content.forEach(result => {
                // Loop through the results using forEach
                const blob = base64ToBlob(result.imagen, "image/png");
                postsContent += templatePost(URL.createObjectURL(blob));
            });

    document.getElementById('container-posts').innerHTML = postsContent;

  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });




/**
 * Generates an HTML template for a single image post with the specified image URL.
 *
 * @param {string} imgUrl - The URL of the image to be displayed in the post.
 * @returns {string} An HTML string representing a post containing the provided image URL.
 */
function templatePost(imgUrl) {
    const post = `
    <div class="post">
        <img src="${imgUrl}" alt="Post Image">
    </div>
    `;
    return post;
}


// render data
// note: Change this in a future
// renderPost('container-posts');


//PopUp Publicar

// Obtener elementos del DOM
const openFormButton = document.getElementById('open-form');
const closeFormButton = document.getElementById('close-form');
const popupContainer = document.getElementById('popup-container');
const imgInput = document.getElementById('image-upload');
const emojiButton = document.getElementById('emoji-button');
const emojiContainer = document.getElementById('emoji-container');

// Mostrar el formulario emergente al hacer clic en el botón "Publicar"
openFormButton.addEventListener('click', () => {
    popupContainer.style.display = 'flex';
});


// Ocultar el formulario emergente al hacer clic en el botón de cierre
closeFormButton.addEventListener('click', () => {
    // Utilizar SweetAlert en lugar de confirm
    Swal.fire({
        title: '¿Está seguro de cancelar la publicación?',
        text: '¡No podrás deshacer esta acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
        // Si el usuario confirma, cierra el formulario
        if (result.isConfirmed) {
            popupContainer.style.display = 'none';
            emojiContainer.style.display = 'none'; // Ocultar el contenedor de emojis si está abierto
        }
    });
});

imgInput.addEventListener('change', function () {
    const selectedFile = imgInput.files[0];

    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      
      const imagePreview = document.getElementById('post-img-preview');
      imagePreview.innerHTML = ''; // Limpia el contenedor si ya hay una imagen previa
      
      const img = document.createElement('img');
      img.src = imageURL;
      imagePreview.appendChild(img);
      imagePreview.style.display = "block";
    }
  });
  
// Creación de evento para añadir a formulario
function emojiHandler(emoji) {
    const emojiValue = emoji.native;
    const contentTextarea = document.querySelector('textarea[name="content"]');
    contentTextarea.value += emojiValue;
}

// Inicializar EmojiMart
const pickerOptions = { onEmojiSelect: emojiHandler };
const emojiPicker = new EmojiMart.Picker(pickerOptions);
  
emojiContainer.appendChild(emojiPicker);

// Manejar la selección de emojis
emojiContainer.addEventListener('click', (event) => {
if (event.target.classList.contains('emoji')) {
    const emoji = event.target.textContent;
    emojiContainer.style.display = 'none';
}
});

// Mostrar/ocultar el contenedor de emojis al hacer clic en el botón de emoticonos
emojiButton.addEventListener('click', () => {
    if (emojiContainer.style.display === 'block') {
        emojiContainer.style.display = 'none';
    } else {
        emojiContainer.style.display = 'block';
    }
});

// Evitar que el formulario se cierre al hacer clic dentro de él
popupContainer.addEventListener('click', (event) => {
    if (event.target === popupContainer) {
        // Confirmar antes de cerrar el formulario
        if (confirm('¿Está seguro de cancelar la publicación?')) {
            popupContainer.style.display = 'none';
        }
    }
});



