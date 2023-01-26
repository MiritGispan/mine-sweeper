
'use strict'
console.log('Sprint 1')

const MINE = '💣'
const EMPTY = 0
const btnMain = '😊'

const GAME_BOARD_CELL = '⬜️'
const NEIGHBORS_ICONS = ['⏹', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣']
var gMinesArray = []
var gFlagsArray = []
var timerInterval


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
var gBoard
var gameBoard
var gIsGameOn

function init() {
    console.log('game started')
    gBoard = buildBoard()
    setMinesNegsCount(gBoard)
    gameBoard = buildGameBoard()
    renderBoard(gameBoard)
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

function checkGameOver() {
    if (gMinesArray.length === gFlagsArray.length) {
        for (var i = 0; i < gFlagsArray.length; i++) {
            if (!DoesArrayContionsArray(gMinesArray, gFlagsArray[i])) {
                return false;
            }
        }
    }
    return true;
}
function setMinesNegsCount(board) {
    console.log(gBoard)
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
                }
            }
        }
    }
}
function checkgBoardCellContent(i, j) {
    return gBoard[i][j];
}
function setGameOver() {
    gGame.isOn = false
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
    const isGameFinished = checkGameOver()
    if (isGameFinished) {
        setGameOver()
    }
}
function removeFlag(i, j) {
    const indexOfCell = gFlagsArray.indexOf([i, j])
    gFlagsArray.splice(indexOfCell, 1)
    const isGameFinished = checkGameOver()
    if (isGameFinished) {
        setGameOver()
    }
}