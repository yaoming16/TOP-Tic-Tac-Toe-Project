// Constructor of the player object
function createPlayer(name, mark) {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
}

// Constructor for the game board
function createGameBoard() {
    const board = ["", "", "", "", "", "", "", "", ""];
    let boardBlocked = true;
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
    const getBoardBlocked = () => boardBlocked;
    const setBordBlocked = (newStatus) => (boardBlocked = newStatus);

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
        setBordBlocked(true);
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
    return {
        getBoard,
        addToBoard,
        boardHasEmptySpace,
        resetGameBoard,
        checkWin,
        getBoardBlocked,
        setBordBlocked,
    };
}

// Game object
function createGame(player1Name, player2Name) {
    const player1 = createPlayer(player1Name, "X");
    const player2 = createPlayer(player2Name, "O");

    const {
        getBoard,
        addToBoard,
        boardHasEmptySpace,
        resetGameBoard,
        checkWin,
        getBoardBlocked,
        setBordBlocked,
    } = createGameBoard();

    let currentPlayer = player1;

    const makePlay = (index, element, statusDisplay) => {
        // Only add the play if the selected space is empty
        if (getBoard()[index] === "" && !getBoardBlocked()) {
            addToBoard(index, currentPlayer.getMark());
            element.append(currentPlayer.getMark());

            // First we check if user won
            if (checkWin()) {
                setBordBlocked(true);
                statusDisplay.innerHTML = `${currentPlayer.getName()} Won`;
                currentPlayer = player1;
                return;
            }

            // if user didnt win, we see if board is full
            if (!boardHasEmptySpace()) {
                setBordBlocked(true);
                statusDisplay.innerHTML = "It is a draw";
                return;
            }

            // if no one won and the board isnt full we can change the current player to continue the game
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            // Show who is the next one to play
            statusDisplay.innerHTML = `It is ${currentPlayer.getName()} turn`;
        }
    };

    return {
        makePlay,
        getBoard,
        resetGameBoard,
        setBordBlocked,
    };
}

const playerNamesInput = document.querySelectorAll(".player-name");
const gameBoxes = document.querySelectorAll(".game-box");
const statusDisplay = document.querySelector("#status");

// Function to see if an input is empty
function checkEmptyInput(element) {
    return element.value.trim() !== "";
}

let game;
// Event to start the game when the player clicks the start button
document.querySelector("#start-button").addEventListener("click", () => {
    // Only start the game if the name inputs are ccompleted and have different values
    if (
        [...playerNamesInput].every(checkEmptyInput) &&
        playerNamesInput[0].value !== playerNamesInput[1].value
    ) {
        game = createGame(playerNamesInput[0].value, playerNamesInput[1].value);

        // Add event listener to the game box to add the play to the board
        document.querySelectorAll(".game-box").forEach((el, i) => {
            el.addEventListener("click", () => {
                game.makePlay(el.id, el, statusDisplay);
            });
        });

        game.setBordBlocked(false);

        statusDisplay.innerHTML = `Game Started, it's ${playerNamesInput[0].value} turn`;
    } else {
        statusDisplay.innerHTML =
            "The names are invalid. Player names can't be left empty and need to be different";
    }
});

// Event listener to reset the game
document.querySelector("#reset-button").addEventListener("click", () => {
    playerNamesInput[0].value = "";
    playerNamesInput[1].value = "";
    statusDisplay.innerHTML = "";

    if (game !== undefined) {
        game.resetGameBoard(gameBoxes);
    }
});
