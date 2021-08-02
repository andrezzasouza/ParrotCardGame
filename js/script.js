let start = true;

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

// INSERE AS CARTAS NO TABULEIRO E RELÓGIO NA TELA

function insertCards(amountCards) {

    picArray.sort(compare);

    let duplicateArray = [];

    for (let i = 0; i < (amountCards / 2); i++) {
        duplicateArray.push(picArray[i]);
        duplicateArray.push(picArray[i]);
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

let addClock = document.querySelector(".counter")

function insertClock() {
    addClock.innerHTML = "0<span>s</span>";
    addClock.classList.add("show-clock");
}

insertClock();
insertCards(amountCards);

let amountPairs = amountCards / 2;

let showFront = "";
let hideBack = "";

let firstCard = "";
let secondCard = "";

let playCounter = 0;
let time = 0;

const board = document.querySelector(".game-area");
let idInterval;

// INICIA CONTAGEM DO RELÓGIO

const startClock = function () {
    if (amountPairs === 0) {
        clearInterval(idInterval);
    } else {
        time++;
        addClock.innerHTML = `${time}<span>s</span>`;
    }
}

// VIRA AS CARTAS

function flipCard(clickedCard) {
    if (playCounter === 0) {
        idInterval = setInterval(startClock, 1000);
    }

    showFront = clickedCard.querySelector(".back-face");
    showFront.classList.remove("effect-back");

    hideBack = clickedCard.querySelector(".effect-front");
    hideBack.classList.remove("effect-front");

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

// DESVIRA AS CARTAS

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

// VOLTA A PERMITIR CLIQUES DEPOIS DE VIRAR 2 CARTAS

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
    alert(`Você ganhou o jogo em ${playCounter} jogadas e ${time} segundos!`);
    restartGame();
}

// VERIFICA SE JOGO RECOMEÇA

let restart = "";

function restartGame() {

    let validAnswer = false;

    do {
        restart = prompt("Você quer recomeçar? S ou N?");
        if (restart === "S" || restart === "N") {
            validAnswer = true;
        }
    } while (validAnswer !== true);

    const clearGame = document.querySelectorAll(".card");

    for (let i = 0; i < clearGame.length; i++) {
        clearGame[i].remove();  
    }

    if (restart === "S") {
        const screen = document.querySelector("body");
        screen.innerHTML = "";
        start = true;
        clearInterval(idInterval);

    } else if (restart === "N") {
        for (let i = 0; i < clearGame.length; i++) {
            clearGame[i].remove();  
        }
        const overMessage = document.querySelector("h1");
        overMessage.innerHTML = "GAME OVER!"
        clearInterval(idInterval);
        start = false;
    }
}


