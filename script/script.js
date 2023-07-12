let juegos = [
    { id: 1, title: "Assassin's Creed Valhalla", genre: "Adventure", type: "Game", developer: "Ubisoft", publisher: "Ubisoft", pegi: "M", precio: 59.99 },
    { id: 2, title: "The Last of Us Part II", genre: "Action", type: "Game", developer: "Naughty Dog", publisher: "Sony Interactive Entertainment", pegi: "M", precio: 69.99 },
    { id: 3, title: "Cyberpunk 2077", genre: "RPG", type: "Game", developer: "CD Projekt", publisher: "CD Projekt", pegi: "M", precio: 49.99 },
    { id: 4, title: "Call of Duty: Modern Warfare", genre: "Action", type: "Game", developer: "Infinity Ward", publisher: "Activision", pegi: "M", precio: 59.99 },
    { id: 5, title: "FIFA 21", genre: "Sports", type: "Game", developer: "EA Sports", publisher: "Electronic Arts", pegi: "PEGI 3", precio: 59.99 },
    { id: 6, title: "The Legend of Zelda: Breath of the Wild", genre: "RPG", type: "Game", developer: "Nintendo", publisher: "Nintendo", pegi: "T", precio: 59.99 },
    { id: 7, title: "Bloons TD 6", genre: "Strategy", type: "Game", developer: "Ninja Kiwi", publisher: "Ninja Kiwi", pegi: "E", precio: 10 },
    { id: 8, title: "Dota 2", genre: "MOBA", type: "Game", developer: "Valve", publisher: "Valve", pegi: "T", precio: 0 },
    { id: 9, title: "Pillars of Eternity", genre: "RPG", type: "Game", developer: "Obsidian Studios", publisher: "Xbox Game Studios", pegi: "M", precio: 15 },
    { id: 10, title: "Postal", genre: "Open-World", type: "Game", developer: "Running with Scissors", publisher: "Ripcord Games", pegi: "A", precio: 9.99 },
    { id: 11, title: "Red Dead Redemption 2", genre: "Open-World", type: "Game", developer: "Rockstar Games", publisher: "Rockstar Games", pegi: "M", precio: 59.99 },
    { id: 12, title: "God of War", genre: "Action", type: "Game", developer: "Santa Monica Studio", publisher: "Sony Interactive Entertainment", pegi: "M", precio: 39.99 },
    { id: 13, title: "Minecraft", genre: "Adventure", type: "Game", developer: "Mojang Studios", publisher: "Mojang Studios", pegi: "E", precio: 26.99 },
    { id: 14, title: "Grand Theft Auto V", genre: "Open-World", type: "Game", developer: "Rockstar North", publisher: "Rockstar Games", pegi: "M", precio: 29.99 },
    { id: 15, title: "Super Mario Odyssey", genre: "Adventure", type: "Game", developer: "Nintendo", publisher: "Nintendo", pegi: "E", precio: 59.99 },
    { id: 16, title: "The Witcher 3: Wild Hunt", genre: "RPG", type: "Game", developer: "CD Projekt", publisher: "CD Projekt", pegi: "M", precio: 39.99 },
    { id: 16, title: "Driver Booster 7", genre: "Utilities", type: "App", developer: "iObit", publisher: "iObit", pegi: "E", precio: 0 },
    { id: 18, title: "Wallpaper Engine", genre: "Utilities", type: "App", developer: "Wallpaper Engine Team", publisher: "Wallpaper Engine Team", pegi: "E", precio: 9.99 }
];

let carritoJSON = JSON.parse(localStorage.getItem("carrito"))
let carrito = carritoJSON ? carritoJSON : []
renderizarCarrito(carrito)


function programaPrincipal() {
    botonCarrito = document.getElementById("botonCarrito")
    botonCarrito.addEventListener("click",mostrarOcultar)
    let botonBusqueda = document.getElementById('botonBusqueda')
    let inputBusqueda = document.getElementById('inputBusqueda')
    botonBusqueda.addEventListener("click", () => busquedaNombre(juegos, inputBusqueda.value))
    botonGeneroDinamico(juegos)
    renderizar(juegos)
}

programaPrincipal()

function agregarAlCarrito(element) {
    console.log(element.target.id);
    let elementoAgregado = juegos.find(juego => juego.id === Number(element.target.id));
    carrito.push({
        id: elementoAgregado.id,
        title: elementoAgregado.title,
        precio: elementoAgregado.precio
    });
    localStorage.setItem("carrito", JSON.stringify(carrito))
}




