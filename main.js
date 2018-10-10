$(document).ready(init);   
//***************************************************************
//All global variables go down here:
var player1 = 1;
var player2 = 2;
var gameRound = 1; 


//***************************************************************
//All functions that need to be initialized 
function init(){
    buildGameBoard();
    $('.innerSquare').on('click', clickHandler)
}

//***************************************************************
function clickHandler(){
    //if it's game round 1, then it's player 1's turn. call player1.
    //if it's game round 2, then it's player 2's turn. call player 2.
    if ( gameRound === 1 ) {
        player1(); 
    } 
    else {
        player2(); 
    }
}

//***************************************************************
function player1(){
    checkMoveIfValid() 
    //check all valid moves for player 1, place game piece. 
    //call display data to flip all game pieces according to player 1's pieces
    //Change game round 
    gameRound = 2; 
}

//***************************************************************
function player2(){

    gameRound = 1; 
}

//***************************************************************
function displayData(){

}

//***************************************************************
function determineWiner(){

}

//***************************************************************
function startGameBoard(){
    
}

//***************************************************************
function checkMoveIfValid(){

}

function buildGameBoard(){
    var boardSize = { rows: 8, squares: 8 };
    var gameBoard = $('#game-board');

    for(var rows=1; rows < boardSize.rows+1; rows++){
        var outerLoop = $("<div>").addClass("row");
        gameBoard.append(outerLoop);
        for(var col =1 ;col <boardSize.squares+1; col++){
                var square = $("<div>").addClass("dynamicSquare");
                outerLoop.append(square);
        }
    }

}