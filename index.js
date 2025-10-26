// Constructor of the player object
function createPlayer(name, mark) {
  const getName = () => name;
  const getMark = () => mark;
  return { getName, getMark };
}

// COnstructor for the game board
function createGameBoard() {
  const board = ["", "", "", "", "", "", "", "", ""];
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getBoard = () => board;

  const addToBoard = (index, playerMark) => {
    if (index < 9 && index >= 0) {
      board[index] = playerMark;
    }
  };

  const resetGameBoard = (gameBoxes) => {
    board.forEach((_, index) => {
      board[index] = "";
    });
    gameBoxes.forEach((box) => (box.innerHTML = ""));
  };

  const checkWin = () => {
    return winConditions.some(
      (condition) =>
        board[condition[0]] === board[condition[1]] &&
        board[condition[0]] === board[condition[2]] &&
        board[condition[0]] !== ""
    );
  };

  const boardHasEmptySpace = () => board.some((value) => value === "");
  return { getBoard, addToBoard, boardHasEmptySpace, resetGameBoard, checkWin };
}

// Game object
const game = (function () {
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");
  const { getBoard, addToBoard, boardHasEmptySpace, resetGameBoard, checkWin } =
    createGameBoard();

  let currentPlayer = player1;
  const getCurrentPlayer = () => currentPlayer;

  const makePlay = (index, element) => {
    // Only add the play if the selected space is empty
    if (getBoard()[index] === "") {
      addToBoard(index, currentPlayer.getMark());
      element.append(currentPlayer.getMark());
      console.log(checkWin());
      if (checkWin()) {
        console.log(`${currentPlayer.getName()} won`);
        return;
      }
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  };

  return {
    getCurrentPlayer,
    makePlay,
    getBoard,
    boardHasEmptySpace,
    resetGameBoard,
  };
})();

const gameDiv = document.querySelector("#game-div");
const gameBoxes = document.querySelectorAll(".game-box");

// Add event listener to the game box to add the play to the board
document.querySelectorAll(".game-box").forEach((el, i) => {
  el.addEventListener("click", () => game.makePlay(el.id, el));
});

document.querySelector("#reset-button").addEventListener("click", () => {
  game.resetGameBoard(gameBoxes);
});
