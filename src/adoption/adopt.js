function getPets(done){

    const results = fetch("http://localhost:3000/mascotas");
    
    results
    .then(res => res.json())
    .then(data => {
        done(data)
    }).catch(error => {
        console.log(error)
    })

}

getPets(data => {
    console.log(data);
    data.forEach(pet => {
        const listado_mascotas = document.createRange().createContextualFragment(
        /*html*/`
        <div class="card">
            <img class="img-card ver_info" data-product-id="${pet.id}" src="${pet.images.thumbnail}" alt="Primera Mascota">
            <a href="#" class="circle">
                <i class="fi fi-br-heart"></i>
            </a>
            <div class="info-mascota ver_info" data-product-id="${pet.id}">
                <h3>${pet.name}</h3>
                <p class="edad">${pet.age} años</p>
                <p class="sexo">${pet.gender}</p>
            </div>
        </div>
        `);

        const mascotas = document.querySelector(".contenedor_mascotas");

        mascotas.append(listado_mascotas);
    });
})

//Consulta de las fundaciones
function getFoundations(done){

    const results = fetch("http://localhost:3000/fundaciones");
    
    results
    .then(res => res.json())
    .then(data => {
        done(data)
    }).catch(error => {
        console.log(error)
    })

}

// Pintar cada fundación encontrada
getFoundations(data => {
    console.log(data);
    data.forEach(fundacion => {
        const listado_fundaciones = document.createRange().createContextualFragment(
        /*html*/`
            <div class="card_fundacion">
                <a href="#" class="profile_fundacion">
                    <div class="photo-fundacion">
                        <img src="${fundacion.img}" alt= "${fundacion.name}">
                    </div>
                    <div class="info_fundacion">
                        <h4>${fundacion.name}</h4>
                        <p>
                            ${fundacion.description}
                        </p>
                    </div>
                </a>
            </div>
        `);

        const fundaciones = document.querySelector(".listado_fundaciones");

        fundaciones.append(listado_fundaciones);
    });
})


// ==================== Popops ==================

// Obtener elementos del DOM
const listaMascotas = document.getElementById('lista-mascotas');
const mascotaPopup = document.getElementById('mascota-popup');
const closePopupButton = document.getElementById('undo');
const body = document.querySelector('body');



// Agregar un manejador de eventos para mostrar el popup con la info especifica de  la mascota elegida
listaMascotas.addEventListener("click", e => {
    body.style.overflow = "hidden";

  if (e.target.classList.contains("ver_info")) {
    const mascotaId = e.target.getAttribute('data-product-id');

    // Realiza la solicitud para obtener la información del producto y luego muestra el popup
    fetch(`http://localhost:3000/mascotas/${mascotaId}`)
      .then(response => response.json())
      .then(mascotaInfo => {
        const popup = document.createRange().createContextualFragment(
            /*html*/`
            <div class="content-popup" id="mascota-details">
                <div class="carousel-popup">
                    <img src="${mascotaInfo.images.thumbnail}" alt="">
                    <a class="circle_popup undo" onClick="closePopup()">
                        <i class="fi fi-br-undo"></i>
                    </a>
                    <a class="circle_popup">
                        <i class="fi fi-br-heart"></i>
                    </a>
                </div>
                <div class="container-info-pet">
                    <h1 class="title-popup">${mascotaInfo.name}</h1>
                    <ul class="info-pet">
                        <li class="list-box">
                            <div class="rounded-box">
                                <h3>${mascotaInfo.gender}</h3>
                                <p>Género</p>
                            </div>
                        </li>
                        <li class="list-box">
                            <div class="rounded-box">
                                <h3>${mascotaInfo.color}</h3>
                                <p>Color</p>
                            </div>
                        </li>
                        <li class="list-box">
                            <div class="rounded-box">
                                <h3>${mascotaInfo.breed}</h3>
                                <p>Raza</p>
                            </div>
                        </li>
                        <li class="list-box">
                            <div class="rounded-box">
                                <h3>${mascotaInfo.age}</h3>
                                <p>Años</p>
                            </div>
                        </li>
                    </ul>
                    <div class="parrafo">
                        <div class="recortado" id="parrafo_cortado">
                            <p class="description-pet">
                            ${mascotaInfo.description}
                            </p>
                        </div>
                        <a href="#" id="ver-mas" onclick="mostrarMas()">Ver más</a>
                    </div>

                    <div class="btn-adoption">
                        <button>Adoptame</button>
                        <button>Donar</button>
                    </div>
                </div>
            </div>
            `);

        mascotaPopup.style.display = 'flex';
        mascotaPopup.append(popup);    
      });
  }
});


// Cerrar el popup dando click en cualquier lado que no sea  el popup
mascotaPopup.addEventListener('click', function(event) {
    const popup = document.getElementById("mascota-details");

    if (popup !== null && event.target !== popup && !popup.contains(event.target)) {
        closePopup();
    }
});


// Cerrar el Popup
function closePopup(){
    const mascotaDetails = document.getElementById('mascota-details');
    mascotaDetails.remove();
    mascotaPopup.style.display = 'none';
    body.style.overflow = "auto";
};



// Función para mostrar la descripción de la mascota completa
function mostrarMas() {
    const parrafo = document.getElementById("parrafo_cortado");
    const verMas = document.getElementById("ver-mas");
    const mascotaDetails = document.getElementById('mascota-details');
    

    if (parrafo.classList.contains("recortado")) {
        parrafo.classList.remove("recortado");
        verMas.textContent = "Ver menos";
        // mascotaDetails.style.top = "30px";
    } else {
        parrafo.classList.add("recortado");
        verMas.textContent = "Ver más";
    }
}

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

