
$(document).ready(init);


//All global variables go down here:
var player1 = 1;
var player2 = 2;
var gameRound = 1;
var positionsArray = [];

var vectorArray = [[-1,-1],[1,1],[-1,0],[0,-1],[-1,1],[1,0],[0,1],[1,-1]];

var gameBoardArray =[[0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,2,1,0,0,0],
                    [0,0,0,1,2,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]];

//if encounters 0 = green, if 1 = black, if 2 = white; 
// function buildGame(){
//     var gameBoardSquares = $('.gameBoardSquares')
//     for (var i = 0; i < gameBoardArray.length; i++) {
//         for (var j = 0; j < gameBoardArray.length; j++) {
//             if (gameBoardArray[i][j] === 0) {
//                 var newDiv = $('<div>').addClass('dynmaicSquare')
//                 $('.gameBoardSquares').append(newDiv)
//             }
//             else if (gameBoardArray[i][j] === 2) {
//                 var newDiv2 = $('<div>').addClass('.playerSquare2')
//                 $('.gameBoardSquares').append(newDiv2)
//             }
//             else {
//                 var newDiv1 = $('<div>').addClass('.playerSquare1')
//                 $('.gameBoardSquares').append(newDiv1)
//             }
//         }
//     } 
//     $('.playerContainer').append(gameBoardSquares);
// }

//All functions that need to be initialized
function init(){
    buildGameBoard();


    $('.dynamicSquare').on('click', checkMoveIfValid);
    initializeStartingPieces();

    displayCurrentPlayer(gameRound)

}

function clickHandler(){
    //if it's game round 1, then it's player 1's turn. call player1.
    //if it's game round 2, then it's player 2's turn. call player 2.

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
    if (gameRound === 1) {
        //highlight the player 1's position
        $('.playerBorder1').addClass('highlightCP')
        
    }
    else {
        //highlight the player 2's position
        $('.playerBorder2').addClass('highlightCP')
    }
}

function determineWinner(){

}

function startGameBoard(){

}

function checkMoveIfValid(player){
   var down = [1,0];
   var rowPosition = $(event.currentTarget).attr('row');
   console.log(rowPosition);
   var colPosition = $(event.currentTarget).attr('col');
   console.log(colPosition);
   if(gameBoardArray[rowPosition + down[1]][colPosition + down[0]] !== player){
       console.log("1st if statement");
      while(gameBoardArray[rowPosition][colPosition] !== undefined) {
          console.log("in while loop");
          if(gameBoardArray[rowPosition][colPosition] === player){
                  gameBoardArray[rowPosition][colPosition].addClass('player1square');
                  console.log("in 2nd if statement");

          }
          rowPosition += down[0];
          colPosition += down[1];
   var rowPosition = parseInt($(event.currentTarget).attr('row'));
   var colPosition = parseInt($(event.currentTarget).attr('col'));
   console.log(rowPosition);
   console.log(colPosition);
   console.log(rowPosition + down[0]);
   console.log(colPosition + down[1]);
   var newRowPosition = rowPosition + down[0];
   var newColPosition = colPosition + down[1];
   if(gameBoardArray[newRowPosition][newColPosition] !== 1){
       console.log("1st if statement");
      while(gameBoardArray[newRowPosition][newColPosition] !== undefined) {
          console.log("in while loop");
          if(gameBoardArray[newRowPosition][newColPosition] === 1){
                //target the original position we've clicked and change that color. 
                //target all the position we've passed through and change that color. 
                // $('.dynamicSquare').addClass('.player1Square')

                  $(event.currentTarget).addClass('player1square');
                  console.log("in 2nd if statement");
                  return;
          }
          newRowPosition += down[0];
          newColPosition += down[1];
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

