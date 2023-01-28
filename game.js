'use strict'

const MINE = '💣'
const EMPTY = 0
const GAME_BOARD_CELL = '⬜️'
const NEIGHBORS_ICONS = ['⏹', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣']
const FLAG = '🚩'
var gMinesArray = []
var gFlagsArray = []
var gCountTotalNeighbors = 0
var gCountClickedNeighbors = 0
var gScore = 0;
var gBoard
var gameBoard 
var gIsGameOn
var gLives = 3
var gDarkMode = false
const gGame = {
    isOn: false, 
    shownCount: 0, 
    markedCount: 0, 
    secsPassed: 0 
}
const gLevel = {
    SIZE: 4,
    MINES: 2
}
function init() {
    console.log('game started')
    gBoard = buildBoard()
    setMinesNegsCount(gBoard)
    gameBoard = buildGameBoard()
    renderBoard(gameBoard)
    gGame.isOn = true
    startTimer()
    const elCell = document.querySelector(`.game-status`)
    elCell.innerText = '😀'
    if (gLives === 3) {
        const elCell = document.querySelector(`.lives`)
        elCell.innerText = 'LIVES: ❤️❤️❤️'
    }
    gCountClickedNeighbors = 0
}
function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = EMPTY
        }
    }
   
    gMinesArray = []
    const randNum = getRandomNubers(0, gLevel.SIZE - 1)
    for (var i = 0; i < randNum.length; i++) {
        board[randNum[i][0]][randNum[i][1]] = MINE
        gMinesArray.push(randNum[i])
    }
    return board
}
function buildGameBoard() { 
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = GAME_BOARD_CELL
        }
    }
    return board
}
function updateClickedNeghibers(cellContent) {
    if (cellContent >= 1) {
        gCountClickedNeighbors = gCountClickedNeighbors + cellContent
    }
    if (gCountClickedNeighbors === gCountTotalNeighbors) {
        setGameOver('WIN')
    }
}

function setMinesNegsCount(board) {
    console.log(gBoard)
    gCountTotalNeighbors = 0
    for (var k = 0; k < gMinesArray.length; k++) { 
        var firstIndex = gMinesArray[k][0]
        var secondIndex = gMinesArray[k][1]
        for (var i = firstIndex - 1; i <= firstIndex + 1; i++) {
            if (i < 0 || i >= gBoard.length) continue
            for (var j = secondIndex - 1; j <= secondIndex + 1; j++) {
                if (i === firstIndex && j === secondIndex) continue
                if (j < 0 || j >= gBoard[i].length) continue
                if (gBoard[i][j] !== MINE) {
                    gBoard[i][j]++
                    gCountTotalNeighbors++
                }
            }
        }
    }
}
function checkgBoardCellContent(i, j) {
    return gBoard[i][j];
}
function setGameOver(gameStatus) {
    gGame.isOn = false
    stopTimer()
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = 'Time: 0'
    if (gameStatus === 'WIN') {
        const elCell = document.querySelector(`.game-status`)
        elCell.innerText = 'WINNER! 😎'
        showAllBoard('WIN');
        gScore++
        var elTimer = document.querySelector('.score')
        elTimer.innerText = gScore
        gCountClickedNeighbors = 0
    }
    else if (gameStatus === 'LOSE') {
        const elCell = document.querySelector(`.game-status`)
        elCell.innerText = 'GAME OVER 😒'
        gScore = 0
        var elTimer = document.querySelector('.score')
        elTimer.innerText = gScore
        gCountClickedNeighbors = 0
    }
    gLives = 3
}
function changeLevel(level) {
    if (level === 1) {
        gLevel.SIZE = 4,
            gLevel.MINES = 2
    }
    else if (level === 2) { 
        gLevel.SIZE = 8,
            gLevel.MINES = 14
    }
    else if (level === 3) {
        gLevel.SIZE = 12,
            gLevel.MINES = 32
    }
    init(); 
}
function addFlag(i, j) {

    gFlagsArray.push([i, j])
    checkIfUserWin()
}
function removeFlag(i, j) {

    const indexOfCell = gFlagsArray.indexOf([i, j])

    gFlagsArray.splice(indexOfCell, 1)
    checkIfUserWin()
}