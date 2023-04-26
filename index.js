let board = [["","","",""],["","","",""],["","","",""],["","","",""]];
const board2 = [["","","",""],["","","",""],["","","",""],["","","",""]];
let hiddenBoard = [["","","",""],["","","",""],["","","",""],["","","",""]];
let shipsPlaced = 0;
let phase = "placement"
let aiShipsPlaced = 0;

function selectGame(data) {
  displayMessage(data, "black")
  aiPlaceShip(data)
}

/*function aiPlaceShip(data)
{

x= 
y= 

if (AIcanPlaceThere(x,y) && aiShipsPlaced < 2)
{
hiddenBoard[x][y] = "S";
displayBoard({boardnumber : 2, board : board})
aiShipsPlaced ++
}
else if(aiShipsPlaced >= 2)
{
  phase = "shooting"
}
}*/


function placeShip(x, y)
{
let posX = (x.charCodeAt()-65);
let posY = +y;
if(board2[posX][posY] !== "" )
{
  displayMessage ("This field is already in use! Choose an other one!", "red")
}
else if (canPlaceThere(posX,posY) && shipsPlaced < 2)
{
board2[posX][posY] = "🛳️ ";
displayBoard({boardnumber : 2 , board : board2})
shipsPlaced ++
displayMessage("You have placed " + shipsPlaced + " ships")
displayTextMessage("You have 1 more ship left!")
if (shipsPlaced >= 2)
{
  displayTextMessage("It's AI's turn!")
}
}
else if(shipsPlaced >= 2)
{
  displayMessage ("You have finished the placement phase. Start shooting!" , "white")
  phase = "shooting"
}
}

function canPlaceThere(x,y)
{
  if (x > 0 && board2[x-1][y] === "🛳️ ")
  {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    return false
  }
  else if (x < board2.length-1 && board2[x+1][y] === "🛳️ ")
  {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    return false
  }
  else if (y > 0 && board2[x][y-1] === "🛳️ ")
  {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    return false
  }
  else if (y < board2.length-1 && board2[x][y+1] === "🛳️ ")
  {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    return false
  }
  else
  {
  return true
  }
}

/*function AIcanPlaceThere(x,y)
{
  if (x > 0 && board[x-1][y] === "S")
  {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    return false
  }
  else if (x < board.length-1 && board[x+1][y] === "S")
  {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    return false
  }
  else if (y > 0 && board[x][y-1] === "S")
  {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    return false
  }
  else if (y < board.length-1 && board[x][y+1] === "S")
  {
    displayMessage("You can not place your ships next to each other! Choose an other field!", "red")
    return false
  }
  else
  {
  return true
  }
}*/
function handleClick(data) 
{
 displayMessage(data.x + data.y + data.clickType);
 placeShip (data.x , data.y)
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

let gameOver = 0;
let aiShots = [];

  function aiShoot() {
    let x, y;
    do {
      x = Math.floor(Math.random() * 4);
      y = Math.floor(Math.random() * 4);
    } while (aiShots.includes(`${x},${y}`));

    if (board2[x][y] === "🛳️ " && board[x][y] === "" && gameOver < 2) 
    {
      board2[x][y] = "💥";
      displayBoard({ boardnumber: 2, board: board2 });
      displayMessage("The AI hit your ship at " + String.fromCharCode(x+65) + y, "red");
      aiShots.push (`${x},${y}`)
      gameOver++
      if(gameOver == 2)
      {
        displayMessage("GAME OVER! AI WON! :(")
      }

    } else if (board[x][y] === "" && gameOver < 2) 
    {
      board2[x][y] = "🌊 ";
      displayBoard({ boardnumber: 2, board: board2 });
      displayMessage("The AI missed at " + String.fromCharCode(x+65) + y, "white");
      aiShots.push (`${x},${y}`)
    }
    }

displayBoard({boardnumber: 1,board: board});
displayBoard({boardnumber: 2,board: board2});
displayMessage("Let's get started!", "white");
displayTextMessage("It's time to place your ships!", "white");