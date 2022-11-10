let turnCounter = 0;
let currentlyPlaying = false;
let player1;
let player2;

//Module patten Gameboard object. This creates and returns a blank board. {That can be updated?}
const Gameboard = ((player) => {
    const boardArray = [];
    const onePlayerButton = document.querySelector("#OneP");
    const twoPlayerButton = document.querySelector("#TwoP");


    const createBoard = () => {
        for (let i = 0; i < 3 ; i++ ){ 
            boardArray.push(["", "", ""])
        }
        return boardArray;
    }

    const updateGameboard = (squareId, marker, array = boardArray) => {
        const idArray = squareId.split(":");
        boardArray[idArray[0]][idArray[1]] = marker;
        turnCounter++;
    }

    const resetBoard = (array) => {
        for (let i = 0; i < array.length; i ++) {
            for (let j = 0; j < array[i].length; j++) {
                array[i][j] = "";
            }
        }
        startButton.addEventListener("click", startGame);
    }

    const startButton = document.querySelector(".start");
    const startGame = () => {
        currentlyPlaying = true;
        startButton.removeEventListener("click", startGame);
        startButton.innerHTML = "PLAYING";
        if (twoPlayerButton.checked) {
            let playerOneName = window.prompt("Player One (O) name: ", "John");
            player1 = Player(playerOneName, "O")
            let playerTwoName = window.prompt("Player Two (X) name: ", "Terry");
            player2 = Player(playerOneName, "X")
        } else {
            let playerOneName = window.prompt("Player One (O) name: ", "John");
            player1 = Player(playerOneName, "O");
            computer = Player("Computer", "X")
        }
    }
    startButton.addEventListener("click", startGame);

    


    return {
        createBoard,
        boardArray,
        updateGameboard,
        resetBoard,
        startButton,
    };

})();


//Module to check whether the game has been won or if the board is complete with no win.
const GameStateChecker = (() => { 
    let winState = false;
    let winnerSymbol = "";

    const checkRows = (array) => {
        for (let i = 0; i < array.length ; i++) {
            if (array[i].join('') === "XXX" || array[i].join === "OOO") {
                winState = true;
                winnerSymbol = array[i][0];
            } 
        }
        return winState;
    }

    const checkColumns = (array) => {
        let solutionString = "";
        for (let innerIndex = 0; innerIndex < 3; innerIndex++){
            for (let i = 0; i < array.length ; i++) {
                if (array[i][innerIndex] !== "") {
                    solutionString += array[i][innerIndex] ;
                } else {
                    solutionString += "B"
                }
            }
        }
        checkString(solutionString);
    }

    const checkLTRDiagonal = (array) => {
        if (array[0][0] === array[1][1] && array[0][0] === array[2][2] && array[1][1] !== "") {
            winnerSymbol = array[1][1];
            return winState = true;
        }
    }

    const checkRTLDiagonal = (array) => {
        if (array[0][2] === array[1][1] && array[2][0] === array[1][1] && array[1][1] !== "") {
            winnerSymbol = array[1][1];
            return winState = true;
        }
    }

    const checkString = (string) => {
        for (let i = 0 ; i <= string.length; i += 3) {
            if (string.slice(i, i + 3) === "XXX" || string.slice(i, i + 3) === "OOO") {
                winState = true;
                winnerSymbol = string.slice(i,i+1);
            }
        }
        return winState;
    }
    
    const finalStateCheck = (array) => {
        let boardString = "";
        for (let i = 0; i < array.length; i++) {
            boardString += array[i].join("");
        }
        if (boardString.length < 9) {
            return
        } else {
            location.reload();
        }
    }

    const checkWinState = () => {
        checkRows(Gameboard.boardArray);
        checkColumns(Gameboard.boardArray);
        checkLTRDiagonal(Gameboard.boardArray);
        checkRTLDiagonal(Gameboard.boardArray);
        if (winState === true) {
            //Winning condition function
            if (winnerSymbol === "O") {
                window.alert(`${player1.name} wins!`)
            } else {
                window.alert(`${player2.name} wins!`)
            }
            location.reload();
        } else {
            finalStateCheck(Gameboard.boardArray);
        }
    }

    return {
        checkWinState,
    }
})();

//Module that controls the display. 
const displayController = ((array) => {
    const gameArea = document.querySelector(".gameArea");
    
    
    const createDisplay = (array) => {
        for (let i = 0 ; i < array.length ; i ++) {
            for (let j = 0; j < array[i].length; j++) { 
                const boardSection = document.createElement("div");
                let gameArea = document.querySelector(".gameArea");
                boardSection.innerHTML = array[i][j];
                boardSection.setAttribute("class", "boardSection");
                boardSection.setAttribute("id", `${i}:${j}`);
                gameArea.appendChild(boardSection);

                boardSection.addEventListener("click", () => {
                    if (currentlyPlaying === false) {
                        return;
                    } else if (boardSection.innerHTML === "") {
                        if (turnCounter % 2 == 0) {
                            updateDisplay(boardSection, player2.marker);
                            Gameboard.updateGameboard(boardSection.id, player2.marker);
                            GameStateChecker.checkWinState()
                        } else {
                            updateDisplay(boardSection, player1.marker);
                            Gameboard.updateGameboard(boardSection.id, player1.marker);
                            GameStateChecker.checkWinState()
                        }
                        return;
                    } else {
                        changeSectionColor(boardSection, "red");
                        return;
                    }
                });
                boardSection.addEventListener("mouseover", () => {
                    if (currentlyPlaying === false) {
                        return;
                    } else if (boardSection.innerHTML === "") {
                        changeSectionColor(boardSection, "rgba(177, 177, 177, 0.5)");
                    } else {
                        return;
                    }
                });
                boardSection.addEventListener("mouseout", () => {
                    changeSectionColor(boardSection, "grey");
                })
            }
        }
        turnCounter++;

        return gameArea;
    };

    const updateDisplay = (square, marker, array = Gameboard.boardArray) => {
        square.innerHTML = marker;
    }

    const changeSectionColor = (square, colour) => {
        square.style.backgroundColor = colour;
    }


    const resetButton = document.querySelector(".reset");
    resetButton.addEventListener("click", () => {
        for (let i = 0; i < Gameboard.boardArray.length; i++) {
            for (let j = 0; j < Gameboard.boardArray[i].length; j++) {
                let currentSquare = document.getElementById(`${i}:${j}`);
                currentSquare.innerHTML = ""
            }
        }
        Gameboard.resetBoard(Gameboard.boardArray);
        Gameboard.startButton.innerHTML = "START";
        currentlyPlaying = false;  
    })


    return {
        createDisplay,
    };

})();


//Simple factory function to create player objects.
const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    
    
    return {name, marker}
}

Gameboard.createBoard();
displayController.createDisplay(Gameboard.boardArray);
