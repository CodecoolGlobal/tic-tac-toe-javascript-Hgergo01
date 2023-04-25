let board = [["","","",""],["","","",""],["","","",""],["","","",""]];
const board2 = [["","","",""],["","","",""],["","","",""],["","","",""]];
let shipsPlaced = 0;
let phase = "placement"

function selectGame(data) {
  displayMessage(data, "black");
}

function placeShip(x, y)
{
let posX = (x.charCodeAt()-65);
let posY = +y;
if(board2[posX][posY] !== "" )
{
  displayMessage ("Choose an other field!")
}
else if (canPlaceThere(posX,posY))
{
board2[posX][posY] = "X";
displayBoard({boardnumber : 2 , board : board2})
shipsPlaced ++
}
if(shipsPlaced >= 2)
{
  displayMessage ("You have finished the placement phase. Start shooting!" , "purple")
  phase = "shooting"
}
}

function canPlaceThere(x,y)
{
  if (x > 0 && board2[x-1][y] === "X")
  {
    displayMessage("No!")
    return false
  }
  else if (x < board2.length-1 && board2[x+1][y] === "X")
  {
    displayMessage("No!")
    return false
  }
  else if (y > 0 && board2[x][y-1] === "X")
  {
    displayMessage("No!")
    return false
  }
  else if (y < board2.length-1 && board2[x][y+1] === "X")
  {
    displayMessage("No!")
    return false
  }
  else
  {
  return true
  }
}

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

function aiShoot(data) {
  console.log(data);
}

displayBoard({boardnumber: 1,board: board});
displayBoard({boardnumber: 2,board: board2});
displayMessage("message", "green");
displayTextMessage("text message", "red");