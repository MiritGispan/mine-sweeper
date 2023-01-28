'use strict'

var gGameInterval
var gStartTime = 0
function setTimer() {
    var diffTime = (Date.now() - gStartTime) / 1000
    var displayTime = diffTime.toFixed(0)
    document.querySelector('.timer').innerText = 'Time: ' + displayTime;
}
function startTimer() {
    gStartTime = Date.now()
    gGameInterval = setInterval(setTimer, 1000)
}
function stopTimer() {
    clearInterval(gGameInterval);
    gGameInterval = null; 
}
