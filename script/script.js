const localUrl = "./db.json"
let productos = [];
let carritoJSON = JSON.parse(localStorage.getItem("carrito"));
let carrito = carritoJSON ? carritoJSON : [];


async function obtenerDB(url) {
    response = await fetch(url)
    data = await response.json()
    return data.productos
}

async function programaPrincipal() {
    try {
        productos = await obtenerDB(localUrl);
        botonCarrito = document.getElementById("botonCarrito");
        botonCarrito.addEventListener("click", mostrarOcultar);
        let botonBusqueda = document.getElementById("botonBusqueda");
        let inputBusqueda = document.getElementById("inputBusqueda");
        botonBusqueda.addEventListener("click", () =>
            busquedaNombre(productos, inputBusqueda.value)
        );
        console.log(productos)
        botonGeneroDinamico(productos);
        renderizar(productos);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}



function agregarAlCarrito(element) {
    let elementoAgregado = productos.find(
        (producto) => producto.id === Number(element.target.id)
    );
    console.log(productos)
    carrito.push({
        id: elementoAgregado.id,
        title: elementoAgregado.title,
        precio: elementoAgregado.precio,
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    tostadaProductoAgregado(elementoAgregado)
}

function renderizar(arrayDeElementos) {
    let cartas = document.getElementById("cartas");
    cartas.innerHTML = "";
    if (arrayDeElementos.length > 0) {
        cartas.innerHTML = "<h3>Explora nuestro catálogo</h3>";
        arrayDeElementos.forEach((element) => {
            let cartaElemento = document.createElement("div");
            cartaElemento.className = "cartaElemento card col-4 px-0";
            cartaElemento.innerHTML = `
            <img src="img/${element.id}.jpg" class="card-img-top" alt="portada de juego">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <div>
                <a href="#" id='${element.id}' class="btn btn-primary">Añadir al carrito</a>
                <span class="btn btn-primary " disabled>${element.precio}</span>
                </div>
            </div>
            `;
            cartas.appendChild(cartaElemento);
            let botonAgregarAlCarrito = document.getElementById(element.id);
            botonAgregarAlCarrito.addEventListener("click", agregarAlCarrito);
        });
    } else {
        let cartaElemento = document.createElement("div");
        cartaElemento.classname = "noElementFound";
        cartaElemento.innerHTML =
            "<h5>Parece no haber productos que coincidan con tu busqueda</h5>";
        cartas.appendChild(cartaElemento);
    }
}

function comprar() {
    Swal.fire({
        title: "Muchas gracias por comprar en Whiff",
    });
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito(carrito);
}

function busquedaGenero(arrayDeElementos, valorFiltro) {
    let filtrado = arrayDeElementos.filter((elemento) =>
        elemento.genre.includes(valorFiltro)
    );
    return renderizar(filtrado);
}

function busquedaNombre(arrayDeElementos, valorFiltro) {
    let filtrado = arrayDeElementos.filter((elemento) =>
        elemento.title.toLowerCase().includes(valorFiltro.toLowerCase())
    );
    return renderizar(filtrado);
}



// funciones de renderizado
function renderizarCarrito(carrito) {
    let contenedorCarrito = document.getElementById("carrito");
    contenedorCarrito.innerHTML = "";
    if (carrito.length > 0) {
        let precioTotal = 0;
        carrito.forEach((element) => {
            precioTotal += element.precio;
            let cartaCarrito = document.createElement("li");
            cartaCarrito.classList =
                "list-group-item d-flex justify-content-between align-items-center";
            cartaCarrito.innerHTML = `
                <img src="img/${element.id}.jpg" class="d-inline" alt="portada de juego">
                <h4>${element.title}</h4>
                <h4 class="pe-4">$${element.precio}</h4>
            `;
            contenedorCarrito.appendChild(cartaCarrito);
        });

        let botonComprar = document.createElement("button");
        botonComprar.classList = "botonComprar";
        botonComprar.innerHTML = "Comprar";
        contenedorCarrito.appendChild(botonComprar);
        botonComprar.addEventListener("click", comprar);

        displayPrecioTotal = document.createElement("button");
        displayPrecioTotal.classList = "button displayPrecio";
        displayPrecioTotal.innerHTML = `$${precioTotal}`;
        displayPrecioTotal.disabled = true;
        contenedorCarrito.appendChild(displayPrecioTotal);
    } else {
        contenedorCarrito.innerHTML =
            "<h3>Parece que todavia no has agregado ningun juego al carrito... <br> Descubre los mejores titulos en la pagina principal!</h3>";
    }
}

function botonGeneroDinamico(e) {
    let contenedorGenerosDinamicos = document.getElementById(
        "contenedorGenerosDinamicos"
    );
    contenedorGenerosDinamicos.innerHTML = "";
    let generos = [];
    e.forEach((element) => {
        !generos.includes(element.genre) ? generos.push(element.genre) : null;
    });
    generos.forEach((genero) => {
        if (genero != "Utilities") {
            let liGenero = document.createElement("li");
            liGenero.innerHTML = `<button id="${genero}" value="${genero}" class="w-100">${genero}</button>`;
            contenedorGenerosDinamicos.appendChild(liGenero);
            let botonGenero = document.getElementById(`${genero}`);
            botonGenero.addEventListener("click", () =>
                busquedaGenero(e, botonGenero.value)
            );
        }
    });
}

function mostrarOcultar() {
    let contenedorElementos = document.getElementById("cartas");
    let contenedorCarrito = document.getElementById("carrito");
    contenedorElementos.classList.toggle("oculto");
    contenedorCarrito.classList.toggle("oculto");
    renderizarCarrito(carrito);
}

function tostadaProductoAgregado(juego) {
    Toastify({
        text: `"${juego.title}" agregado al carrito`,
        position: 'right',
        duration: 2500,
    }).showToast()
}


renderizarCarrito(carrito);
programaPrincipal();


