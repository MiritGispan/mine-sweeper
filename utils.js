'use strict'

function renderBoard(mat) {
    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = strHTML
}
//Count mines around each cell and set the cell's minesAroundCount.
function setMinesNegsCount(board){
}
 //Called when a cell is clicked
function onCellClicked(elCell, i, j) {
}
//Called when a cell is rightclickedee how you can hide the context menu on right click
function onCellMarked(elCell) {
}