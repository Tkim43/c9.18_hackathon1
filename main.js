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
    initializeStartingPieces();
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

    for(var rows=0; rows < boardSize.rows; rows++){
        var outerLoop = $("<div>").addClass("row");
        gameBoard.append(outerLoop);
        for(var col =0 ;col <boardSize.squares; col++){
                var square = $("<div>").addClass("dynamicSquare");
                outerLoop.append(square);
                square.attr("col", col);
                square.attr("row", rows);

        }
    }
}

function initializeStartingPieces() {
    $("[row='3'][col='3']").addClass('player2Square');
    $("[row='4'][col='4']").addClass('player2Square');
    $("[row='3'][col='4']").addClass('player1Square');
    $("[row='4'][col='3']").addClass('player1Square');
}

var gameBoardArray = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
];
