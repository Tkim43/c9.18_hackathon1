$(document).ready(init);


//All global variables go down here:
var moveIsValid = false;
var currentPlayer = 1;
var opponentPlayer = 2;
var gameRound = 1;
var box =[];
var black = [];
var white = [];
var blackCount = 0;
var whiteCount = 0;
var boardSize = { rows: 8, squares: 8 };

var noOfGame = 1;

var gameBoardArray =[[0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]];
var colPositionNew;
var rowPositionNew;


// if encounters 0 = green, if 1 = black, if 2 = white;
function buildGame(){
    var gameBoard = $('.gameBoardSquares');
    for (var rows = 0; rows < gameBoardArray.length; rows++) {
        var outerLoop = $("<div>").addClass("row");
        gameBoard.append(outerLoop);
        for (var col = 0; col < gameBoardArray.length; col++) {
            if (gameBoardArray[rows][col] === 0) {
                var newDiv = $('<div>').addClass('dynamicSquare').addClass('empty');
                newDiv.attr("row", rows);
                newDiv.attr("col", col);
                outerLoop.append(newDiv)
            }
            else if (gameBoardArray[rows][col] === 1){
                var newDiv1 = $('<div>').addClass('dynamicSquare player1Square');
                newDiv1.attr("row", rows);
                newDiv1.attr("col", col);
                outerLoop.append(newDiv1)
            }
            else if(gameBoardArray[rows][col] === -1){
                var newDiv3 = $('<div>').addClass('dynamicSquare highSquare');
                // var new2Div1 = $('<div>').addClass('gamePieceDiv')
                newDiv3.attr("row", rows);
                newDiv3.attr("col", col);
                outerLoop.append(newDiv3)
            }
            else {
                var newDiv2 = $('<div>').addClass('dynamicSquare player2Square');
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
    convertsBoard();
    // $('.dynamicSquare').on('click',checkMove);
    $('.dynamicSquare').on('click', checkMoveIfValid);


    //highLightSquares(gameRound);
    //FIXED HERE
    if(noOfGame === 1){
        highLightSquares(gameRound);
        noOfGame = 0;
    }
    else if(noOfGame === 0){
        // i need to change the current player here
        if ( currentPlayer === 1){
            player1();
        }
        else if(currentPlayer === 2){
            player2();
        }
        highLightSquares(gameRound);
    }

    //checkMove();
    $('.dynamicSquare').on('click', playSound);
    displayCurrentPlayer(gameRound);
    $('.dynamicSquare').on('click', checkWhiteOrBlack);
    determineWinner();

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

function determineWinner(){
    if (blackCount+whiteCount===64){
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
            storage.push([rowPositionNew, colPositionNew]);
            //Below: since all positions it passed through are valid, save the intial position we clicked on.
            storage.push([rowPosition, colPosition]);
            return storage;
        }
        //Below: if the next position is the opposing player, continue in that direction.
        else if ( gameBoardArray[rowPositionNew][colPositionNew] === opponentPlayer || gameBoardArray[rowPositionNew][colPositionNew] === 0) {
            // Commented out code below is for testing purposes only:
            // $(".testing").removeClass("testing")
            // var currentSquare = $('div[row = ' + rowPositionNew + '][col= ' + colPositionNew + ']');
            // currentSquare.addClass("testing")
            if ( direction === 'up' ) {
                storage.push([rowPositionNew, colPositionNew]);
                rowPositionNew--;
            }
            else if ( direction === 'down' ) {
                storage.push([rowPositionNew, colPositionNew]);
                rowPositionNew++;
            }
            else if ( direction === 'left' ) {
                storage.push([rowPositionNew, colPositionNew]);
                colPositionNew--;
            }
            else if ( direction === 'right' ) {
                storage.push([rowPositionNew, colPositionNew]);
                colPositionNew++;
            }
            else if ( direction === 'downRight' ) {
                storage.push([rowPositionNew, colPositionNew]);
                rowPositionNew++;
                colPositionNew++
            }
            else if ( direction === 'upLeft' ) {
                storage.push([rowPositionNew, colPositionNew]);
                rowPositionNew--;
                colPositionNew--;
            }
            else if ( direction === 'upRight' ) {
                storage.push([rowPositionNew, colPositionNew]);
                rowPositionNew--;
                colPositionNew++;
            }
            else if ( direction === 'downLeft' ) {
                storage.push([rowPositionNew, colPositionNew]);
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
            rowPositionNew = rowPosition + row;
            colPositionNew = colPosition + col;
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
        box =[];
        init();
        // player1();
    }
    else if (currentPlayer === 2 && moveIsValid === true) {
        $('.gameBoardSquares').empty();
        box=[];
        // player2();
        init();
        // player2();
    }

}
function convertsBoard(){
    var rows =$('.row');
    for(var x =0; x < boardSize.rows; x++){
        var innerPiece = $(rows[x]).find('.dynamicSquare');
        box.push($(innerPiece));
    }
    console.log(box);
}


function checkMove(){
    var rowPosition = $(event.currentTarget).attr('row');
    var colPosition = $(event.currentTarget).attr('col');
    var colPositionNew = parseInt(colPosition);
    var rowPositionNew = parseInt(rowPosition);
    // if the position that we clicked is green then change it to the same player color
    if(gameRound ===1) {
        if ($(box[rowPositionNew][colPositionNew]).hasClass('highSquare')) {
            $(box[rowPositionNew][colPositionNew]).removeClass('highSquare');
            $(box[rowPositionNew][colPositionNew]).addClass('player1Square');
            $('div').removeClass('highSquare');
            // flipCoin();

            gameRound =2;
        }
    }
    else if(gameRound ===2){
        if ($(box[rowPositionNew][colPositionNew]).hasClass('highSquare')) {
            $(box[rowPositionNew][colPositionNew]).removeClass('highSquare');
            $(box[rowPositionNew][colPositionNew]).addClass('player2Square');
            $('div').removeClass('highSquare');
            // flipCoin();
            gameRound =1;
        }
    }
    highLightSquares(gameRound);
    console.log(gameRound);
    console.log("went into checkMove function");

}

function playSound(){
    var player=new Audio();
    player.src="http://www.mit.edu/afs/athena/project/windowmgr/share/Enlightenment/config/snd/Bubbles.wav";
    player.play()
}




function highLightSquares(turnsNum) {
    // depending on the gameRound find the opposite
    if (turnsNum === 1) {
        //gameRound = 2;
        for (var i = 0; i < boardSize.rows; i++) {
            for (var j = 0; j < boardSize.squares; j++) {
                // i want to get the row and column of the black squares
                // debugger;
                var squareColor = $(box[i][j]);
                // if it has the same color then we want to check around it
                if (squareColor.hasClass('player1Square')) {
                    // wherever the position is at i want to increase it with the directional vectors

                    for (var k = -1; k < 2; k++) {
                        for (var l = -1; l < 2; l++) {
                            // gets you columnNumber and Row Number of the positions they are at
                            // find the empty spaces an those are the moves they can make
                            var rowNum = squareColor.attr('row');
                            rowNum = parseInt(rowNum);
                            console.log(rowNum);
                            rowNum = rowNum + k;
                            var columnNum = squareColor.attr('col');
                            columnNum = parseInt(columnNum);
                            console.log(columnNum);
                            columnNum = columnNum + l;

                            if (rowNum > -1 && columnNum > -1 && rowNum < 8 && columnNum < 8){
                                // if its the opposite color
                                if ($(box[rowNum][columnNum]).hasClass('player2Square')) {
                                    //rowNum = rowNum + k;
                                    //columnNum = columnNum +l;
                                    console.log(rowNum, columnNum);
                                    // keep adding until it hits an empty square
                                    var stop = false;

                                    // while ($(box[rowNum][columnNum]).hasClass('player2Square') || stop === false) {
                                    while (stop === false) {
                                        rowNum = rowNum + k;
                                        columnNum = columnNum + l;
                                        console.log("????? : ", rowNum, columnNum);
                                        if(rowNum < 0 || columnNum < 0 || rowNum > 7 || columnNum > 7) {
                                            stop = true;
                                        }
                                        else{
                                            if ($(box[rowNum][columnNum]).hasClass('empty')) {
                                                // error because it cant highlight an undefined square
                                                $(box[rowNum][columnNum]).addClass('highSquare');
                                                // gameRound =2;
                                                stop = true;
                                            }
                                            else if ($(box[rowNum][columnNum]).hasClass('player1Square')) {
                                                // highLightSquares(gameRound);
                                                stop = true;
                                            }
                                        }

                                    }

                                }
                            }

                        }
                    }


                }
            }
        }
    }
    else if (turnsNum === 2) {
        //gameRound = 1;
        for (var t = 0; t < boardSize.rows; t++) {
            for (var a = 0; a < boardSize.squares; a++) {
                // i want to get the row and column of the black squares
                squareColor = $(box[t][a]);
                // if it has the same color then we want to check around it
                if (squareColor.hasClass('player2Square')) {
                    // wherever the position is at i want to increase it with the directional vectors

                    for (var b = -1; b < 2; b++) {
                        for (var c = -1; c < 2; c++) {
                            // gets you columnNumber and Row Number of the positions they are at
                            // find the empty spaces an those are the moves they can make
                            rowNum = squareColor.attr('row');
                            rowNum = parseInt(rowNum);
                            console.log(rowNum);
                            rowNum = rowNum + b;

                            columnNum = squareColor.attr('col');
                            columnNum = parseInt(columnNum);
                            console.log(columnNum);
                            columnNum = columnNum + c;


                            if (rowNum > -1 && columnNum > -1 && rowNum < 8 && columnNum < 8) {
                                // if its the opposite color
                                if ($(box[rowNum][columnNum]).hasClass('player1Square')) {
                                    //rowNum = rowNum + k;
                                    //columnNum = columnNum +l;
                                    console.log(rowNum, columnNum);
                                    // keep adding until it hits an empty square
                                    stop = false;

                                    // while ($(box[rowNum][columnNum]).hasClass('player1Square') || stop === false) {
                                    while ( stop === false) {
                                        rowNum = rowNum + b;
                                        columnNum = columnNum + c;
                                        debugger;
                                        if(rowNum < 0 || columnNum < 0 || rowNum > 7 || columnNum > 7) {
                                            stop = true;
                                        }
                                        else{
                                            if ($(box[rowNum][columnNum]).hasClass('empty')) {
                                                $(box[rowNum][columnNum]).addClass('highSquare');
                                                stop = true;
                                            }
                                            else if ($(box[rowNum][columnNum]).hasClass('player2Square')) {
                                                // highLightSquares(gameRound);
                                                stop = true;
                                            }
                                        }
                                    }

                                }
                            }


                        }
                    }


                }
            }
        }

    }
}






//
// function highLightSquares(turnsNum) {
//     // depending on the gameRound find the opposite
//     if (turnsNum === 1) {
//         //gameRound = 2;
//         for (var i = 0; i < boardSize.rows; i++) {
//             for (var j = 0; j < boardSize.squares; j++) {
//                 // i want to get the row and column of the black squares
//                 // debugger;
//                 var squareColor = $(box[i][j]);
//                 // if it has the same color then we want to check around it
//                 if (squareColor.hasClass('player1Square')) {
//                     // wherever the position is at i want to increase it with the directional vectors
//
//                     for (var k = -1; k < 2; k++) {
//                         for (var l = -1; l < 2; l++) {
//                             // gets you columnNumber and Row Number of the positions they are at
//                             // find the empty spaces an those are the moves they can make
//                             var rowNum = squareColor.attr('row');
//                             rowNum = parseInt(rowNum);
//                             console.log(rowNum);
//                             rowNum = rowNum + k;
//                             var columnNum = squareColor.attr('col');
//                             columnNum = parseInt(columnNum);
//                             console.log(columnNum);
//                             columnNum = columnNum + l;
//
//                             // if its the opposite color
//                             if ($(box[rowNum][columnNum]).hasClass('player2Square')) {
//                                 //rowNum = rowNum + k;
//                                 //columnNum = columnNum +l;
//                                 console.log(rowNum, columnNum);
//                                 // keep adding until it hits an empty square
//                                 var stop = false;
//
//                                 while ($(box[rowNum][columnNum]).hasClass('player2Square') || stop === false) {
//                                     rowNum = rowNum + k;
//                                     columnNum = columnNum + l;
//                                     if (rowNum === undefined || columnNum === undefined || rowNum < -1 || columnNum < -1) {
//                                         break;
//                                     }
//                                     else if ($(box[rowNum][columnNum]).hasClass('empty')) {
//                                         // error because it cant highlight an undefined square
//                                         $(box[rowNum][columnNum]).addClass('highSquare');
//                                         // gameRound =2;
//                                         stop = true;
//                                     }
//                                     else if ($(box[rowNum][columnNum]).hasClass('player1Square')) {
//                                         // highLightSquares(gameRound);
//                                         stop = true;
//                                     }
//
//                                 }
//
//                             }
//                         }
//                     }
//
//
//                 }
//             }
//         }
//     }
//     else if (turnsNum === 2) {
//         //gameRound = 1;
//         for (var t = 0; t < boardSize.rows; t++) {
//             for (var a = 0; a < boardSize.squares; a++) {
//                 // i want to get the row and column of the black squares
//                 squareColor = $(box[t][a]);
//                 // if it has the same color then we want to check around it
//                 if (squareColor.hasClass('player2Square')) {
//                     // wherever the position is at i want to increase it with the directional vectors
//
//                     for (var b = -1; b < 2; b++) {
//                         for (var c = -1; c < 2; c++) {
//                             // gets you columnNumber and Row Number of the positions they are at
//                             // find the empty spaces an those are the moves they can make
//                             rowNum = squareColor.attr('row');
//                             rowNum = parseInt(rowNum);
//                             console.log(rowNum);
//                             rowNum = rowNum + b;
//
//                             columnNum = squareColor.attr('col');
//                             columnNum = parseInt(columnNum);
//                             console.log(columnNum);
//                             columnNum = columnNum + c;
//
//                             // if its the opposite color
//                             if ($(box[rowNum][columnNum]).hasClass('player1Square')) {
//                                 //rowNum = rowNum + k;
//                                 //columnNum = columnNum +l;
//                                 console.log(rowNum, columnNum);
//                                 // keep adding until it hits an empty square
//                                 stop = false;
//
//                                 while ($(box[rowNum][columnNum]).hasClass('player1Square') || stop === false) {
//                                     rowNum = rowNum + b;
//                                     columnNum = columnNum + c;
//                                     debugger;
//                                     if (rowNum < -2 || columnNum < -2 || rowNum === undefined || columnNum === undefined) {
//                                         break;
//                                     }
//                                     else if ($(box[rowNum][columnNum]).hasClass('empty')) {
//                                         $(box[rowNum][columnNum]).addClass('highSquare');
//                                         stop = true;
//                                     }
//                                     else if ($(box[rowNum][columnNum]).hasClass('player2Square')) {
//                                         // highLightSquares(gameRound);
//                                         stop = true;
//                                     }
//                                 }
//
//                             }
//                         }
//                     }
//
//
//                 }
//             }
//         }
//
//     }
// }
