// CARREGA PROMPT NO INÍCIO DO JOGO

let amountCards = Number(prompt("Com quantas cartas você quer jogar? Escolha um número par de 4 a 14."));

while (amountCards < 4 || amountCards > 14 || amountCards % 2 !== 0) {
    amountCards = Number(prompt("Com quantas cartas você quer jogar? Escolha um número par de 4 a 14."));
}

// EMBARALHA AS CARTAS

const picArray = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];

function compare() {
    return Math.random() - 0.5;
}

// INSERE AS CARTAS NO TABULEIRO

function insertCards(amountCards) {

    picArray.sort(compare);

    let duplicateArray = [];

    for (let i = 0; i < (amountCards / 2); i++) {
        duplicateArray.push(picArray[i]);
        duplicateArray.push(picArray[i]);

        //posso comparar o número do índice da carta pra saber se elas são iguais ou não
    }

    duplicateArray.sort(compare);

    const area = document.querySelector(".game-area");
    let insert = "";

    for (let i = 0; i < amountCards; i++) {
        insert += `<div class="card">
                        <div class="face" onclick="flipCard(this);">
                            <img class="back" src="/img/front.png" />
                        </div>
                        <div class="face front-face hidden" onclick="flipCard(this);">
                            <img class="front" src="/img/${duplicateArray[i]}" />
                        </div>
                    </div>`;

    }

    area.innerHTML = insert;
}

insertCards(amountCards);



let amountPairs = amountCards / 2;
console.log(amountPairs)
console.log("Amount of pairs")
//inserir em algum lugar a lógica que confirma se amountPairs nãoe está zerado

let playCounter = 0;
let firstCard = "";
let secondCard = "";

const board = document.querySelector(".game-area");

function flipCard(clickedCard) {

    console.log(clickedCard)
    console.log ("mostra valor do clickedCard")

    const parentElement = clickedCard.parentNode;
    const showFront = parentElement.querySelector(".hidden");
    showFront.classList.remove("hidden");

    console.log(playCounter);
    console.log("mostra valor do playCounter")

    if (playCounter % 2 === 0) {
        firstCard = showFront;
        secondCard = "";

    } else {
        secondCard = showFront;

        if (firstCard.innerHTML === secondCard.innerHTML) {
            amountPairs--;
            checkEndGame();
        } else {
            board.classList.add("no-clicking");
            setTimeout(unturnCards, 1000);
            setTimeout(allowClicks, 1000);
        }
    }

    playCounter++;    
}

const unturnCards = function () {
    firstCard.classList.add("hidden");
    secondCard.classList.add("hidden");
}

const allowClicks = function () {
    board.classList.remove("no-clicking");
}


// FINALIZA O JOGO

function checkEndGame () {
    if (amountPairs === 0) {
        setTimeout(delayedEnding, 1000);
    }
}

const delayedEnding = function () {
    alert(`Você ganhou o jogo em ${playCounter} jogadas!`);
}
