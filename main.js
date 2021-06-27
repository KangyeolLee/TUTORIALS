const { body } = document;
const $table = document.createElement("table");
const $result = document.createElement("div");

let turn = "O";
const rows = [];

const checkWinnerAndDraw = (target) => {
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;

  let hasWinner = false;

  // 가로줄 체크
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 체크
  else if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 체크
  else if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  } else if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }

  let draw = rows.flat().every((td) => td.textContent);

  if (hasWinner) {
    $result.textContent = `${turn}님의 승리!`;
    $table.removeEventListener("click", checkTurnCallback);
    return;
  }

  if (draw) {
    $result.textContent = `${turn}님의 승리!`;
    $table.removeEventListener("click", checkTurnCallback);
    return;
  }

  turn = turn === "O" ? "X" : "O";
};

let clickable = true;
const checkTurnCallback = (event) => {
  if (!clickable) return;
  if (event.target.textContent) return;

  event.target.textContent = turn;

  // 승부 검사
  checkWinnerAndDraw(event.target);

  // 컴퓨터와 대련 기능
  if (turn === "X") {
    clickable = false;
    setTimeout(() => {
      const emptyCells = rows.flat().filter((v) => !v.textContent);
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.textContent = "X";
      checkWinnerAndDraw(event.target);
      clickable = true;
    }, 1000);
  }
};

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement("tr");
  const cells = [];
  for (let i = 0; i < 3; i++) {
    const $td = document.createElement("td");
    cells.push($td);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}

$table.addEventListener("click", checkTurnCallback);

body.append($table);
body.append($result);
