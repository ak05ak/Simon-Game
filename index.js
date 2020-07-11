// Declaring variable using let
// To keep track of which light is flashed(green:1,red:2,yellow:3,blue:4)
let order = [];
// Order in which player is passing the lights in
let playerOrder = [];
// Number of flashesh that have appeared in the game
let flash;
// To keep track of turnCounter
let turn;
// Boolean value, whether the player is doing well or not
let good;
// Boolean value,to keep track whether it is computer turn or player turn
let compTurn;
// Adding interval between flashes
let intervalId;
// Boolean value,to keep track whether strict checkbox is checked or not. Initially false
let strict = false;
// Boolean value,to keep track whether power checkbox is checked or not. Initially false
let on = false;
// Boolean value, which tells whether the player has won or not
let win;
// Selecting all html elements using their id
const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");
// Strict checkbox
// (event) => is a way of creating Anonymous function in which event is a parameter
// .checked is used only with checkbox
strictButton.addEventListener("click", (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});
// Power checkbox
onButton.addEventListener("click", (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor(); //when power is off, all lights should be off(default color)
    clearInterval(intervalId);
  }
});
// Start button
startButton.addEventListener("click", (event) => {
  // If power is ON or user WON and then clicks "Start" button, then game will start from begining
  if (on || win) {
    play();
  }
});
// play function
function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  //   generating 10 random numbers b/w 1 and 4 and storing it in order array
  for (var i = 0; i < 10; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  //   First its computer turn
  compTurn = true;
  intervalId = setInterval(gameTurn, 600);
}
// Computer turn function
function gameTurn() {
  on = false; //while computer is flashing colors, user cannot click buttons
  //if computer turn is over
  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }
  // Computer turn
  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}
//topLeft(darkgreen) is going to flash(change color to lightgreen) and play sound
function one() {
  let audio = document.getElementById("clip1");
  audio.play();
  topLeft.style.backgroundColor = "lightgreen";
}
//topRight(darkred) is going to flash(change color to tomato) and play sound
function two() {
  let audio = document.getElementById("clip2");
  audio.play();
  topRight.style.backgroundColor = "tomato";
}
//bottomLeft(goldenrod) is going to flash(change color to yellow) and play sound
function three() {
  let audio = document.getElementById("clip3");
  audio.play();
  bottomLeft.style.backgroundColor = "yellow";
}
//bottomRight(darkblue) is going to flash(change color to lightskyblue) and play sound
function four() {
  let audio = document.getElementById("clip4");
  audio.play();
  bottomRight.style.backgroundColor = "lightskyblue";
}
// Function which sets default color of the topLeft(darkgreen), topRight(darkred),...
function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}
// Flashes all colours when user is wrong or when wins the game(all rounds)
function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}
// When user clicks a color
topLeft.addEventListener("click", (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 250);
    }
  }
});
topRight.addEventListener("click", (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 250);
    }
  }
});
bottomLeft.addEventListener("click", (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 250);
    }
  }
});
bottomRight.addEventListener("click", (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 250);
    }
  }
});
function check() {
  // if last color(in number) the player clicked !== last color(in number) the computer flashed
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;
  // if player won all turns
  if (playerOrder.length == 10 && good) {
    winGame();
  }
  // Player lose
  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn; //turnCounter displays last correct turn
      clearColor();
      // If strict mode was checked
      if (strict) {
        play();
      }
      // If strict mode was unchecked
      else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 600);
      }
    }, 600);
    // wrong sound on click when user clicked wrong color
    let audio = document.getElementById("clip5");
    audio.play();
  }
  // Player won the round but not the game yet
  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 600);
  }
}
// When user wins the game(all rounds)
function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}
