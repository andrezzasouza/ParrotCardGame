let amountCards = Number(prompt("Com quantas cartas você quer jogar? Escolha um número par de 4 a 14."));

while (amountCards < 4 || amountCards > 14 || amountCards % 2 !== 0) {
    amountCards = Number(prompt("Com quantas cartas você quer jogar? Escolha um número par de 4 a 14."));
}

function insertCards(amountCards) {
    const area = document.querySelector(".game-area");
    let insert = "";


    for (let i = 0; i < amountCards; i++) {
        insert += `<div class="card-back" onclick="flipCard(this);">
                        <img src="/img/front.png" />
                    </div>`;
    }

    area.innerHTML = insert;
}

insertCards(amountCards);

let playCounter = 0;

function flipCard(clickedCard) {
    // instruções para virar a carta
    playCounter++
}





/* HTML da carta de costas */

/* <div class="card-back">
    <img src="/img/front.png" />
</div> */