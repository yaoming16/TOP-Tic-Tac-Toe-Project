// Constructor of the player object
function createPlayer (name, mark) {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
} 

// COnstructor for the game board
function createGameBoard () {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;

    const addToBoard = (index, playerMark) =>  {
        if (index < 9 && index >= 0) {
            board[index] = playerMark;
        }
    }

    const resetGameBoard = (gameBoxes) => {
        board.map((element) => element = "");
        console.log(gameBoxes);
        gameBoxes.forEach((element) => element.innerHTML = "");
    }
    
    const boardHasEmptySpace = () => board.some((value) => value === "");
    return {getBoard, addToBoard, boardHasEmptySpace, resetGameBoard};
}

// Game object
const game = ( function () {
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");
    const {getBoard, addToBoard, boardHasEmptySpace, resetGameBoard} = createGameBoard(); 

    let currentPlayer = player1;
    const getCurrentPlayer = () => currentPlayer;

    const makePlay = (index, element) => {
        // Only add the play if the selected space is empty
        if (getBoard()[index] === "") {
            addToBoard(index, currentPlayer.getMark());
            element.append(currentPlayer.getMark());
            console.log(element);
            currentPlayer = currentPlayer === player1 ? player2 : player1; 
            console.log(game.getBoard());

        }
    }
    
    return {getCurrentPlayer, makePlay, getBoard, boardHasEmptySpace, resetGameBoard}

})();

const gameDiv = document.querySelector("#game-div");
const gameBoxes = document.querySelectorAll('.game-box');

// Add event listener to the game box to add the play to the board
document.querySelectorAll('.game-box').forEach((el, i) => {
    el.addEventListener('click', () => game.makePlay(el.id, el))
} )

document.querySelector("#reset-button").addEventListener("click", () => {
    game.resetGameBoard(gameBoxes);
});






