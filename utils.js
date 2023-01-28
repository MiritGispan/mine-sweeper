'use strict'

function renderBoard(mat) {
    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            strHTML += `<td class="${className}" oncontextmenu="onRightClicked(this, ${i}, ${j})" onClick="onCellClicked(this, ${i}, ${j})">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = strHTML
}


function onCellClicked(elCell, i, j) {
    if (elCell.innerText === GAME_BOARD_CELL) {
        const cellContent = checkgBoardCellContent(i, j);

        if (cellContent === 0) { 
            elCell.innerText = NEIGHBORS_ICONS[0]
            expandShown(i, j)
        }
        else if (cellContent === MINE) { 
            elCell.innerText = MINE
            showAllBoard('LOSE');
            increaseOneLive();
        }
        else { 
            elCell.innerText = NEIGHBORS_ICONS[cellContent]
            updateClickedNeghibers(cellContent)
        }
    }

}

function darkMode() {
    if (!gDarkMode) {
        const eDarkModeColor = document.querySelector('.body')
        eDarkModeColor.style.backgroundColor = 'black'
        eDarkModeColor.style.color = 'white'
        const eDarkModeText = document.querySelector('.dark-mode')
        eDarkModeText.innerText = 'Light Mode'
    }
    else { 
        const eDarkModeColor = document.querySelector('.body')
        eDarkModeColor.style.backgroundColor = 'lightblue'
        eDarkModeColor.style.color = 'white'
        const eDarkModeText = document.querySelector('.dark-mode')
        eDarkModeText.innerText = 'Dark Mode'

    }
    gDarkMode = !gDarkMode
}
function increaseOneLive() {
    gLives--

    const eLives = document.querySelector(`.lives`)
    const eGameStatus = document.querySelector(`.game-status`)

    if (gLives === 2) {
        eLives.innerText = 'Lives: 🖤❤️❤️'
        eGameStatus.innerText = 'You stil have 2 lives Left'
    }
    else if (gLives === 1) {
        eLives.innerText = 'Lives: 🖤🖤❤️'
        eGameStatus.innerText = 'You stil have 1 live Left'
    }
    else if (gLives === 0) {
        eLives.innerText = 'Lives: 🖤🖤🖤'
        setGameOver('LOSE')
    }
}

function onRightClicked(elCell, i, j) {

    const isFlag = onCellMarked(elCell)

    if (isFlag) {
        removeFlag(i, j)
    }
    else {
        addFlag(i, j)
    }
}


function onCellMarked(elCell) {
    const isFlag = elCell.innerText === FLAG
    if (isFlag) {
        elCell.innerText = GAME_BOARD_CELL
    }
    else {
        elCell.innerText = FLAG
    }
    return isFlag
}

function expandShown(firstIndex, secondIndex) {

    for (var i = firstIndex - 1; i <= firstIndex + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = secondIndex - 1; j <= secondIndex + 1; j++) {
            if (i === firstIndex && j === secondIndex) continue
            if (j < 0 || j >= gBoard[i].length) continue
            const cellContent = checkgBoardCellContent(i, j);
            const elCell = document.querySelector(`.cell-${i}-${j}`)
            if (elCell.innerText !== NEIGHBORS_ICONS[0]) {
                elCell.innerText = NEIGHBORS_ICONS[cellContent]
                if (cellContent >= 1) {
                    updateClickedNeghibers(cellContent)
                }

            }
        }
    }
}

function checkIfUserWin() {

   

    var countSimilarElement = 0
    if (gMinesArray.length === gFlagsArray.length) { 
        for (var i = 0; i < gFlagsArray.length; i++) { 
            for (var j = 0; j < gMinesArray.length; j++) {
                if (DoesArraiesAreEquals(gFlagsArray[i], gMinesArray[j])) {
                    countSimilarElement++
                }
            }
        }

        if (gMinesArray.length === countSimilarElement) { 
            setGameOver('WIN')
        }
    }

    if (gCountClickedNeighbors === gCountTotalNeighbors) {
        setGameOver('WIN')
    }
}
function getRandomNubers(min, max) {
    const output = [];
    output.push([Math.floor(Math.random() * (max - min + 1)) + min, Math.floor(Math.random() * (max - min + 1)) + min])
    while (output.length < gLevel.MINES) {
        var arrayOfTwoRandomNumbers = [Math.floor(Math.random() * (max - min + 1)) + min, Math.floor(Math.random() * (max - min + 1)) + min]
        if (!DoesArrayContionsArray(output, arrayOfTwoRandomNumbers)) {
            output.push(arrayOfTwoRandomNumbers)
        }
    }
    return output
}

function DoesArrayContionsArray(a, b) { 
    for (var i = 0; i < a.length; i++) {
        if (DoesArraiesAreEquals(a[i], b)) {
            return true
        }
    }
    return false
}

function DoesArraiesAreEquals(a, b) { 
    if (a.length !== b.length) {
        return false;
    }
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false
        }
    }
    return true
}

function showAllBoard(gameStatus) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            const cellContent = checkgBoardCellContent(i, j);
            const elCell = document.querySelector(`.cell-${i}-${j}`)
            if (cellContent === MINE) {
                if (gameStatus === 'LOSE' || cellContent !== FLAG) {
                    elCell.innerText = MINE
                }
            }
            else {
                elCell.innerText = NEIGHBORS_ICONS[cellContent]
            }
        }
    }

}