function comprar() {
    carrito = []
    localStorage.setItem("carrito",JSON.stringify(carrito))
    // modalCompra() que todavía falta implementar, usar sweet alert

    //despues del modal se tiene que renderizar el carrito de nuevo!!
}

function busquedaGenero(arrayDeElementos, valorFiltro) {
    let filtrado = arrayDeElementos.filter(elemento => elemento.genre.includes(valorFiltro))
    return renderizar(filtrado)
}

function busquedaNombre(arrayDeElementos, valorFiltro) {
    let filtrado = arrayDeElementos.filter(elemento => (elemento.title.toLowerCase()).includes(valorFiltro.toLowerCase()))
    return renderizar(filtrado)
}

// funciones de renderizado
function renderizar(arrayDeElementos) {
    let cartas = document.getElementById("cartas")
    cartas.innerHTML = ''
    if (arrayDeElementos.length>0){
    cartas.innerHTML = '<h3>Explora nuestro catálogo</h3>'
        arrayDeElementos.forEach(element => {
            let cartaElemento = document.createElement("div")
            cartaElemento.className = "cartaElemento card col-4 px-0"
            cartaElemento.innerHTML = `
            <img src="img/unknown.webp" class="card-img-top" alt="portada de juego">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <div>
                <a href="#" id='${element.id}' class="btn btn-primary">Añadir al carrito</a>
                <span class="btn btn-primary " disabled>${element.precio}</span>
                </div>
            </div>
            `
            cartas.appendChild(cartaElemento)
            let botonAgregarAlCarrito = document.getElementById(element.id)
            botonAgregarAlCarrito.addEventListener('click',agregarAlCarrito)
        })
    } else {
        let cartaElemento = document.createElement("div")
        cartaElemento.classname = 'noElementFound'
        cartaElemento.innerHTML = '<h5>Parece no haber productos que coincidan con tu busqueda</h5>'
        cartas.appendChild(cartaElemento)
    }
}

function renderizarCarrito(carrito) {
    let contenedorCarrito = document.getElementById("carrito")
    contenedorCarrito.innerHTML = ''
    if (carrito.length>0) {
        let precioTotal = 0  
        carrito.forEach(element => {
            precioTotal += element.precio
            let cartaCarrito = document.createElement("li")
            cartaCarrito.classList = 'list-group-item d-flex justify-content-between align-items-center'
            cartaCarrito.innerHTML = `
                <img src="img/unknown.webp" class="d-inline" alt="portada de juego">
                <h4>${element.title}</h4>
                <h4 class="pe-4">${element.precio}</h4>
            `
            contenedorCarrito.appendChild(cartaCarrito)
        })

        let botonComprar = document.createElement("button")
        botonComprar.classList = 'botonComprar'
        botonComprar.innerHTML = "Comprar"
        contenedorCarrito.appendChild(botonComprar)
        botonComprar.addEventListener("click",comprar)

        displayPrecioTotal = document.createElement("button")
        displayPrecioTotal.classList = 'button displayPrecio'
        displayPrecioTotal.innerHTML = `${precioTotal}`
        displayPrecioTotal.disabled = true
        contenedorCarrito.appendChild(displayPrecioTotal)

    } else {
        contenedorCarrito.innerHTML = '<h3>Parece que todavia no has agregado ningun juego al carrito... <br> Descubre los mejores titulos en la pagina principal!</h3>'
    }
}

function botonGeneroDinamico(e) {
    let contenedorGenerosDinamicos = document.getElementById('contenedorGenerosDinamicos')
    contenedorGenerosDinamicos.innerHTML = ''
    let generos = []
    e.forEach(element => {
        !generos.includes(element.genre) ? generos.push(element.genre) : null
            }
        )
    generos.forEach(genero => {
        if (genero != "Utilities"){
                let liGenero = document.createElement('li')
                liGenero.innerHTML = `<button id="${genero}" value="${genero}" class="w-100">${genero}</button>`
                contenedorGenerosDinamicos.appendChild(liGenero)
                let botonGenero = document.getElementById(`${genero}`)
                botonGenero.addEventListener("click", () => busquedaGenero(e, botonGenero.value))
            }
        }
    )
}

function mostrarOcultar() {
    let contenedorElementos = document.getElementById("cartas")
    let contenedorCarrito = document.getElementById("carrito")
    contenedorElementos.classList.toggle("oculto")
    contenedorCarrito.classList.toggle("oculto")
    renderizarCarrito(carrito)
}