
$(document).ready(init);


//All global variables go down here:
var moveIsValid = false; 
var gameRound = 1;
var storePosition = []; 

var vectorArray = [[-1,-1],[1,1],[-1,0],[0,-1],[-1,1],[1,0],[0,1],[1,-1]];

var gameBoardArray =[[0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,2,1,0,0,0],
                    [0,0,0,1,2,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]];

// // if encounters 0 = green, if 1 = black, if 2 = white; 
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


// if encounters 0 = green, if 1 = black, if 2 = white; 
function buildGame(){
    var gameBoard = $('.gameBoardSquares')
    for (var rows = 0; rows < gameBoardArray.length; rows++) {
        var outerLoop = $("<div>").addClass("row");
        gameBoard.append(outerLoop);
        for (var col = 0; col < gameBoardArray.length; col++) {
            if (gameBoardArray[rows][col] === 0) {
                var newDiv = $('<div>').addClass('dynamicSquare')
                newDiv.attr("row", rows);
                newDiv.attr("col", col);
                outerLoop.append(newDiv)
            }
            else if (gameBoardArray[rows][col] === 1){
                var newDiv1 = $('<div>').addClass('dynamicSquare player1Square')
                newDiv1.attr("row", rows);
                newDiv1.attr("col", col);
                outerLoop.append(newDiv1)
            }
            else {
                var newDiv2 = $('<div>').addClass('dynamicSquare player2Square')
                newDiv2.attr("row", rows);
                newDiv2.attr("col", col);
                outerLoop.append(newDiv2)
            }
        }
    } 
    $('.container').append(gameBoard);
}



//All functions that need to be initialized
function init(){
    // buildGameBoard();
    buildGame();
    $('.dynamicSquare').on('click', checkMoveIfValid);
    // initializeStartingPieces();
    displayCurrentPlayer(gameRound); 
}


function player1(){
    //check all valid moves for player 1, place game piece.
    //Change game round
    console.log('player 1: ', moveIsValid);
    if (moveIsValid === true) {
        gameRound = 2; 
        displayCurrentPlayer(gameRound);
        moveIsValid = false;
    }
    console.log('Game Round: ', gameRound);
}

function player2(){
    console.log('player 2: ', moveIsValid);
    if (moveIsValid === true) {
        gameRound = 1; 
        displayCurrentPlayer(gameRound);
        moveIsValid = false;
    }
    console.log('Game Round: ', gameRound);
}

// player = $(player1Square) or $(player2Square)
function displayData(player){
    $(event.currentTarget).addClass(player);
}

//Display who the current player is based on the game round and allow click. 
function displayCurrentPlayer(gameRound) {

    if (gameRound === 1) {
        //highlight the player 1's position

        $('.playerBorder1').addClass('highlightCP');
        $('.playerBorder2').removeClass('highlightCP');
    }
    else {
        //highlight the player 2's position
        $('.playerBorder2').addClass('highlightCP')
        console.log('is second if statement getting hit?', gameRound);
        $('.playerBorder1').removeClass('highlightCP');
    }
}

function determineWiner(){

}

