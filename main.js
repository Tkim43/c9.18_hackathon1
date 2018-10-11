
$(document).ready(init);


//All global variables go down here:
var moveIsValid = false;
var gameRound = 1;
var storePosition = [];
var black = [];
var white = [];
var blackCount = 0;
var whiteCount = 0;
var boardSize = { rows: 8, squares: 8 };
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
// function buildGame(){
//     var gameBoard = $('.gameBoardSquares')
//     for (var rows = 0; rows < gameBoardArray.length; rows++) {
//         var outerLoop = $("<div>").addClass("row");
//         gameBoard.append(outerLoop);
//         for (var col = 0; col < gameBoardArray.length; col++) {
//             if (gameBoardArray[rows][col] === 0) {
//                 var newDiv = $('<div>').addClass('dynmaicSquare')
//                 newDiv.attr("row", rows);
//                 newDiv.attr("col", col);
//                 outerLoop.append(newDiv)
//             }
//             else if (gameBoardArray[rows][col] === 1){
//                 var newDiv1 = $('<div>').addClass('playerSquare1')
//                 newDiv1.attr("row", rows);
//                 newDiv1.attr("col", col);
//                 outerLoop.append(newDiv1)
//             }
//             else {
//                 var newDiv2 = $('<div>').addClass('playerSquare2')
//                 newDiv2.attr("row", rows);
//                 newDiv2.attr("col", col);
//                 outerLoop.append(newDiv2)
//             }
//         }
//     } 
//     $('.container').append(gameBoard);
// }

