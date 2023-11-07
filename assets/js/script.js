const $form = document.querySelector('#form')

$form.addEventListener('submit', handleSubmit)

function openPopup() {
    document.getElementById("background").style.display = "block";
    document.getElementById("popup").style.display = "block";
    document.getElementById("background").style.opacity = 0.5;
  }

  function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("background").style.display = "none";
  }

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
