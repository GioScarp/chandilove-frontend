const menuItems = document.querySelectorAll('.menu-item');

const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
    })
})

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