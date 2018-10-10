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
    displayCurrentPlayer();
    //place enablePiecePlacement
}

//***************************************************************
function enablePiecePlacement(){
    //enable player to click on the valid positions. 
    //if current player clicks on the player's valid positions, 
            //then allow CP to place game piece -- call player1? (append) /
    //else current player click on invalid, don't allow. 
}

//***************************************************************
function player1(){
    checkMoveIfValid();
    //check all valid moves for player 1, place game piece. 
    //call display data to flip all game pieces according to player 1's pieces
    //Change game round 
    gameRound = 2; 
    //wipe away all the click handler. 
}

//***************************************************************
function player2(){
   
    gameRound = 1; 
}

//***************************************************************
// player = $(player1Square) or $(player2Square)
function displayData(player){
    $(event.currentTarget).addClass(player);
}

function displayCurrentPlayer() {
    //Shows who the current player is and call the checkMoveIfValid function
    checkMoveIfValid(gameRound);
}



//***************************************************************
function determineWiner(){

}

//***************************************************************
function startGameBoard(){
    //GameBoard at the start of the game.

}

//***************************************************************
function checkMoveIfValid(gameRound){
//To display all areas that current player can move to 
    enablePiecePlacement(); 
    //call enablePiecePlacement to enable clicking on those positions.
    //event delegation on classes
    
}

function buildGameBoard(){
    var boardSize = { rows: 8, squares: 8 };
    var gameBoard = $('.gameBoardSquares');

    for(var rows=1; rows < boardSize.rows+1; rows++){
        var outerLoop = $("<div>").addClass("row");
        gameBoard.append(outerLoop);
        for(var col =1 ;col <boardSize.squares+1; col++){
                var square = $("<div>").addClass("dynamicSquare");
                outerLoop.append(square);
        }
    }

}