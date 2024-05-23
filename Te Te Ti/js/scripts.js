const X_CLASS = 'x'; // Clase para la marca 'X'
const O_CLASS = 'o'; // Clase para la marca 'O'
const WINNING_COMBINATIONS = [ // Combinaciones ganadoras
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]'); // Selecciona todas las celdas del tablero
const board = document.getElementById('game-board'); // Selecciona el contenedor del tablero
const winningMessageElement = document.getElementById('winning-message'); // Selecciona el mensaje de victoria
const winningMessageTextElement = document.getElementById('winning-message-text'); // Selecciona el texto del mensaje de victoria
const restartButton = document.getElementById('restartButton'); // Selecciona el botón de reinicio
let oTurn; // Variable para llevar el turno de 'O'

startGame(); // Inicia el juego

restartButton.addEventListener('click', startGame); // Reinicia el juego al hacer clic en el botón

function startGame() {
    oTurn = false; // 'X' comienza primero
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS); // Elimina la clase 'X' de todas las celdas
        cell.classList.remove(O_CLASS); // Elimina la clase 'O' de todas las celdas
        cell.removeEventListener('click', handleClick); // Elimina el evento de clic anterior
        cell.addEventListener('click', handleClick, { once: true }); // Agrega un nuevo evento de clic que se ejecuta una vez
    });
    setBoardHoverClass(); // Establece la clase de hover en el tablero
    winningMessageElement.classList.add('hidden'); // Oculta el mensaje de victoria
}

function handleClick(e) {
    const cell = e.target; // Obtiene la celda clicada
    const currentClass = oTurn ? O_CLASS : X_CLASS; // Determina la clase actual en función del turno
    placeMark(cell, currentClass); // Coloca la marca en la celda
    if (checkWin(currentClass)) { // Verifica si hay un ganador
        endGame(false); // Termina el juego si hay un ganador
    } else if (isDraw()) { // Verifica si hay un empate
        endGame(true); // Termina el juego en caso de empate
    } else {
        swapTurns(); // Cambia el turno
        setBoardHoverClass(); // Actualiza la clase de hover del tablero
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Empate ¿Quieren jugar de nuevo?'; // Mensaje de empate
    } else {
        winningMessageTextElement.innerText = `Gano ${oTurn ? "O" : "X"}, te ganaste un helado de chocolate`; // Mensaje de victoria
    }
    winningMessageElement.classList.remove('hidden'); // Muestra el mensaje de victoria
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS); // Verifica si todas las celdas están ocupadas
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass); // Agrega la clase correspondiente a la celda
}

function swapTurns() {
    oTurn = !oTurn; // Cambia el turno
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS); // Elimina la clase 'X' del tablero
    board.classList.remove(O_CLASS); // Elimina la clase 'O' del tablero
    if (oTurn) {
        board.classList.add(O_CLASS); // Agrega la clase 'O' al tablero si es el turno de 'O'
    } else {
        board.classList.add(X_CLASS); // Agrega la clase 'X' al tablero si es el turno de 'X'
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => { // Verifica si alguna combinación ganadora está presente
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass); // Verifica si todas las celdas de la combinación tienen la clase actual
        });
    });
}
