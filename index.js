const board = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
const board2 = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
let shipsPlaced = 0;
let phase = "placement"


function selectGame(data) {
  displayMessage("AI have placed his ships!", "white")
  displayTextMessage("Start shooting", "white")
  AiPlace(data)
  displayBoard({ boardnumber: 1, board: board })
}

/*function aiPlaceShip(x,y)
{
let ship1 = [];
let ship2 = [];
let arr = data.game1.split(/[:,{}]/);

for(let i = 0; i < arr.length; i++){
    if(arr[i] == 's1')
    {
      ship1.push(arr[i+1])
    }
    if(arr[i] == 's2'){
        ship2.push(arr[i+1])
    }
}
let thisX = [];
thisX.push(ship1[0].charCodeAt()-97);
let thisY = [];
thisY.push(Number(ship1[0][1]))
board[thisX][thisY-1] = "S"
let thisX2 = [];
thisX2.push(ship2[0].charCodeAt()-97);
let thisY2 = [];
thisY2.push(Number(ship2[0][1]))
board[thisX2][thisY2-1] = "S"
phase = "shooting"
};*/

let ship = [];

function AiPlace(data) {
  let gamemode = data;
  let arr = gamemode.split(/[:,{}]/);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length === 2 && arr[i].includes("s")) {
      ship.push(arr[i + 1])
    }
  }
  let thisX = [];
  thisX.push(ship[0].charCodeAt() - 97);
  let thisY = [];
  thisY.push(Number(ship[0][1]))
  board[thisX][thisY - 1] = "S"
  let thisX2 = [];
  thisX2.push(ship[0].charCodeAt() - 97);
  let thisY2 = [];
  thisY2.push(Number(ship[0][1]))
  board[thisX2][thisY2 - 1] = "S"
  phase = "shooting"
  board[thisX][thisY] = "S"
  board[thisX2][thisY2] = "S"

};


function placeShip(x, y) {
  let posX = (x.charCodeAt() - 65);
  let posY = +y;
  if (board2[posX][posY] !== "") {
    displayMessage("This field is already in use! Choose an other one!", "red")
  }
  else if (phase == "placement" && canPlaceThere(posX, posY) && shipsPlaced < 2) {
    board2[posX][posY] = "🛳️ ";
    displayBoard({ boardnumber: 2, board: board2 })
    shipsPlaced++
    displayMessage("You have placed " + shipsPlaced + " ships")
    displayTextMessage("You have 1 more ship left!")
    if (phase == "placement" && shipsPlaced >= 2) {
      displayTextMessage("It's AI's turn!")
      displayMessage("You have finished the placement phase. Start shooting!", "white")
      phase = "shooting"
    }
  }
}

function iShoot(x, y) {
  console.log(board)
  let posX = (x.charCodeAt() - 65);
  let posY = +y;
  if (phase == "shooting") {
    if (board[posX][posY] == "S") {
      board[posX][posY] = "💥"
      displayBoard({ boardnumber: 1, board: board })
    }
    if (board[posX][posY] !== "🌊" && board[posX][posY] === "") {
      board[posX][posY] = "🌊"
      displayBoard({ boardnumber: 1, board: board })
    }
  }
}

function canPlaceThere(x, y) {
  if (x > 0 && board2[x - 1][y] === "🛳️ ") {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    return false
  }
  else if (x < board2.length - 1 && board2[x + 1][y] === "🛳️ ") {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    return false
  }
  else if (y > 0 && board2[x][y - 1] === "🛳️ ") {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    return false
  }
  else if (y < board2.length - 1 && board2[x][y + 1] === "🛳️ ") {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    return false
  }
  else {
    return true
  }
}

function handleClick(data, side) {
  displayMessage(data.x + data.y + data.clickType);
  iShoot(data.x, data.y)
  placeShip(data.x, data.y)
}

function resetGame() {
  board = [];
  for (let i = 0; i < 4; i++) {
    board.push([])
    for (let j = 0; j < 4; j++) {
      board[i].push("");
    }
  }
  displayBoard({ boardnumber: 1, board: board });
}

let gameOver = 0;
let aiShots = [];

function aiShoot() {
  let x, y;
  do {
    x = Math.floor(Math.random() * 4);
    y = Math.floor(Math.random() * 4);
  } while (aiShots.includes(`${x},${y}`));

  if (board2[x][y] === "🛳️ " && gameOver < 2) {
    board2[x][y] = "💥";
    displayBoard({ boardnumber: 2, board: board2 });
    displayMessage("The AI hit your ship at " + String.fromCharCode(x + 65) + y, "red");
    aiShots.push(`${x},${y}`)
    gameOver++
    if (gameOver == 2) {
      displayMessage("GAME OVER! AI WON! :(")
    }

  } else if (board2[x][y] === "" && gameOver < 2) {
    board2[x][y] = "🌊";
    displayBoard({ boardnumber: 2, board: board2 });
    displayMessage("The AI missed at " + String.fromCharCode(x + 65) + y, "white");
    aiShots.push(`${x},${y}`)
  }
}

displayBoard({ boardnumber: 1, board: board });
displayBoard({ boardnumber: 2, board: board2 });
displayMessage("Let's get started!", "white");
displayTextMessage("It's time to place your ships!", "white");