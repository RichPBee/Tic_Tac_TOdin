//Module patten Gameboard object. This creates and returns a blank board. {That can be updated?}
const Gameboard = (() => {
    const boardArray = [];
    const createBoard = () => {
        for (let i = 0; i < 3 ; i++ ){ 
            boardArray.push(["X", "O", "X"])
        }
        return boardArray;
    }

    const updateGameboard = () => {

    }
    return {
        createBoard,
        boardArray,
    };

})();

const gameStateChecker = ((array) => { 


    return
})

//
const displayController = ((array) => {
    const getArray = () => array;
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
            }
        }
        return gameArea;
    };
    return {
        getArray,
        createDisplay,
    };

})();

const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    
    
    return {name, marker}
}


Gameboard.createBoard();
displayController.createDisplay(Gameboard.boardArray);
