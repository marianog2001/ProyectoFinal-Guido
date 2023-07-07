class game {
    constructor(id, title, genre, type, developer, publisher, pegi, precio) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.type = type;
        this.developer = developer;
        this.publisher = publisher;
        this.pegi = pegi;
        this.precio = precio;
    }
}

const acvalhalla = new game(1, "Assassin's Creed Valhalla", "Adventure", "Game", "Ubisoft", "Ubisoft", "M", 59.99);
const tlou2 = new game(2, "The Last of Us Part II", "Action", "Game", "Naughty Dog", "Sony Interactive Entertainment", "M", 69.99);
const cp2077 = new game(3, "Cyberpunk 2077", "RPG", "Game",  "CD Projekt", "CD Projekt", "M", 49.99);
const codmwr = new game(4, "Call of Duty: Modern Warfare", "Action", "Game", "Infinity Ward", "Activision", "M", 59.99);
const fifa21 = new game(5, "FIFA 21", "Sports", "Game", "EA Sports", "Electronic Arts", "PEGI 3", 59.99);
const tlozbow = new game(6, "The Legend of Zelda: Breath of the Wild","RPG", "Game", "Nintendo", "Nintendo", "T", 59.99);
const bloonstd6 = new game(7, "Bloons TD 6", "Strategy", "Game", "Ninja Kiwi", "Ninja Kiwi", "E", 10)
const dota2 = new game(8, "Dota 2", "MOBA", "Game","Valve", "Valve", "T", 0)
const pillarsofeternity = new game(9, "Pillars of Eternity","RPG", "Game", "Obsidian Studios", "Xbox Game Studios", "M", 15)
const postal2 = new game(10, "Postal", "Open-World", "Game", "Running with Scissors", "Ripcord Games", "A", 9.99)
const rdr2 = new game(11, "Red Dead Redemption 2", "Open-World", "Game", "Rockstar Games", "Rockstar Games", "M", 59.99);
const gow = new game(12, "God of War","Action", "Game", "Santa Monica Studio", "Sony Interactive Entertainment", "M", 39.99);
const minecraft = new game(13, "Minecraft", "Adventure", "Game", "Mojang Studios", "Mojang Studios", "E", 26.99);
const gtav = new game(14, "Grand Theft Auto V", "Open-World", "Game", "Rockstar North", "Rockstar Games", "M", 29.99);
const marioodissey = new game(15, "Super Mario Odyssey", "Adventure", "Game", "Nintendo", "Nintendo", "E", 59.99);
const witcher3 = new game(16, "The Witcher 3: Wild Hunt","RPG", "Game", "CD Projekt", "CD Projekt", "M", 39.99);
const driverbooster = new game(16, "Driver Booster 7", "Utilities", "App", "iObit", "iObit", "E", 0);
const wpengine = new game(18, "Wallpaper Engine", "Utilities", "App","Wallpaper Engine Team", "Wallpaper Engine Team", "E", 9.99);

let juegos = [acvalhalla, tlou2, cp2077, codmwr, fifa21, tlozbow, bloonstd6, dota2, pillarsofeternity, postal2, rdr2, gow, minecraft, gtav, marioodissey, witcher3]
let carrito = []

let cartas = document.getElementById("cartas")
let contenedorGenerosDinamicos = document.getElementById('generosDinamicos')


let botonBusqueda = document.getElementById('botonBusqueda')
let inputBusqueda = document.getElementById('inputBusqueda')
botonBusqueda.addEventListener("click", () => busquedaNombre(juegos, inputBusqueda.value))


function botonDinamicoGenero() {
    contenedorGenerosDinamicos.innerHTML = ''
    let generos = []
    juegos.forEach(element => {
        !generos.includes(element.genre) ? generos.push(element.genre) : null;
        
    })
    generos.forEach(element => {
        let liGenero = document.createElement('li')
        liGenero.innerHTML = `<button id="${element}" value="${element}">${element}</button>`
        contenedorGenerosDinamicos.appendChild(liGenero)
        let botonGenero = document.getElementById(`${element}`)
        botonGenero.addEventListener("click", () => busquedaGenero(juegos, botonGenero.value))
    })
}


function renderizar(arrayDeElementos) {
    cartas.innerHTML = ''
    if (arrayDeElementos.length>0){
    cartas.innerHTML = '<h3>Explora nuestro catálogo</h3>'
        arrayDeElementos.forEach(element => {
            let cartaElemento = document.createElement("div")
            cartaElemento.className = "cartaElemento card col-3"
            cartaElemento.innerHTML = `
            <img src="img/unknown.png" class="card-img-top" alt="portada de juego">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
                <a href="#" id='${element.id}' class="btn btn-primary">Añadir al carrito</a>
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

function agregarAlCarrito(element) { 
    let elementoAgregado = juegos.find(juego => juego.id === Number(element.target.id))
    
    carrito.push({
        id: elementoAgregado.id,
        title: elementoAgregado.title,
        precio: elementoAgregado.precio
    })
    console.log(carrito)
    renderizarCarrito(carrito)
    console.log(carrito)
}

function renderizarCarrito(carrito) {
    let contenedorCarrito = document.getElementById("carrito")
    contenedorCarrito.innerHTML = ''
    carrito.forEach(element => {
        let cartaCarrito = document.createElement("div")
        cartaCarrito.innerHTML = `<img src="img/unknown.png" class="card-img-top" alt="portada de juego">
        <h4>${element.title}</h4>
        <h4>${element.precio}</h4>
        `
        contenedorCarrito.appendChild(cartaCarrito)
    });
}



/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg> */



function busquedaGenero(arrayDeElementos, valorFiltro) {
    let filtrado = arrayDeElementos.filter(elemento => elemento.genre.includes(valorFiltro))
    return renderizar(filtrado)
}

function busquedaNombre(arrayDeElementos, valorFiltro) {
    let filtrado = arrayDeElementos.filter(elemento => elemento.title.includes(valorFiltro))
    return renderizar(filtrado)
}

function mostrarOcultar() {
    let contenedorElementos = document.getElementById("cartas")
    let contenedorCarrito = document.getElementById("carrito")
    contenedorElementos.classList.toggle("oculto")
    contenedorCarrito.classList.toggle("oculto")
}


botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click",mostrarOcultar)



//inicializacion de pagina

botonDinamicoGenero()
renderizar(juegos)