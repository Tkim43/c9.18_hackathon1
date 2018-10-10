
$(document).ready(init);


//All global variables go down here:
var player1 = 1;
var player2 = 2;
var gameRound = 1;
var positionsArray = [];

var vectorArray = [[-1,-1],[1,1],[-1,0],[0,-1],[-1,1],[1,0],[0,1],[1,-1]];

//All functions that need to be initialized
function init(){
    buildGameBoard();

    $('.innerSquare').on('click', clickHandler);
    initializeStartingPieces();

    displayCurrentPlayer(gameRound)

}

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

function player1(){
    checkMoveIfValid();
    //check all valid moves for player 1, place game piece. 
    //call display data to flip all game pieces according to player 1's pieces
    //Change game round 
    gameRound = 2; 
}

function player2(){

    gameRound = 1; 

}

// player = $(player1Square) or $(player2Square)
function displayData(player){
    $(event.currentTarget).addClass(player);
}


function displayCurrentPlayer(gameRound) {
    console.log('is this being hit?');
    if (gameRound === 1) {
        //highlight the player 1's position
        console.log('is first if statement getting hit?');
        $('.playerBorder1').addClass('highlightCP')
    }
    else {
        //highlight the player 2's position
        console.log('is second if statement getting hit?');
        $('.playerBorder2').addClass('highlightCP')
    }
}

function determineWiner(){

}

function startGameBoard(){

}

function checkMoveIfValid(){
    var squareElementColor = $(event.currentTarget).css("background-color");
    var rowPosition = $(event.currentTarget).attr('row');
    var colPosition = $(event.currentTarget).attr('col');

    positionsArray.push(rowPosition,colPosition);
    for(var x =0; x < vectorArray.length; x++){
        var newPosition = vectorArray[x] + positionsArray;
        var newPositionColor = $(newPosition).css("background-color");
        if(newPositionColor !== squareElementColor){
            newPositionColor = squareElementColor;
        }
        else{
            return;
        }
    }

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

   var gameBoardArray =[[0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,2,1,0,0,0],
                        [0,0,0,1,2,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0]];