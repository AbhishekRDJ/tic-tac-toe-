let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('.reset');
let newGameButton = document.querySelector('.newgame');
let showWinnerElement = document.querySelector('.show_winner');
let player1Input = document.querySelector('#username1');
let player2Input = document.querySelector('#username2');
let player1ScoreButton = document.querySelector('#player1_score');
let player2ScoreButton = document.querySelector('#player2_score');


let player1 = true;
let player1Score = 0;
let player2Score = 0;

const winningPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
    showWinnerElement.classList.remove("hide");
    newGameButton.classList.remove("hide");
};

const showWinner = (winner) => {
    showWinnerElement.innerText = `Winner: ${winner}`;
    disableBoxes();
    newGameButton.classList.remove("hide");
};

const checkWin = () => {
    for (let pattern of winningPossibilities) {
        let [pos1, pos2, pos3] = pattern;
        let position1 = boxes[pos1].innerText;
        let position2 = boxes[pos2].innerText;
        let position3 = boxes[pos3].innerText;

        if (position1 !== '' && position1 === position2 && position2 === position3) {
            let winner = (position1 === 'O') ? player1Input.value : player2Input.value;
            showWinner(winner);
            updateScores(position1);
            return true;
        }
    }
    return false;
};

const updateScores = (winnerSymbol) => {
    if (winnerSymbol === 'O') {
        player1Score++;
        player1ScoreButton.innerText = player1Score;
    } else {
        player2Score++;
        player2ScoreButton.innerText = player2Score;
    }
};

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = '';
        box.disabled = false;
    });
    showWinnerElement.classList.add("hide");
    newGameButton.classList.add("hide");
    player1 = true;
};

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (box.innerText === "") {
            box.innerText = player1 ? "O" : "X";
            player1 = !player1;
            if (!checkWin()) {
                showWinnerElement.innerText = '';
            }
        }
    });
});
const newGame = () => {
    player1Input.value = '';
    player2Input.value = '';
    player1Score = 0;
    player2Score = 0;
    player1ScoreButton.innerText = '0';
    player2ScoreButton.innerText = '0';
    resetGame();
};

newGameButton.addEventListener('click', resetGame);
resetButton.addEventListener('click', newGame);

