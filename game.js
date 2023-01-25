'use strict'
 
const MINE = '💣'
const EMPTY = '|_|'
const gGame = {
    isOn: false, //Boolean, when true we let the user play
    shownCount: 0, //How many cells are shown
    markedCount: 0, //How many cells are marked (with a flag)
    secsPassed: 0 //How many seconds passed
}
const gLevel = {
    SIZE: 4,
    MINES: 2
   }//'Beginner';
   
   
var gBoard
var gIsGameOn
function init() {
    console.log('game started')
    gBoard = buildBoard()
    renderBoard(gBoard)
    gGame.isOn = true
}
function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = EMPTY
        }
    }
    const randNum=getRandomNubers(0,gLevel.SIZE-1)
    for(var i=0; i<randNum.length; i++){
        board[randNum[i][0]][randNum[i][1]] = MINE
    }
    return board
}
function getRandomNubers(min, max) {
    return [[Math.floor(Math.random() * (max - min + 1)) + min,Math.floor(Math.random() * (max - min + 1)) + min],[Math.floor(Math.random() * (max - min + 1)) + min,Math.floor(Math.random() * (max - min + 1)) + min]];
}
//Game ends when all mines are marked, and all the other cells are shown
function checkGameOver() { 
}
//When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors. 
//NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
function expandShown(board, elCell, i, j){
}


function setMinesNegsCount(board) {

    placed = 0;
    if (
        i = Math.floor(Math.random() * columns * rows))  
        if (board[i] != 'mine')      
        {
            board[i] = 'mine';        
            placed++;       
        }
    }
     while (placed < MINE);  {
        
     }


