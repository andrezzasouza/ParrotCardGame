let amountCards = Number(prompt("Com quantas cartas você quer jogar? Escolha um número par de 4 a 14."));

while (amountCards < 4 || amountCards > 14 || amountCards % 2 !== 0) {
    amountCards = Number(prompt("Com quantas cartas você quer jogar? Escolha um número par de 4 a 14."));
}

const picArray = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];

function compare() {
    return Math.random() - 0.5;
}

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
        insert += `<div class="card-back" onclick="flipCard(this);">
                        <img class="front" src="/img/front.png" />
                        <img class="back hidden" src="/img/${duplicateArray[i]}" />
                    </div>`;
    }

    area.innerHTML = insert;
}

insertCards(amountCards);

let playCounter = 0;

function flipCard(clickedCard) {
    //instruções para virar a carta
    playCounter++
}