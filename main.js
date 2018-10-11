
$(document).ready(init);


//All global variables go down here:
var player1 = 1;
var player2 = 2;
var gameRound = 1;

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

function player1(){
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
    var down = [1,0];
    var up = [-1,0];
    var left = [0,-1];
    var upRight = [-1,1];
    var downRight = [1,1];
    var right = [0,1];
    var downLeft = [1,-1];
    var rowPosition = $(event.currentTarget).attr('row');
    var colPosition = $(event.currentTarget).attr('col');
    colPosition = parseInt(colPosition);
    rowPosition = parseInt(rowPosition);
    if(gameBoardArray[rowPosition + down[0]][colPosition + down[1]] !== gameRound && gameBoardArray[rowPosition] !== undefined){
        console.log("1st if statement");
        while(gameBoardArray[rowPosition][colPosition] !== undefined && gameBoardArray[rowPosition] !== undefined) {
            console.log("in while loop");
            if(gameBoardArray[rowPosition][colPosition] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("in 2nd if statement");
                return;

            }
            rowPosition += down[0];
            colPosition += down[1];
        }
    }

    if(gameBoardArray[rowPosition + up[0]][colPosition + up[1]] !== gameRound){
        console.log("1st if statement");
        while(gameBoardArray[rowPosition][colPosition] !== undefined) {
            console.log("in while loop");
            if(gameBoardArray[rowPosition][colPosition] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("in 2nd if statement");
                return;

            }
            rowPosition += up[0];
            colPosition += up[1];
        }
    }
    if(gameBoardArray[rowPosition + left[0]][colPosition + left[1]] !== gameRound){
        console.log("1st if statement");
        while(gameBoardArray[rowPosition][colPosition] !== undefined) {
            console.log("in while loop");
            if(gameBoardArray[rowPosition][colPosition] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("in 2nd if statement");
                return;

            }
            rowPosition += left[0];
            colPosition += left[1];
        }
    }

    if(gameBoardArray[rowPosition + upRight[0]][colPosition + upRight[1]] !== gameRound){
        console.log("1st if statement");
        while(gameBoardArray[rowPosition][colPosition] !== undefined) {
            console.log("in while loop");
            if(gameBoardArray[rowPosition][colPosition] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("in 2nd if statement");
                return;

            }
            rowPosition += upRight[0];
            colPosition += upRight[1];
        }
    }

    if(gameBoardArray[rowPosition + downRight[0]][colPosition + downRight[1]] !== gameRound){
        console.log("1st if statement");
        while(gameBoardArray[rowPosition][colPosition] !== undefined) {
            console.log("in while loop");
            if(gameBoardArray[rowPosition][colPosition] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("in 2nd if statement");
                return;

            }
            rowPosition += downRight[0];
            colPosition += downRight[1];
        }
    }

    if(gameBoardArray[rowPosition + right[0]][colPosition + right[1]] !== gameRound){
        console.log("1st if statement");
        while(gameBoardArray[rowPosition][colPosition] !== undefined) {
            console.log("in while loop");
            if(gameBoardArray[rowPosition][colPosition] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("in 2nd if statement");
                return;

            }
            rowPosition += right[0];
            colPosition += right[1];
        }
    }

    if(gameBoardArray[rowPosition + downLeft[0]][colPosition + downLeft[1]] !== gameRound){
        console.log("1st if statement");
        while(gameBoardArray[rowPosition][colPosition] !== undefined) {
            console.log("in while loop");
            if(gameBoardArray[rowPosition][colPosition] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("in 2nd if statement");
                return;

            }
            rowPosition += downLeft[0];
            colPosition += downLeft[1];
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
