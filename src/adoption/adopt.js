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
            <img class="img-card" src="${pet.images.thumbnail}" alt="Primera Mascota">
            <a href="#" class="circle">
                <i class="fi fi-br-heart"></i>
            </a>
            <div class="info-mascota">
                <h3>${pet.name}</h3>
                <p class="edad">${pet.age}</p>
                <p class="sexo">${pet.gender}</p>
            </div>
        </div>
        `);

        const mascotas = document.querySelector(".contenedor_mascotas");

        mascotas.append(listado_mascotas);
    });
})


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


getFoundations(data => {
    console.log(data);
    data.forEach(fundacion => {
        const listado_fundaciones = document.createRange().createContextualFragment(
        /*html*/`
            <div class="card_fundacion">
                <a href="#" class="profile">
                    <div class="profile-photo">
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
