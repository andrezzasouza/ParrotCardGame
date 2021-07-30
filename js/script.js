const amountCards = Number(prompt("Com quantas cartas você quer jogar? Escolha um número par de 4 a 14."));

function insertCards(amountCards) {
    const area = document.querySelector(".game-area");
    let insert = "";


    for (let i = 0; i < amountCards; i++) {
        insert += `<div class="card-back" onclick="flipCard();"><img src="/img/front.png" /></div>`;
    }

    area.innerHTML = insert;
}

insertCards(amountCards);



/* HTML da carta de costas */

/* <div class="card-back">
    <img src="/img/front.png" />
</div> */