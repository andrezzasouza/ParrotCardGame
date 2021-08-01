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

let playCounter = 1;
let firstCard = "";
let secondCard = "";

function flipCard(clickedCard) {

    console.log(clickedCard)
    console.log ("mostra valor do clickedCard")

    const parentElement = clickedCard.parentNode;
    const showFront = parentElement.querySelector(".hidden");
    showFront.classList.remove("hidden");

    console.log(playCounter);
    console.log("mostra valor do playCounter")

    if (playCounter % 2 !== 0) {
        firstCard = showFront;
        console.log(firstCard)
        console.log ("mostra valor do firstCard")
        secondCard = "";
        //se não funcionar com o showFront, posso usar o clickedCard?
        //alguma forma de guardar o índice ou conteúdo do array

    } else {
        secondCard = showFront;
        console.log(secondCard)
        console.log ("mostra valor do secondCard")

        console.log(firstCard)
        console.log(secondCard)

        if (firstCard.innerHTML === secondCard.innerHTML) {
            amountPairs--;
            checkEndGame();
        } else {
            firstCard.classList.add("hidden");
            secondCard.classList.add("hidden");
            // desvirar as duas cartas com setTimeout
        }

        console.log(amountPairs);
    }

    playCounter++;    
}


// FINALIZA O JOGO

function checkEndGame () {
    if (amountPairs === 0) {
        alert(`Você ganhou o jogo em ${playCounter} jogadas!`);
    }

    // colocar um setTimeout aqui também pra carta virar antes do alert aparecer e não depois
}
