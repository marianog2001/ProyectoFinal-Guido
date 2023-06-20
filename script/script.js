class userGuest {
    constructor(username, edad) {
        this.username = username;
        this.edad = edad;
        this.ownedGames = [];
    }
}

class game{
    constructor(title, developer, publisher, pegi, precio) {
        this.title = title;
        this.developer = developer;
        this.publisher = publisher;
        this.pegi = pegi;
        this.precio = precio;
    }
}

const bloonstd6 = new game("Bloons TD 6", "Ninja Kiwi", "Ninja Kiwi", "E", 10)

const dota2 = new game("Dota 2", "Valve", "Valve", "T", 0)

const pillarsofeternity = new game("Pillars of Eternity", "Obsidian Studios", "Xbox Game Studios", "M", 15)

let games = [bloonstd6,dota2,pillarsofeternity]

let user = prompt("Bienvenido, ingrese su nombre de usuario por favor: ")
let edad = prompt("Ingrese su edad: ")

let guest = new userGuest(user,edad)

let menu = true

alert(`Bienvenido ${guest.username}`)

while (menu == true) {
    seleccion = parseInt(prompt(`Por favor, seleccione una opcion: \n 1] Ver tienda \n 2] Ver inventario \n 0] Salir`))
    switch (seleccion) {
        case 1:
            menuTienda(guest)
            break;
        case 2:
            verInventario(guest)
            break;
        case 0: 
            menu = false
            break;
    }
}

function menuTienda(userGuest) {
    let menu = true
    while (menu == true) {
        seleccionTienda = parseInt(prompt(`Seleccione el juego que quiere comprar: \n 1] ${games[0].title} \n 2] ${games[1].title} \n 3] ${games[2].title} \n 0] Salir`))
        switch (seleccionTienda - 1) {
            case 0:
                confirmar(userGuest,games[0])
                menu = false
                break;
            case 1:
                confirmar(userGuest,games[1])
                menu = false
                break;
            case 2:
                confirmar(userGuest,games[2])
                break;
            case -1:
                menu = false
                break;
            default:
                alert('Ha ingresado una opcion invalida, reintentelo')
                break;
        }
    }
}

function verInventario(userGuest) {
    if (userGuest.ownedGames.length === 0) {
        alert('Usted no tiene ningun juego en su inventario!')
    } else {
        userGuest.ownedGames.forEach(game => {
            alert(game.title)
        });
    }
}

function tieneEdadNecesaria(userGuest,game) {
    switch (game.pegi) {
        case 'E':
            edadNecesaria = 0
            break
        case 'T':
            edadNecesaria = 12
            break
        case 'M':
            edadNecesaria = 17
        case 'A':
            edadNecesaria = 21
    } 
    if (userGuest.edad >= edadNecesaria) {
        return true
    } else {
        return false
    }
}

function adquiridoPreviamente(userGuest,game) {
    if (userGuest.ownedGames.includes(game)) {
        return true
    } else {
        return false
    }
}

function confirmar(userGuest,game) {
    if (tieneEdadNecesaria(userGuest, game)) {
        if (adquiridoPreviamente(userGuest, game)) {
            alert('Usted ya posee este juego en su biblioteca')
        } else {
            a = prompt(`El valor es de ${game.precio} USD, desea continuar con la compra? \n 1] Confirmar \ 2] Cancelar`)
            if (a == '1') {
                userGuest.ownedGames.push(game);
                alert(`Ha adquirido ${game.title}`);
            } else if (a == '2') {
                alert('La compra ha sido cancelada');
            } else {
                alert('Opción inválida, inténtelo de nuevo');
            }
        }
    } else {
        alert('No cumple los requisitos para adquirir el juego')
    }
}


/*  */