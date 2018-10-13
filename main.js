$(document).ready(init);


//All global variables go down here:
var moveIsValid = false;
var currentPlayer = 1; 
var opponentPlayer = 2; 
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
var colPositionNew;
var rowPositionNew;


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
        }
    }
    blackCount = 0;
    whiteCount = 0;
}


function player1(){
    //Change game round
    console.log('player 1: ', moveIsValid);
    if (moveIsValid === true) {
        gameRound = 2;
        currentPlayer = 2;
        opponentPlayer = 1;
        displayCurrentPlayer(gameRound);
        moveIsValid = false;
    }
    console.log('Game Round: ', gameRound);
}

function player2(){
    console.log('player 2: ', moveIsValid);
    if (moveIsValid === true) {
        gameRound = 1;
        currentPlayer = 1;
        opponentPlayer = 2;
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

function determineWiner(){

}
/*
Below: 
switchGamePiece function is called from the checkMoveIfValid function.
This function will swap all the opposing player's pieces to the current player's pieces.
The gameBoardArray will now reflect the new 1's and 2's. 
*/
function switchGamePiece(coordinates) {
    for (var i = 0; i < coordinates.length; i++) {
        if(gameBoardArray[coordinates[i][0]][coordinates[i][1]] === opponentPlayer) {
            gameBoardArray[coordinates[i][0]][coordinates[i][1]] = currentPlayer;
        }
        else {
            gameBoardArray[coordinates[i][0]][coordinates[i][1]] = currentPlayer;
        }
    }
}

/*
Below:
proceedDirection function is called from the checkMoveIfValid function. 
This function will save the coordinates of the direction it continues to pass through. 
If the current player's piece is found, save the coordinates and exit the function. 
The storage(coordinates) are returned to checkMoveIfValid function.
*/
function proceedDirection(rowPositionNew, colPositionNew, direction, rowPosition, colPosition) {
    var storage = []; 
    //Below: continue through the while loop until it reaches out of bounds/end. 
    while (rowPositionNew !== -1 && colPositionNew !== -1 && rowPositionNew !== 8 && colPositionNew !== 8 ) {
        //Below: if the next position is the current player's piece, store the coordinates and leave the while loop.
        if ( gameBoardArray[rowPositionNew][colPositionNew] === currentPlayer ) {
            storage.push([rowPositionNew, colPositionNew])
            //Below: since all positions it passed through are valid, save the intial position we clicked on. 
            storage.push([rowPosition, colPosition])
            return storage;
        }
        //Below: if the next position is the opposing player, continue in that direction.
        else if ( gameBoardArray[rowPositionNew][colPositionNew] === opponentPlayer || gameBoardArray[rowPositionNew][colPositionNew] === 0) {
            // Commented out code below is for testing purposes only: 
            // $(".testing").removeClass("testing")
            // var currentSquare = $('div[row = ' + rowPositionNew + '][col= ' + colPositionNew + ']');
            // currentSquare.addClass("testing")
            if ( direction === 'up' ) {
                storage.push([rowPositionNew, colPositionNew])
                rowPositionNew--;
            }
            else if ( direction === 'down' ) {
                storage.push([rowPositionNew, colPositionNew])
                rowPositionNew++;
            }
            else if ( direction === 'left' ) {
                storage.push([rowPositionNew, colPositionNew])
                colPositionNew--;
            }
            else if ( direction === 'right' ) {
                storage.push([rowPositionNew, colPositionNew])
                colPositionNew++;
            }
            else if ( direction === 'downRight' ) {
                storage.push([rowPositionNew, colPositionNew])
                rowPositionNew++;
                colPositionNew++
            }
            else if ( direction === 'upLeft' ) {
                storage.push([rowPositionNew, colPositionNew])
                rowPositionNew--;
                colPositionNew--;
            }
            else if ( direction === 'upRight' ) {
                storage.push([rowPositionNew, colPositionNew])
                rowPositionNew--;
                colPositionNew++;
            }
            else if ( direction === 'downLeft' ) {
                storage.push([rowPositionNew, colPositionNew])
                rowPositionNew++;
                colPositionNew--;
            }
        }
    }
    //Below: if in the while loop, it never returned the storage, we hit a dead-end and must return false.
    return false;
}

/*
Below: 
decideDir function is called from the checkMoveIfValid function.
This functions determines the direction and passes that direction to proceedDirection function. 
This will allow which direction to continue it's check. 
The directions are returned to checkMoveifValid function.
*/
function decideDir(rowDirection, colDirection) {
    var direction;
            //-1                //0
    if (rowDirection < 0 && colDirection === 0) {
        direction = 'up';
    } 
            //1                 //0
    else if (rowDirection > 0 && colDirection === 0) {
        direction = 'down';
    }  
            //0                 //-1
    else if (rowDirection === 0 && colDirection < 0) {
        direction = 'left';
    }   
            //0                 //1
    else if (rowDirection === 0 && colDirection > 0) {
        direction = 'right';
    } 
            //1                 //1
    else if (rowDirection > 0 && colDirection > 0) {
        direction = 'downRight';
    }
            //-1                //-1
    else if (rowDirection < 0 && colDirection < 0) {
        direction = 'upLeft';
    }
            //-1                 //1
    else if (rowDirection < 0 && colDirection > 0) {
        direction = 'upRight';
    }
            //1                //-1  
    else if (rowDirection > 0 && colDirection < 0) {
        direction = 'downLeft';
    }
    return direction;
}

function checkMoveIfValid() {
    //Below: rowPosition and colPosition is the current target. 
    var rowPosition = parseInt($(event.currentTarget).attr('row'));
    var colPosition = parseInt($(event.currentTarget).attr('col'));
    console.log('current position: ', rowPosition, colPosition);

    //Below: if its a previous clicked position (current or opposing player), prohibit click and exit. 
    if (gameBoardArray[rowPosition][colPosition] === currentPlayer || gameBoardArray[rowPosition][colPosition] === opponentPlayer) {
        return;
    }
    //Below: if the position clicked is an empty space, then check all directions.
    for (var row = -1; row < 2; row++) {
        for (var col = -1; col < 2; col++) {
            //Below: As directions are checked and a 2nd player is found, continue in that direction. 
            rowPositionNew = rowPosition + row
            colPositionNew = colPosition + col
            //Below: Code will skip positions that are undefined or out of bounds of the gameboard. This is needed to avoid uncaught reference errors. 
            if (rowPositionNew === -1 || colPositionNew === -1 || rowPositionNew === 8 || colPositionNew === 8) {
                continue;  
            }
            //Below: if the opposing player is found, call helper function to continue to check that direction.
            else if (gameBoardArray[rowPositionNew][colPositionNew] === opponentPlayer) {
                console.log('I have found the opp color', (rowPositionNew), (colPositionNew));
                //Below: store the directions into a variable to use for the proceedDirection.
                var dir = decideDir(row, col);
                //Below: store the coordinates of all valid positions that have been passed through. 
                var arrayOfCoordinates = proceedDirection(rowPositionNew, colPositionNew, dir, rowPosition, colPosition);
                //Below: if the array of coordinates reached a dead-end and check was invalid, exit and continue through the for-loop. 
                if (arrayOfCoordinates === false) {
                    continue;
                }
                //Below: if it didn't reach a dead-end and got the coordinates, switch the game-pieces to 1 or 2 by calling switchGamePiece function.
                else {
                    switchGamePiece(arrayOfCoordinates);
                    moveIsValid=true;
                }
            }
        }
    }
    //Below: after all checks have been completed, swap the game board to reflect the gameBoardArray (new 1's or new 2's)
    //and switch players. 
    if (currentPlayer === 1 && moveIsValid === true) {
        $('.gameBoardSquares').empty();
        init();
        player1();
    }
    else if (currentPlayer === 2 && moveIsValid === true) {
        $('.gameBoardSquares').empty();
        init();
        player2();
    }
}

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

