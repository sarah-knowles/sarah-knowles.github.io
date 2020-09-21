document.addEventListener('DOMContentLoaded', startGame)
document.addEventListener('click', checkForWin)
document.addEventListener('contextmenu', checkForWin)

// Define your `board` object here!
var board;

// create a function to build the board;
function Cell(row, col, isMine) {
  this.row = row,
    this.col = col,
    this.isMine = isMine,
    this.isMarked = false,
    this.hidden = true,
    this.surroundingMines = 0
}

function board() {
  this.cells = []
}

function startGame() {
  board = new board();

for (var column = 0; column < 6; column++) {
  for (var row = 0; row < 6; row++) {
    let isMine = (Math.floor(Math.random() * 5) == 0) ? true : false;
    // the above is equal to let isMine = false;
    // if (Math.floor(Math.random() * 5) == 0) isMine = true;

    board.cells.push(new Cell(row, column, isMine));
  }
}

  for (var i = 0; i < board.cells.length; i++) {
    countSurroundingMines(board.cells[i]);
  }
// Don't remove this function call: it makes the game work!
  lib.initBoard();
}

function reset(){
  location.href = location;
}

// Define this function to look for a win condition:
var audio = new Audio("applause6.mp3");


function checkForWin() {
  if (areMinesMarked() && areNotMinesVisible()) {
    lib.displayMessage('You Rule!');
    audio.play();
  }
}

// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function areMinesMarked() {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {

      return false;
    }
  }
  return true;
}


function areNotMinesVisible() {
  for (var i = 0; i < board.cells.length; i++) {
    if (!board.cells[i].isMine && board.cells[i].hidden) {
      return false;
    }
  }
  return true;
}
// You can use this function call to declare a winner (once you've
// detected that they've won, that is!)


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:

// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(peanut) {
  var surrounding = lib.getSurroundingCells(peanut.row, peanut.col);
  peanut.surroundingMines = 0;

  for (i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      peanut.surroundingMines++
    }
  }
}
