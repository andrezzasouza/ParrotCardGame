// CARREGA PROMPT E IMPEDE INSERÇÃO DE ALGUNS VALORES

let amountCards = Number(prompt("Com quantas cartas você quer jogar? Escolha um número par de 4 a 14."));

while (amountCards < 4 || amountCards > 14 || amountCards % 2 !== 0) {
    amountCards = Number(prompt("Com quantas cartas você quer jogar? Escolha um número par de 4 a 14."));
}

// EMBARALHA AS CARTAS

const picArray = [
    "bobrossparrot.gif", 
    "explodyparrot.gif", 
    "fiestaparrot.gif", 
    "metalparrot.gif", 
    "revertitparrot.gif", 
    "tripletsparrot.gif", 
    "unicornparrot.gif"
];

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
                            <img class="back" src="./img/front.png" />
                        </div>
                        <div class="face effect-front">
                            <img class="front" src="./img/${duplicateArray[i]}" />
                        </div>
                    </div>`;

    }
    area.innerHTML = insert;
}

const addClock = document.querySelector(".counter");

function insertClock() {
    addClock.innerHTML = "0<span>s</span>";
    addClock.classList.add("show-clock");
}

insertClock();
insertCards(amountCards);

// INICIA CONTAGEM DO RELÓGIO

let amountPairs = amountCards / 2;
let idInterval;
let time = 0;

const startClock = function () {
    if (amountPairs === 0) {
        clearInterval(idInterval);
    } else {
        time++;
        addClock.innerHTML = `${time}<span>s</span>`;
    }
}

// VIRA AS CARTAS

let playCounter = 0;

let showFront = "";
let hideBack = "";

let firstCard = "";
let secondCard = "";

const board = document.querySelector(".game-area");

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

    const firstDivList = firstCard.parentNode.querySelectorAll("div");
    const secondDivList = secondCard.parentNode.querySelectorAll("div");

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
    checkRestart();
}

// VERIFICA SE JOGO RECOMEÇA

function checkRestart() {

    let restart = "";
    let validAnswer = false;

    do {
        restart = prompt("Você quer recomeçar? S ou N?");
        if (restart === "S" || restart === "N") {
            validAnswer = true;
        }
    } while (validAnswer !== true);

    const clearGame = document.querySelectorAll(".card");

    if (restart === "S") {
        restartGame();
    } else if (restart === "N") {
        for (let i = 0; i < clearGame.length; i++) {
            clearGame[i].remove();  
        }
        const overMessage = document.querySelector("h1");
        overMessage.innerHTML = "GAME OVER!"
    }
}

// REINICIA O JOGO

function restartGame() {
    document.location.href="";
}
