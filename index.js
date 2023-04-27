const board = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
const board2 = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
let shipsPlaced = 0;
let phase = "placement"

function selectGame(data) {
  displayMessage("AI have placed his ships!", "white")
  displayTextMessage("Now it's your turn!", "white")
  aiPlace1Ships(data)
}

let ship = [];
function aiPlace1Ships(data) {
    let gamemode = data;
    let arr = gamemode.split(/[:,{}]/);
  for(let i = 0; i < arr.length; i++){
      if(arr[i].length === 2 && arr[i].includes("s"))
      {
        ship.push(arr[i+1])
      }
  }
  let posX = [];
  posX.push(ship[0].charCodeAt()-97);
  let posX2 = [];
  posX2.push(ship[1].charCodeAt()-97);
  let posY = [];
  posY.push(Number(ship[0][1]))
let posY2 = [];
  posY2.push(Number(ship[1][1]))
  board[posX][posY-1] = " "
  board[posX2][posY2-1] = " "
}

function placeShip(x, y) {
  let posX = (x.charCodeAt() - 65);
  let posY = +y;
  if (board2[posX][posY] !== "" && phase == "placement") {
    displayMessage("This field is already in use! Choose an other one!", "red")
  }
  else if (phase == "placement" && canPlaceThere(posX, posY) && shipsPlaced < 2) {
    board2[posX][posY] = "🛳️ ";
    displayBoard({ boardnumber: 2, board: board2 })
    shipsPlaced++
    displayMessage("You have placed " + shipsPlaced + " ship", "white")
    displayTextMessage("You have 1 more ship left!")
    if (phase == "placement" && shipsPlaced >= 2) {
      displayTextMessage("It's AI's turn to shoot!")
      displayMessage("You have finished the placement phase. Start shooting!", "white")
      phase = "shooting"
    }
  }
}

let aiGameOver = 0;

function iShoot(x, y) {
  console.log(board)
  let posX = (x.charCodeAt() - 65);
  let posY = +y;
  if (phase == "shooting") {
    if (turn === false && board[posX][posY] == " " && aiGameOver < 2 && gameOver < 2)  {
      board[posX][posY] = "💥"
      displayBoard({ boardnumber: 1, board: board });
      displayMessage("You hit AI's ship at " + String.fromCharCode(posX + 65) + (posY+1), "red");
      aiGameOver++
      turn = true
      if(aiGameOver == 2)
      {
        displayMessage(" YOU WON!")
        displayTextMessage("You are smarter than the AI :)")
      }
      if (gameOver == 2) {
        displayMessage("GAME OVER! AI WON! :(")
        displayTextMessage("Maybe next time! 😜 ")
      }
    }
    else if (turn === false && board[posX][posY] !== "🌊" && board[posX][posY] === "" && aiGameOver < 2 && gameOver < 2) {
      displayMessage("You missed at " + String.fromCharCode(posX + 65) + (posY+1), "white");
      board[posX][posY] = "🌊"
      displayBoard({ boardnumber: 1, board: board })
      turn = true
    }
  }
  if (gameOver < 2 && aiGameOver < 2){
  displayTextMessage("It's AI's turn to shoot!")
  }
}

function canPlaceThere(x, y) {
    //let coords = [[x, y],[x-1, y],[x+1,y],[x, y-1],[x, y+1]]
  // let coords = [{x:x, y:y},{x:x-1, y:y},...]
  if (x > 0 && board2[x - 1][y] === "🛳️ ") {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    displayTextMessage("Bence", "white")
    return false
  }
  else if (x < board2.length - 1 && board2[x + 1][y] === "🛳️ ") {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    displayTextMessage("Bence", "white")
    return false
  }
  else if (y > 0 && board2[x][y - 1] === "🛳️ ") {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    displayTextMessage("Bence", "white")
    return false
  }
  else if (y < board2.length - 1 && board2[x][y + 1] === "🛳️ ") {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    displayTextMessage("Bence", "white")
    return false
  }
  else {
    return true
  }
}

function handleClick(data) {
  if(turn === true)
  {
  displayMessage("It's not your turn!", "red")
  displayTextMessage("AI shoot!" , "white")
  } else
  {
  iShoot(data.x, data.y)
  }
  placeShip(data.x, data.y)
}

function resetGame() {
  const board = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
  const board2 = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
  displayBoard({ boardnumber: 1, board: board });
  displayBoard({ boardnumber: 2, board: board2 });
  displayMessage("Start a new game!", "white")
  displayTextMessage("Let's choose a gamemode" , "white")
}

let gameOver = 0;
let aiShots = [];
let turn = true;

function aiShoot() {
  let shot = false
  let x, y;
  do {
    x = Math.floor(Math.random() * 4);
    y = Math.floor(Math.random() * 4);
  } while (aiShots.includes(`${x},${y}`));

  if (turn === true && board2[x][y] === "🛳️ " && gameOver < 2 && aiGameOver < 2) {
    board2[x][y] = "💥";
    displayBoard({ boardnumber: 2, board: board2 });
    displayMessage("The AI hit your ship at " + String.fromCharCode(x + 65) + (y+1), "red");
    aiShots.push(`${x},${y}`)
    gameOver++
    turn = false
    shot = true
    if (gameOver == 2) {
      displayMessage("GAME OVER! AI WON! :(")
      displayTextMessage("Maybe next time! 😜 ")
    }
    if (aiGameOver == 2){
      displayMessage(" YOU WON!")
      displayTextMessage("You are smarter than the AI :)")
    }

  } else if (turn === true && board2[x][y] === "" && gameOver < 2 && aiGameOver < 2) {
    board2[x][y] = "🌊";
    displayBoard({ boardnumber: 2, board: board2 });
    displayMessage("The AI missed at " + String.fromCharCode(x + 65) + (y+1), "white");
    aiShots.push(`${x},${y}`)
    turn = false
    shot = true
  }
  if(gameOver < 2 && aiGameOver < 2){
  displayTextMessage("It's your turn to shoot!")
  }
  if (shot === false && turn === false)
  {
    displayMessage("It's not AI's turn!", "red")
    displayTextMessage("You shoot!" , "white")
  }
}

displayBoard({ boardnumber: 1, board: board });
displayBoard({ boardnumber: 2, board: board2 });
displayMessage("Let's get started!", "white");
displayTextMessage("Select gamemode!", "white");