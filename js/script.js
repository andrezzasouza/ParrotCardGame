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
        insert += `<div class="card" onclick="flipCard(this);">
                        <div class="back-face face effect-back">
                            <img class="back" src="/img/front.png" />
                        </div>
                        <div class="face effect-front">
                            <img class="front" src="/img/${duplicateArray[i]}" />
                        </div>
                    </div>`;

    }

    area.innerHTML = insert;
}

insertCards(amountCards);



let amountPairs = amountCards / 2;


let showFront = "";
let hideBack = "";

let firstCard = "";
let secondCard = "";

let playCounter = 0;

const board = document.querySelector(".game-area");

function flipCard(clickedCard) {

    console.log(clickedCard)
    console.log ("mostra valor do clickedCard")

    // const parentElement = clickedCard.parentNode;

    // console.log(parentElement);
    // console.log("parentElement aqui em cima");

    

    showFront = clickedCard.querySelector(".back-face");
    console.log(showFront);
    console.log("showFront antes do remove");
    showFront.classList.remove("effect-back");
    console.log(showFront);
    console.log("showFront depois do remove");

    hideBack = clickedCard.querySelector(".effect-front");
    console.log(hideBack);
    console.log("hideBack antes do remove");
    hideBack.classList.remove("effect-front");
    console.log(hideBack);
    console.log("hideBack depois do remove");

    console.log(playCounter);
    console.log("mostra valor do playCounter")

    if (playCounter % 2 === 0) {
        firstCard = hideBack;
        secondCard = "";

    } else {
        secondCard = hideBack;

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

    const firstCardParent = firstCard.parentNode;
    const firstDivList = firstCardParent.querySelectorAll("div");
    const secondCardParent = secondCard.parentNode;
    const secondDivList = secondCardParent.querySelectorAll("div");

    firstDivList[0].classList.add("effect-back");
    firstDivList[1].classList.add("effect-front");

    secondDivList[0].classList.add("effect-back");
    secondDivList[1].classList.add("effect-front");
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
