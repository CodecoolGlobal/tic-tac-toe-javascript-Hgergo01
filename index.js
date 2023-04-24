let board = [["w","w","",""],["","","","0"],["q","","",""],["","","",""]];
const board2 = [["w","w","",""],["","","","0"],["q","","",""],["","0","0",""]];

function selectGame(data) {
  displayMessage(data, "black");
}

function handleClick(data) {
  displayMessage(data.x + data.y + data.clickType);
}

function resetGame() {
  board = [];
  for(let i = 0; i < 4; i++) {
    board.push([])
    for(let j = 0; j < 4; j++) {
      board[i].push("");
    }
  }
  displayBoard({boardnumber: 1,board: board});
}

function aiShoot(data) {
  console.log(data);
}

displayBoard({boardnumber: 1,board: board});
displayBoard({boardnumber: 2,board: board2});
displayMessage("message", "green");
displayTextMessage("text message", "red");