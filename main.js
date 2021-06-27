const $main = document.getElementById("main");
const $table = document.createElement("table");
const $result = document.createElement("div");

let clickable = true;
let turn = "O";
const rows = [];

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

$main.append($table);
$main.append($result);

// 게임의 승부를 판단하는 함수
function checkWinnerAndDraw(target) {
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;

  const hasWinner = checkHasWinner(rowIndex, cellIndex);
  const draw = rows.flat().every((td) => td.textContent);

  if (hasWinner) {
    endGame();
    return;
  }

  if (draw) {
    drawGame();
    return;
  }

  turn = turn === "O" ? "X" : "O";
}

// 승리조건 체크 함수
function checkHasWinner(rowIndex, cellIndex) {
  let hasWinner;

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

  return hasWinner;
}

// 승리자가 나온 경우 게임종료
function endGame() {
  $result.textContent = `${turn}님의 승리!`;
  $table.removeEventListener("click", checkTurnCallback);
}

// 비긴 경우 게임종료
function drawGame() {
  $result.textContent = `무승부!`;
  $table.removeEventListener("click", checkTurnCallback);
}

// 클릭 이벤트 핸들러 콜백 함수 : 차례에 따라 장기말 배치 및 게임 진행
function checkTurnCallback(event) {
  if (!clickable) return;
  if (event.target.textContent) return;

  event.target.textContent = turn;

  // 승부 검사
  checkWinnerAndDraw(event.target);

  if (turn === "X") {
    handleTurnOfComputer();
  }
}

// 컴퓨터 대국 기능 함수
function handleTurnOfComputer() {
  clickable = false;

  setTimeout(() => {
    const emptyCells = rows.flat().filter((v) => !v.textContent);
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = "X";

    checkWinnerAndDraw(randomCell);
    clickable = true;
  }, 1000);
}