function startGameBoard(){}
function checkDown() {

}
function checkMoveIfValid(){
    var down = [1,0];
    var up = [-1,0];
    var upLeft = [-1,-1];
    var left = [0,-1];
    var upRight = [-1,1];
    var downRight = [1,1];
    var right = [0,1];
    var downLeft = [1,-1];
    var rowPosition = $(event.currentTarget).attr('row');
    var colPosition = $(event.currentTarget).attr('col');
    var newRowPosition = parseInt(rowPosition);
    var newColPosition = parseInt(colPosition);
    console.log('current position: ', newRowPosition, newColPosition)
    if(checkMoveIfClicked() === true){
        return;
    }
    if(gameBoardArray[newRowPosition + down[0]][newColPosition + down[1]] !== gameRound){
        //if the selected position is next to the opponents piece, move on. 
        console.log("down: 1st if statement", gameBoardArray);
        console.log(newRowPosition, newColPosition);
        // console.log('157: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
        while(gameBoardArray[newRowPosition][newColPosition] !== undefined) {
            if(gameBoardArray[newRowPosition][newColPosition] === gameRound){
                console.log("down: in 2nd if statement");
                if (gameRound === 1 ) {
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    init();
                    moveIsValid = true;
                    player1();
                }
                else {
                    console.log('171: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    init();
                    moveIsValid = true;
                    player2();
                }
                return;
                
            }
            console.log("down: in while loop", gameBoardArray);
            newRowPosition += down[0];
            newColPosition += down[1];
            console.log('181: ', gameBoardArray[newRowPosition][newColPosition] = gameRound); 
        }
    }

    if(gameBoardArray[newRowPosition + up[0]][newColPosition + up[1]] !== gameRound){
        console.log("1st if statement");
        while(gameBoardArray[newRowPosition][newColPosition] !== undefined) {
            console.log("in while loop");
            if(gameBoardArray[newRowPosition][newColPosition] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("in 2nd if statement");
                if (gameRound === 1 ) {
                    $(event.currentTarget).addClass('player1Square');
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    init();
                    moveIsValid = true;
                    player1();
                }
                else {
                    $(event.currentTarget).addClass('player2Square');
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    init();
                    moveIsValid = true;
                    player2();
                }
                return;

            }
            newRowPosition += up[0];
            newColPosition += up[1];
            console.log('181: ', gameBoardArray[newRowPosition][newColPosition] = gameRound); 

        }
    }
    if(gameBoardArray[newRowPosition + left[0]][newColPosition + left[1]] !== gameRound){
        console.log("left: 1st if statement");
        while(gameBoardArray[newRowPosition][newColPosition] !== undefined) {
            console.log("left: in while loop");
            if(gameBoardArray[newRowPosition][newColPosition] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("left: in 2nd if statement");
                if (gameRound === 1 ) {
                    $(event.currentTarget).addClass('player1Square');
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    init();
                    moveIsValid = true;
                    player1();
                }
                else {
                    $(event.currentTarget).addClass('player2Square');
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    init();
                    moveIsValid = true;
                    player2();
                }
                return;

            }
            newRowPosition += left[0];
            newColPosition += left[1];
            console.log('181: ', gameBoardArray[newRowPosition][newColPosition] = gameRound); 

        }
    }

    if(gameBoardArray[newRowPosition + upRight[0]][newColPosition + upRight[1]] !== gameRound){
        console.log("1st if statement");
        while(gameBoardArray[newRowPosition][newColPosition] !== undefined) {
            console.log("in while loop");
            if(gameBoardArray[newRowPosition + upRight[0]][newColPosition + upRight[1]] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("in 2nd if statement");
                if (gameRound === 1 ) {
                    $(event.currentTarget).addClass('player1Square');
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    init();
                    moveIsValid = true;
                    player1();
                }
                else {
                    $(event.currentTarget).addClass('player2Square');
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    init();
                    moveIsValid = true;
                    player2();
                }
                return;

            }
            newRowPosition += upRight[0];
            newColPosition += upRight[1];
            console.log('181: ', gameBoardArray[newRowPosition][newColPosition] = gameRound); 

        }
    }

    if(gameBoardArray[newRowPosition + downRight[0]][newColPosition + downRight[1]] !== gameRound){
        console.log("1st if statement");
        while(gameBoardArray[newRowPosition][newColPosition] !== undefined) {
            console.log("in while loop");
            if(gameBoardArray[newRowPosition][newColPosition] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("in 2nd if statement");
                if (gameRound === 1 ) {
                    $(event.currentTarget).addClass('player1Square');
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    init();
                    moveIsValid = true;
                    player1();
                }
                else {
                    $(event.currentTarget).addClass('player2Square');
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    init();
                    moveIsValid = true;
                    player2();
                }
                return;

            }
            newRowPosition += downRight[0];
            newColPosition += downRight[1];
            console.log('181: ', gameBoardArray[newRowPosition][newColPosition] = gameRound); 

        }
    }

    if(gameBoardArray[newRowPosition + right[0]][newColPosition + right[1]] !== gameRound){
        console.log("right: 1st if statement");
        while(gameBoardArray[newRowPosition][newColPosition] !== undefined) {
            console.log("right: in while loop");
            if(gameBoardArray[newRowPosition][newColPosition] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("right: in 2nd if statement");
                if (gameRound === 1 ) {
                    $(event.currentTarget).addClass('player1Square');
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    init();
                    moveIsValid = true;
                    player1();
                }
                else {
                    $(event.currentTarget).addClass('player2Square');
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    moveIsValid = true;
                    init();
                    player2();
                }
                return;
            }
            newRowPosition += right[0];
            newColPosition += right[1];
            console.log('181: ', gameBoardArray[newRowPosition][newColPosition] = gameRound); 

        }
    }

    if(gameBoardArray[newRowPosition + downLeft[0]][newColPosition + downLeft[1]] !== gameRound){
        console.log("1st if statement");
        while(gameBoardArray[newRowPosition][newColPosition] !== undefined) {
            console.log("in while loop");
            if(gameBoardArray[newRowPosition][newColPosition] === gameRound){
                $(event.currentTarget).addClass('player1Square');
                console.log("in 2nd if statement");
                if (gameRound === 1 ) {
                    $(event.currentTarget).addClass('player1Square');
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    moveIsValid = true;
                    player1();
                }
                else {
                    $(event.currentTarget).addClass('player2Square');
                    console.log('167: ', gameBoardArray[rowPosition][colPosition] = gameRound); 
                    $('.gameBoardSquares').empty();
                    moveIsValid = true;
                    player2();
                }
                return;

            }
            newRowPosition += downLeft[0];
            newColPosition += downLeft[1];
            console.log('181: ', gameBoardArray[newRowPosition][newColPosition] = gameRound); 

        }
    }

}

function checkMoveIfClicked(){
    if($(event.currentTarget).hasClass('player1Square') || $(event.currentTarget).hasClass('player2Square')){
                return true;
    }
}
    // function buildGameBoard(){
    //     var boardSize = { rows: 8, squares: 8 };
    //     var gameBoard = $('.gameBoardSquares');

    //     for(var rows=0; rows < boardSize.rows; rows++){
    //         var outerLoop = $("<div>").addClass("row");
    //         gameBoard.append(outerLoop);
    //         for(var col =0 ;col <boardSize.squares; col++){
    //             var square = $("<div>").addClass("dynamicSquare");
    //             outerLoop.append(square);
    //             square.attr("col", col);
    //             square.attr("row", rows);
    //         }
    //     }

    // }

// function initializeStartingPieces() {
//     $("[row='3'][col='3']").addClass('player2Square');
//     $("[row='4'][col='4']").addClass('player2Square');
//     $("[row='3'][col='4']").addClass('player1Square');
//     $("[row='4'][col='3']").addClass('player1Square');
// }

