let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let twoPlayerBtn = document.querySelector("#twoPlayer");
let playAIBtn = document.querySelector("#playAI");

let turnO = true;
let gameMode = "2p"; // default: 2 Players

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winner", "o-move", "x-move");
    }
};

const showWinner = (winner, pattern) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    // Highlight winning pattern
    pattern.forEach((index) => {
        boxes[index].classList.add("winner");
    });

    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val, pattern);
                return true;
            }
        }
    }
    return false;
};

// AI move (random choice for now)
const computerMove = () => {
    let emptyBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length > 0) {
        let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        let chosenBox = boxes[randomIndex];
        chosenBox.innerText = "X";
        chosenBox.classList.add("played", "x-move");
        setTimeout(() => chosenBox.classList.remove("played"), 300);
        chosenBox.disabled = true;
        if (!checkWinner()) {
            turnO = true; // back to player
        }
    }
};

// Player clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("played", "o-move");
            setTimeout(() => box.classList.remove("played"), 300);

            box.disabled = true;
            turnO = false;

            if (gameMode === "ai") {
                if (!checkWinner()) {
                    setTimeout(() => {
                        computerMove();
                    }, 500); // AI plays after delay
                }
            } else {
                checkWinner();
            }
        } else if (gameMode === "2p") {
            box.innerText = "X";
            box.classList.add("played", "x-move");
            setTimeout(() => box.classList.remove("played"), 300);

            box.disabled = true;
            turnO = true;
            checkWinner();
        }
    });
});

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Mode selection
twoPlayerBtn.addEventListener("click", () => {
    gameMode = "2p";
    resetGame();
});

playAIBtn.addEventListener("click", () => {
    gameMode = "ai";
    resetGame();
});

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
