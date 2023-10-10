/**
 * Fetches images from the Unsplash API based on a predefined query and renders them as posts in an HTML container.
 *
 * @param {string} containerId - The ID of the HTML container where the image posts will be rendered.
 * @returns {Promise} A promise that resolves when the images have been fetched and rendered.
 */
function renderPost(containerId) {
    // Define endpoints and queries
    const endPoint = "https://api.unsplash.com/search/photos";
    const clientId = "7DtjXncAiKf5JFGHnAfn5ERz_8XdxWGxViYQ49TTSgc";
    const query = "perros y gatos";
    const page = 1;
    const size = 10;
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let postsContent = "";

    // Make the HTTP request, interpolación de variables
    return fetch(`${endPoint}?client_id=${clientId}&query=${query}&page=${page}&per_page=${size}`, requestOptions)
        .then(response => response.json()) // Convert the response to JSON
        .then(data => {
            // Process the data in JSON format
            data.results.forEach(result => {
                // Loop through the results using forEach
                postsContent += templatePost(result.urls.raw);
            });

            // Render the posts in the specified container
            document.getElementById(containerId).innerHTML = postsContent;
        })
        .catch(error => {
            console.log('Error:', error);
            throw error; // Propagate the error if necessary
        });
}

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
renderPost('container-posts');

//PopUp Publicar

// Obtener elementos del DOM
const openFormButton = document.getElementById('open-form');
const closeFormButton = document.getElementById('close-form');
const popupContainer = document.getElementById('popup-container');
const emojiButton = document.getElementById('emoji-button');
const emojiContainer = document.getElementById('emoji-container');

// Mostrar el formulario emergente al hacer clic en el botón "Publicar"
openFormButton.addEventListener('click', () => {
    popupContainer.style.display = 'flex';
});




// Ocultar el formulario emergente al hacer clic en el botón de cierre
closeFormButton.addEventListener('click', () => {
    // Confirmar antes de cerrar el formulario
    if (confirm('¿Está seguro de cancelar la publicación?')) {
        popupContainer.style.display = 'none';
        emojiContainer.style.display = 'none'; // Ocultar el contenedor de emojis si está abierto
    }
});

// Inicializar EmojiMart
const pickerOptions = {onEmojiSelect: console.log };
  const emojiPicker = new EmojiMart.Picker(pickerOptions);
  
  emojiContainer.appendChild(emojiPicker);

  // Manejar la selección de emojis
  emojiContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('emoji')) {
        const emoji = event.target.textContent;
        const contentTextarea = document.querySelector('textarea[name="content"]');
        contentTextarea.value += emoji;
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

