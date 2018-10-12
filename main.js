
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
 
var blackCount=0; 
var whiteCount=0;   

// if encounters 0 = green, if 1 = black, if 2 = white; 
function buildGame(){
    var gameBoard = $('.gameBoardSquares')
    for (var rows = 0; rows < gameBoardArray.length; rows++) {
        var outerLoop = $("<div>").addClass("row");
        gameBoard.append(outerLoop);
        for (var col = 0; col < gameBoardArray.length; col++) {
            if (gameBoardArray[rows][col] === 0) {
                var newDiv = $('<div>').addClass('dynamicSquare')
                // var new2Div = $('<div>').addClass('gamePieceDiv')
                newDiv.attr("row", rows);
                newDiv.attr("col", col);
                outerLoop.append(newDiv)

                // new2Div.attr("row", rows);
                // new2Div.attr("col", col);
                // outerLoop.append(new2Div)
            }
            else if (gameBoardArray[rows][col] === 1){
                var newDiv1 = $('<div>').addClass('dynamicSquare player1Square')
                // var new2Div = $('<div>').addClass('gamePieceDiv')
                newDiv1.attr("row", rows);
                newDiv1.attr("col", col);
                outerLoop.append(newDiv1);

                // new2Div.attr("row", rows);
                // new2Div.attr("col", col);
                // outerLoop.append(new2Div);
            }
            else {
                var newDiv2 = $('<div>').addClass('dynamicSquare player2Square')
                // var new2Div1 = $('<div>').addClass('gamePieceDiv')
                newDiv2.attr("row", rows);
                newDiv2.attr("col", col);
                outerLoop.append(newDiv2)

                // new2Div1.attr("row", rows);
                // new2Div1.attr("col", col);
                // outerLoop.append(new2Div1);
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
    $('.dynamicSquare').on('click', playSound); 
    displayCurrentPlayer(gameRound); 
    $('.dynamicSquare').on('click', checkWhiteOrBlack); 
    
}
function checkWhiteOrBlack(){
    for(var t = 0; t < boardSize.rows; t++){
        for(var z = 0;  z< boardSize.squares; z++){
            if(gameBoardArray[t][z] === 1){
                //black
                blackCount++;
            }
            else if(gameBoardArray[t][z] === 2){
                //white
                whiteCount++;
            }
            // display here 
            $('#blackCount').text(blackCount);
            $('#whiteCount').text(whiteCount);
            
            determineWinner();
        }
    }
    blackCount = 0;
    whiteCount = 0;
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
        $('.playerBorder1').removeClass('highlightCP');
    }
}

function determineWinner(){
    if (blackCount+whiteCount===10){
        if(blackCount>whiteCount){
            console.log("black is the winner");
            $("#blackModal").modal("show");
            return

        }else if(whiteCount>blackCount){
            console.log("white is the winner");
            $("#whiteModal").modal("show");
            return

        }else if(whiteCount===blackCount){
            console.log("it's a tie");
            $("#tieModal").modal("show");
            return

        }
    }

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
            // if its the positions down and not equal to undefined. 

            if (gameBoardArray[rowPositionNew + down[0]][colPositionNew + down[1]] === 2) {
                console.log("I found the opp color");
                while(gameBoardArray[rowPositionNew + down[0]][colPositionNew + down[1]] === 2){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += down[0];
                    colPositionNew += down[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                if(gameBoardArray[rowPositionNew + down[0]][colPositionNew + down[1]] === 1){
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    // $(event.currentTarget).addClass('player1Square');
                    console.log(gameBoardArray);
                    // $('.gameBoardSquares').empty();
                    // init();    
                }
            }
            if(gameBoardArray[rowPositionNew + up[0]][colPositionNew + up[1]] === 2) {
                while(gameBoardArray[rowPositionNew + up[0]][colPositionNew + up[1]] === 2){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += up[0];
                    colPositionNew += up[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + up[0]][colPositionNew + up[1]] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
            }
            if(gameBoardArray[rowPositionNew + upLeft[0]][colPositionNew + upLeft[1]] ===2){
                console.log("I found the opp color");
                while(gameBoardArray[rowPositionNew + upLeft[0]][colPositionNew + upLeft[1]] === 2){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += upLeft[0];
                    colPositionNew += upLeft[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + upLeft[0]][colPositionNew + upLeft[1]] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
            }
            if(gameBoardArray[rowPositionNew + upRight[0]][colPositionNew + upRight[1]]===2){
                console.log("I found the opp color");
                while(gameBoardArray[rowPositionNew + upRight[0]][colPositionNew + upRight[1]] === 2){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += upRight[0];
                    colPositionNew += upRight[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + upRight[0] ][colPositionNew + upRight[1] ] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
            }
            if(gameBoardArray[rowPositionNew + left[0]][colPositionNew + left[1]] === 2){
                console.log("I found the opp color");
                while(gameBoardArray[rowPositionNew + left[0]][colPositionNew + left[1]] === 2){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += left[0];
                    colPositionNew += left[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + + left[0] ][colPositionNew + + left[1]] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
            }
            if(gameBoardArray[rowPositionNew + downRight[0]][colPositionNew + downRight[1]] ===2){
                console.log("I found the opp color");
                while(gameBoardArray[rowPositionNew + downRight[0]][colPositionNew + downRight[1]] === 2){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += downRight[0];
                    colPositionNew += downRight[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + downRight[0]][colPositionNew + downRight[1]] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
            }
            if(gameBoardArray[rowPositionNew + right[0]][colPositionNew + right[1]] === 2){
                console.log("I found the opp color");
                while(gameBoardArray[rowPositionNew + right[0]][colPositionNew + right[1]] === 2){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += right[0];
                    colPositionNew += right[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + right[0]][colPositionNew + right[1]] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                    } 
                    else {
                        console.log('empty')
                }
            }
            if(gameBoardArray[rowPositionNew + downLeft[0]][colPositionNew + downLeft[1]] === 2){
                console.log("I found the opp color");
                while(gameBoardArray[rowPositionNew + downLeft[0]][colPositionNew + downLeft[1]] === 2){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += downLeft[0];
                    colPositionNew += downLeft[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + downLeft[0]][colPositionNew + downLeft[1] ] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
                else {
                    console.log('empty')
            }
            }
        }
        $('.gameBoardSquares').empty();
        init();
        moveIsValid = true;
        player1();
    }
    // if its player 2
    else if (gameRound === 2) {
        // if its empty and not undefined
        if (gameBoardArray[rowPositionNew][colPositionNew] === 0 && gameBoardArray[rowPositionNew][colPositionNew] !== undefined) {
            // the down position has an opp color add color to current event
            if (gameBoardArray[rowPositionNew + down[0]][colPositionNew + down[1]] === 1) {
                    console.log("I found the opp color");
                while(gameBoardArray[rowPositionNew + down[0]][colPositionNew + down[1]] === 1){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += down[0];
                    colPositionNew += down[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                }
                if(gameBoardArray[rowPositionNew + down[0]][colPositionNew + down[1]] === 1){
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    // $(event.currentTarget).addClass('player1Square');
                    console.log(gameBoardArray);
                    // $('.gameBoardSquares').empty();
                    // init();
                }
            }
            if(gameBoardArray[rowPositionNew + up[0]][colPositionNew + up[1]] === 1){
                while(gameBoardArray[rowPositionNew + up[0]][colPositionNew + up[1]] === 1){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += up[0];
                    colPositionNew += up[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + up[0]][rowPositionNew + up[1]] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
            }
            if(gameBoardArray[rowPositionNew + upLeft[0]][colPositionNew + upLeft[1]] === 1){
                while(gameBoardArray[rowPositionNew + upLeft[0]][colPositionNew + upLeft[1]] === 1){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += upLeft[0];
                    colPositionNew += upLeft[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + upLeft[0]][rowPositionNew + upLeft[1]] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
            }
            if(gameBoardArray[rowPositionNew + upRight[0]][colPositionNew + upRight[1]] ===1){
                while(gameBoardArray[rowPositionNew + upRight[0]][colPositionNew + upRight[1]] === 1){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += upRight[0];
                    colPositionNew += upRight[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + upRight[0]][rowPositionNew + upRight[1]] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
            }
            if(gameBoardArray[rowPositionNew + left[0]][colPositionNew + left[1]]===1){
                while(gameBoardArray[rowPositionNew + left[0]][colPositionNew + left[1]] === 1){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += left[0];
                    colPositionNew += left[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + left[0]][rowPositionNew + left[1]] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
            }
            if(gameBoardArray[rowPositionNew + downRight[0]][colPositionNew + downRight[1]]===1){
                while(gameBoardArray[rowPositionNew + downRight[0]][colPositionNew + downRight[1]] === 1){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += downRight[0];
                    colPositionNew += downRight[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + downRight[0]][rowPositionNew + downRight[1]] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew + downRight[0]][colPositionNew + downRight[1] ] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
            }
            if(gameBoardArray[rowPositionNew + right[0]][colPositionNew + right[1]]===1){
                while(gameBoardArray[rowPositionNew + right[0]][colPositionNew + right[1]] === 1){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += right[0];
                    colPositionNew += right[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + right[0]][rowPositionNew + right[1]] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
            }
            if(gameBoardArray[rowPositionNew + downLeft[0]][colPositionNew + downLeft[1]]===1){
                while(gameBoardArray[rowPositionNew + downLeft[0]][colPositionNew + downLeft[1]] === 1){
                    console.log('is it in the while loop?')
                    //while the new position is at the opp color, keep going in that direction
                    console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                    rowPositionNew += downLeft[0];
                    colPositionNew += downLeft[1];
                    console.log(gameBoardArray);
                    // if the piece reaches a same piece the move has already been made
                    }
                    if(gameBoardArray[rowPositionNew + downLeft[0]][rowPositionNew + downLeft[1]] === 1){
                        console.log('new game piece: ', gameBoardArray[rowPositionNew][colPositionNew] = gameRound);
                        // $(event.currentTarget).addClass('player1Square');
                        console.log(gameBoardArray);
                        // $('.gameBoardSquares').empty();
                        // init();
                }
            }

            
//         }
//     $('.gameBoardSquares').empty();
//     init();
//     moveIsValid = true;
//     player2();
//     }

// }

function checkMoveIfClicked(){
    if($(event.currentTarget).hasClass('player1Square') || $(event.currentTarget).hasClass('player2Square')){
                return true;
    }
}

function playSound(){
    var player=new Audio()
    player.src="http://www.mit.edu/afs/athena/project/windowmgr/share/Enlightenment/config/snd/Bubbles.wav"
    player.play()
}