//All functions that need to be initialized
function init(){
    buildGameBoard();
    $('.dynamicSquare').on('click', checkMoveIfValid);
    initializeStartingPieces();
    checkWhiteOrBlack();
    // displayCurrentPlayer(gameRound);
}
function checkWhiteOrBlack(){
    for(var t = 0; t < boardSize.rows; t++){
        for(var z = 0;  z< boardSize.col; z++){
            if(gameBoardArray[t][z] === 1){
                //black
                black.push([t,z]);
                blackCount++;

            }
            else if(gameBoardArray[t][z] === 2){
                //white
                white.push([t,z]);
                whiteCount++;
            }
        }
    }
    console.log(black, white);
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
// function displayData(player){
//     $(event.currentTarget).addClass(player);
// }

// Display who the current player is based on the game round and allow click.
function displayCurrentPlayer(gameRound) {

    if (gameRound === 1) {
        //highlight the player 1's position

        $('.playerBorder1').addClass('highlightCP');
        $('.playerBorder2').removeClass('highlightCP');
    }
    else {
        //highlight the player 2's position
        $('.playerBorder2').addClass('highlightCP');
        console.log('is second if statement getting hit?', gameRound);
        $('.playerBorder2').addClass('highlightCP');
        $('.playerBorder1').removeClass('highlightCP');
    }
}

function determineWiner(){

}

function startGameBoard() {
}
function checkDown() {

}
function checkMoveIfValid() {
    var down = [1, 0];
    var up = [-1, 0];
    var upLeft = [-1, -1];
    var left = [0, -1];
    var upRight = [-1, 1];
    var downRight = [1, 1];
    var right = [0, 1];
    var downLeft = [1, -1];
    var rowPosition = $(event.currentTarget).attr('row');
    var colPosition = $(event.currentTarget).attr('col');
    var colPositionNew = parseInt(colPosition);
    var rowPositionNew = parseInt(rowPosition);
    console.log('current position: ', rowPositionNew, colPositionNew);

    // if its a previous clicked position don't let them click
    if (gameBoardArray[rowPositionNew][colPositionNew] === 1 || gameBoardArray[rowPositionNew][colPositionNew] === 2) {
        return;
    }
    // if its player 1
    if (gameRound === 1) {
        // if its empty and not undefined
        if (gameBoardArray[rowPositionNew][colPositionNew] === 0 && gameBoardArray[rowPositionNew][colPositionNew] !== undefined) {
            // if its the positions down
            if (gameBoardArray[rowPositionNew + down[0]][colPositionNew + down[1]] === 2) {
                console.log(gameBoardArray[rowPosition + down[0][colPosition + down[1]]]);
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player2Square');
                player1();
                moveIsValid = true;

            }
            if(gameBoardArray[rowPositionNew + up[0]][colPositionNew + up[1]] ===2){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player2Square');
                player1();
                moveIsValid = true;
            }
            if(gameBoardArray[rowPositionNew + upLeft[0]][colPositionNew + upLeft[1]] ===2){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player2Square');
                player1();
                moveIsValid = true;
            }
            if(gameBoardArray[rowPositionNew + upRight[0]][colPositionNew + upRight[1]]===2){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player2Square');
                player1();
                moveIsValid = true;
            }
            if(gameBoardArray[rowPositionNew + left[0]][colPositionNew + left[1]] === 2){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player2Square');
                player1();
                moveIsValid = true;
            }
            if(gameBoardArray[rowPositionNew + downRight[0]][colPositionNew + downRight[1]] ===2){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player2Square');
                player1();
                moveIsValid = true;
            }
            if(gameBoardArray[rowPositionNew + right[0]][colPositionNew + right[1]] === 2){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player2Square');
                player1();
                moveIsValid = true;
            }
            if(gameBoardArray[rowPositionNew + downLeft[0]][colPositionNew + downLeft[1]] === 2){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player2Square');
                player1();
                moveIsValid = true;
            }

        }

    }


    // if its player 2
    else if (gameRound === 2) {
        // if its empty and not undefined
        if (gameBoardArray[rowPositionNew][colPositionNew] === 0 && gameBoardArray[rowPositionNew][colPositionNew] !== undefined) {
            // the down position has an opp color add color to current event
            if (gameBoardArray[rowPositionNew + down[0]][colPositionNew + down[1]] === 1) {
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player1Square');
                moveIsValid = true;
                player2();
            }
            if(gameBoardArray[rowPositionNew + up[0]][colPositionNew + up[1]] === 1){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player1Square');
                moveIsValid = true;
                player2();
            }
            if(gameBoardArray[rowPositionNew + upLeft[0]][colPositionNew + upLeft[1]] === 1){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player1Square');
                moveIsValid = true;
                player2();
            }
            if(gameBoardArray[rowPositionNew + upRight[0]][colPositionNew + upRight[1]] ===1){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player1Square');
                moveIsValid = true;
                player2();
            }
            if(gameBoardArray[rowPositionNew + left[0]][colPositionNew + left[1]]===1){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player1Square');
                moveIsValid = true;
                player2();
            }
            if(gameBoardArray[rowPositionNew + downRight[0]][colPositionNew + downRight[1]]===1){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player1Square');
                moveIsValid = true;
                player2();
            }
            if(gameBoardArray[rowPositionNew + right[0]][colPositionNew + right[1]]===1){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player1Square');
                moveIsValid = true;
                player2();
            }
            if(gameBoardArray[rowPositionNew + downLeft[0]][colPositionNew + downLeft[1]]===1){
                console.log("I found the opp color");
                $(event.currentTarget).addClass('player1Square');
                moveIsValid = true;
                player2();
            }

        }
    }

}


// if (gameBoardArray[rowPosition + down[0]][colPosition + down[1]] !== gameRound) {
//     console.log("down: 1st if statement");
//     while (gameBoardArray[rowPosition][colPosition] !== undefined) {
//         console.log("down: in while loop");
//         storePosition.push("row = ", rowPosition);
//         if (gameBoardArray[rowPosition][colPosition] === gameRound) {
//             //convert this to the position that's at this div.
//             //As it passes through and finds the end of the player's color, color all the boxes in-between.
//             //record the times it moves and back track to highlight? For loop?
//             console.log("down: in 2nd if statement");
//             if (gameRound === 1) {
//                 $(event.currentTarget).addClass('player1Square');
//                 moveIsValid = true;
//                 player1();
//             }
//             else {
//                 $(event.currentTarget).addClass('player2Square');
//                 moveIsValid = true;
//                 player2();
//             }
//             return;
//
//         }
//         rowPosition += down[0];
//         colPosition += down[1];
//     }
// }
//
//     if(gameBoardArray[rowPosition + up[0]][colPosition + up[1]] !== gameRound){
//         console.log("1st if statement");
//         while(gameBoardArray[rowPosition][colPosition] !== undefined) {
//             console.log("in while loop");
//             if(gameBoardArray[rowPosition][colPosition] === gameRound){
//                 $(event.currentTarget).addClass('player1Square');
//                 console.log("in 2nd if statement");
//                 if (gameRound === 1 ) {
//                     $(event.currentTarget).addClass('player1Square');
//                     moveIsValid = true;
//                     player1();
//                 }
//                 else {
//                     $(event.currentTarget).addClass('player2Square');
//                     moveIsValid = true;
//                     player2();
//                 }
//                 return;
//
//             }
//             rowPosition += up[0];
//             colPosition += up[1];
//         }
//     }
//     if(gameBoardArray[rowPosition + left[0]][colPosition + left[1]] !== gameRound){
//         console.log("left: 1st if statement");
//         while(gameBoardArray[rowPosition][colPosition] !== undefined) {
//             console.log("left: in while loop");
//             if(gameBoardArray[rowPosition][colPosition] === gameRound){
//                 $(event.currentTarget).addClass('player1Square');
//                 console.log("left: in 2nd if statement");
//                 if (gameRound === 1 ) {
//                     $(event.currentTarget).addClass('player1Square');
//                     moveIsValid = true;
//                     player1();
//                 }
//                 else {
//                     $(event.currentTarget).addClass('player2Square');
//                     moveIsValid = true;
//                     player2();
//                 }
//                 return;
//
//             }
//             rowPosition += left[0];
//             colPosition += left[1];
//         }
//     }
//
//     if(gameBoardArray[rowPosition + upRight[0]][colPosition + upRight[1]] !== gameRound){
//         console.log("1st if statement");
//         while(gameBoardArray[rowPosition][colPosition] !== undefined) {
//             console.log("in while loop");
//             if(gameBoardArray[rowPosition + upRight[0]][colPosition + upRight[1]] === gameRound){
//                 $(event.currentTarget).addClass('player1Square');
//                 console.log("in 2nd if statement");
//                 if (gameRound === 1 ) {
//                     $(event.currentTarget).addClass('player1Square');
//                     moveIsValid = true;
//                     player1();
//                 }
//                 else {
//                     $(event.currentTarget).addClass('player2Square');
//                     moveIsValid = true;
//                     player2();
//                 }
//                 return;
//
//             }
//             rowPosition += upRight[0];
//             colPosition += upRight[1];
//         }
//     }
//
//     if(gameBoardArray[rowPosition + downRight[0]][colPosition + downRight[1]] !== gameRound){
//         console.log("1st if statement");
//         while(gameBoardArray[rowPosition][colPosition] !== undefined) {
//             console.log("in while loop");
//             if(gameBoardArray[rowPosition][colPosition] === gameRound){
//                 $(event.currentTarget).addClass('player1Square');
//                 console.log("in 2nd if statement");
//                 if (gameRound === 1 ) {
//                     $(event.currentTarget).addClass('player1Square');
//                     moveIsValid = true;
//                     player1();
//                 }
//                 else {
//                     $(event.currentTarget).addClass('player2Square');
//                     moveIsValid = true;
//                     player2();
//                 }
//                 return;
//
//             }
//             rowPosition += downRight[0];
//             colPosition += downRight[1];
//         }
//     }
//
//     if(gameBoardArray[rowPosition + right[0]][colPosition + right[1]] !== gameRound){
//         console.log("right: 1st if statement");
//         while(gameBoardArray[rowPosition][colPosition] !== undefined) {
//             console.log("right: in while loop");
//             if(gameBoardArray[rowPosition][colPosition] === gameRound){
//                 $(event.currentTarget).addClass('player1Square');
//                 console.log("right: in 2nd if statement");
//                 if (gameRound === 1 ) {
//                     $(event.currentTarget).addClass('player1Square');
//                     moveIsValid = true;
//                     player1();
//                 }
//                 else {
//                     $(event.currentTarget).addClass('player2Square');
//                     moveIsValid = true;
//                     player2();
//                 }
//                 return;
//             }
//             rowPosition += right[0];
//             colPosition += right[1];
//         }
//     }
//
//     if(gameBoardArray[rowPosition + downLeft[0]][colPosition + downLeft[1]] !== gameRound){
//         console.log("1st if statement");
//         while(gameBoardArray[rowPosition][colPosition] !== undefined) {
//             console.log("in while loop");
//             if(gameBoardArray[rowPosition][colPosition] === gameRound){
//                 $(event.currentTarget).addClass('player1Square');
//                 console.log("in 2nd if statement");
//                 if (gameRound === 1 ) {
//                     $(event.currentTarget).addClass('player1Square');
//                     moveIsValid = true;
//                     player1();
//                 }
//                 else {
//                     $(event.currentTarget).addClass('player2Square');
//                     moveIsValid = true;
//                     player2();
//                 }
//                 return;
//
//             }
//             rowPosition += downLeft[0];
//             colPosition += downLeft[1];
//         }
//     }
//
// }

// function checkMoveIfClicked(){
//     if($(event.currentTarget).hasClass('player1Square') || $(event.currentTarget).hasClass('player2Square')){
//                 return true;
//     }
// }
function buildGameBoard(){

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
