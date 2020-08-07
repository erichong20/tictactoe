const GameBoard = (() => {
    let htmlBoard = document.querySelector(".board");

    //array of rows
    let board = [["","",""],["","",""],["","",""]];
    
    const render = () => {
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                let square = document.createElement("div");
                square.innerHTML = board[row][col];
                square.classList.add("grid-square");

                square.addEventListener("click", function(){
                    GameController.onClick(row,col)
                })

                htmlBoard.appendChild(square);
            }
        }
    }

    const getBoard = () => {
        return board;
    }

    const clearBoard = () => {
        board = [["","",""],["","",""],["","",""]];
    }

    const setBoard = (row,col,mark) => {
        board[row][col] = mark;
    }

    return {render, getBoard, clearBoard, setBoard}
})();

const playerFactory = (name, mark) => {
    const getMark = () => {
        return mark;
    }

    const getName = () => {
        return name;
    }

    return {getMark, getName}
}

const GameController = (() => {
    let htmlBoard = document.querySelector(".board");
    let playerTurn;
    let player1;
    let player2;

    const newRound = () => {
        player1 = playerFactory("Eric","X");
        player2 = playerFactory("Kani","O");
        playerTurn = player1;

        _addRestartListener();
    }

    const onClick = (row,col) => {
        //check if the box is already full
        //if the box is empty, add the mark and change the turn
        let b = GameBoard.getBoard();
        if(b[row][col] === ""){
            GameBoard.setBoard(row,col,playerTurn.getMark());
            htmlBoard.innerHTML = "";
            GameBoard.render();
            playerTurn = playerTurn === player1 ? player2 : player1;
        }

        if(checkForWin() !== "no winner"){
            //check which player won
            //display message of congratulations
            if(checkForWin() === player1.getMark()){
                window.alert(`${player1.getName()} wins!`);
            } else {
                window.alert(`${player2.getName()} wins!`);
            }
        } else if (checkForTie()){
            window.alert("The game ends in a tie!");
        }
    }

    const endGame = () => {

    }

    const checkForWin = () => {
        let b = GameBoard.getBoard();
        console.table(b);
        //check for horizontal win
        if(b[0].every(x => x===b[0]) && b[0][0] !== ""){
            return b[0][0];
        } else if(b[1].every(x => x===b[1]) && b[1][0] !== ""){
            return b[1][0];
        } else if(b[2].every(x => x===b[2]) && b[2][0] !== ""){
            return b[2][0];
        }

        //check for vertical win
        if(b[0][0] === b[1][0] && b[0][0] === b[2][0] && b[0][0] !== ""){
            return b[0][0];
        } else if(b[0][1] === b[1][1] && b[0][1] === b[2][1] && b[0][1] !== ""){
            return b[0][1];
        } else if(b[0][2] === b[1][2] && b[0][2] === b[2][2] && b[0][2] !== ""){
            return b[0][2];
        }

        //check for diagonal win
        if(b[0][0] === b[1][1] && b[0][0] === b[2][2] && b[0][0] !== ""){
            return b[0][0];
        } else if(b[0][2] === b[1][1] && b[0][2] === b[2][0] && b[0][2] !== ""){
            return b[0][2];
        }

        return "no winner";
    }

    const checkForTie = () => {
        if(checkForWin() === "no winner"){
            //check if board is full
            if(!(GameBoard.getBoard().some(row => row.includes("")))){
                return true;
            }
        }
        return false;
    }

    //private
    const _addRestartListener = () => {
        let startGame = document.querySelector(".start");
        startGame.addEventListener("click", function() {
        GameBoard.clearBoard();
        htmlBoard.innerHTML = "";
        GameBoard.render();
    });
    }

    return{newRound, onClick}
})();


GameBoard.render();

GameController.newRound();