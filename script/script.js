
let user = prompt("Bienvenido, ingrese su nombre de usuario por favor: ")

let menu = true

alert('Bienvenido ' + user)

let juego, precio

while (menu == true) {
    seleccion = prompt('Seleccione el juego que quiere comprar: \n 1] Counter Strike: Global Offensive \n 2] Dota 2 \n 3] Half-Life \n 0] Salir')
    switch (seleccion) {
        case '1':
            juego = 'Counter Strike: Global Offensive'
            precio = '3200'
            confirmar(juego,precio)
            break;
        case '2':
            juego = 'Dota 2'
            precio = '2000'
            confirmar(juego,precio)
            break;
        case '3':
            juego = 'Half-Life'
            precio = '2500'
            confirmar(juego,precio)
            break;
        case '0':
            menu = false
            break;
        default:
            alert('Ha ingresado una opcion invalida, reintentelo')
            break;
    }
}

function confirmar(juego,precio) {
    a = prompt('El valor es de ' + precio + ' ARS, desea continuar con la compra? \n 1] Confirmar \ 2] Cancelar')
    if (a === '1') {
        alert('Ha comprado ' + juego);
      } else if (a === '2') {
        alert('La compra ha sido cancelada');
      } else {
        alert('Opción inválida, inténtelo de nuevo');
      }
}