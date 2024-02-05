let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

console.log(boxes);

const O_TEXT = "O";
const X_TEXT = "X";

let currentPlayer = X_TEXT;

let spaces = Array(9).fill(null);
let count_plays = 0;

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;
  if (!spaces[id] && count_plays < 9) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerText = `${currentPlayer} has won`;
      let winning_blocks = playerHasWon();
      count_plays = 10;
      winning_blocks.map((box) => {
        boxes[box].style.backgroundColor = winnerIndicator;
        boxes[box].style.backgroundColor = "green";
      });
    }
    count_plays++;
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  }
  if (count_plays === 9) {
    playerText.innerHTML = "Draw Game";
    boxes.forEach((box) => {
      box.style.color = "red";
    });
    playerText.style.color = "red";
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  currentPlayer = X_TEXT;
  playerText.innerText = "Tic Tac Toe";
}

startGame();
