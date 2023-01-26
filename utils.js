
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
 //Called when a cell is clicked(left click)
function onCellClicked(elCell,i, j) {
    const cellContent = checkgBoardCellContent(i,j);
    if(cellContent === 0){ //cell has no neighboars
        elCell.innerText ='⏹'
        expandShown(i, j)
    }
    else if(cellContent === MINE){ //cell has mine
        elCell.innerText = MINE
        console.log("game-over")
        setGameOver();
    }
    else{ //cell has neighboars
        elCell.innerText =NEIGHBORS_ICONS[cellContent]
    }
}
 //Called when a cell is clicked(right click)
function onRightClicked(elCell,i, j) {
    const isFlag =  onCellMarked(elCell)
    if(isFlag){
        removeFlag(i,j)
    }
    else{
        addFlag(i,j)
    }
}
//Called when a cell is rightclickedee how you can hide the context menu on right click
function onCellMarked(elCell) {
    const isFlag = elCell.innerText === '🚩'
    if(isFlag ){
        elCell.innerText =GAME_BOARD_CELL
    }
    else{
        elCell.innerText = '🚩'
    }
    return isFlag
}
//When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
//NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
function expandShown(firstIndex, secondIndex){
    for(var i = firstIndex - 1; i <= firstIndex + 1; i++){
        if(i < 0 || i >= gBoard.length) continue
        for(var j = secondIndex - 1; j <= secondIndex + 1; j++){
            if(i === firstIndex && j === secondIndex) continue
            if(j < 0 || j >= gBoard[i].length) continue
                const cellContent = checkgBoardCellContent(i,j);
                const elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.innerText = NEIGHBORS_ICONS[cellContent]
        }
    }
}
function getRandomNubers(min, max) { //return array of uniqe indexs (in the size of)
    const output =[];
    output.push([Math.floor(Math.random() * (max - min + 1)) + min,Math.floor(Math.random() * (max - min + 1)) + min])
    while(output.length < gLevel.MINES){
        var arrayOfTwoRandomNumbers = [Math.floor(Math.random() * (max - min + 1)) + min,Math.floor(Math.random() * (max - min + 1)) + min]
        if(!DoesArrayContionsArray(output,arrayOfTwoRandomNumbers)){
            output.push(arrayOfTwoRandomNumbers)
        }
    }
    return output
}
function DoesArrayContionsArray(a, b) { //a is an Array of Arraies , b is just an Array. exmple: a=[[0,1],[1,1]] b= [0,1]
    for(var i=0; i<a.length; i++){
        if(DoesArraiesAreEquals(a[i], b)){
            return true
        }
  }
  return false
}
function DoesArraiesAreEquals(a, b) { //a is an Array and b is an Array. exmple: a=[1,1] b= [0,1]
    if(a.length !== b.length){
        return false;
    }
    for(var i=0; i<a.length; i++){
        if(a[i] !== b[i]){
            return false
        }
    }
    return true
  }