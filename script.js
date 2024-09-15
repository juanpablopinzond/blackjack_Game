let displayCardsOnScreen = document.getElementById("displayCards");
let displayResultOnScreen = document.getElementById("diplayResult");
let displaySuggestionOnScreen = document.getElementById("game_suggestion");
let displayReward = document.getElementById("game_reward");
let cardsArray = []
let sumCards = 0;
let isAlive = true;
let hasBlackJack = false;
let moneyEarned = Math.floor(Math.random() * 100 + 100);
let moneyForWinBlackjack = 500;
let totalOfReward = moneyEarned + moneyForWinBlackjack

function startGame() {
    let isAlive = true;
    let hasBlackJack = false
    const firstCard = getRandomCard();
    const secondCard = getRandomCard();
    cardsArray.push(firstCard, secondCard);
    sumCards = cardsArray[0] + cardsArray[1];
    renderGame();
}

function getRandomCard() {
    let randomCard = Math.floor(Math.random() * 13 + 1);
    if (randomCard === 1) {
        return 11;
    } else if (randomCard >= 11 && randomCard <= 13) {
        return 10;
    } else {
        return randomCard;
    }
}

function renderGame() {
    displayCardsOnScreen.textContent = `Cards: `;
    displayResultOnScreen.textContent = `Sum: ${sumCards}`
    for (let i = 0; i < cardsArray.length; i++) {
        displayCardsOnScreen.textContent += cardsArray[i] + " ";
    }
    if (sumCards < 21) {
        displaySuggestionOnScreen.textContent = `Do you want draw a new card? 🤔`;
        displayReward.textContent = "Juan: " + `got ${moneyEarned}$ as a first move`;
        isAlive = true;
    } else if (sumCards === 21) {
        displaySuggestionOnScreen.textContent = `You got BackJack, you win! 😎`;
        hasBlackJack = true
        displayReward.textContent = "Juan: " + `you take the ${moneyEarned} and ${moneyForWinBlackjack} for winning BlackJack = ${totalOfReward}`;
    } else {
        displaySuggestionOnScreen.textContent = `Game Over, you Lost! 😧`
        isAlive = false
        displayReward.textContent = "Juan: " + "lost His money";
    }
}

const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener("click", startGame);

function DrawNewCard() {
    if (isAlive === true && hasBlackJack === false) {
        const newCard = getRandomCard();
        cardsArray.push(newCard)
        sumCards += newCard;
        displaySuggestionOnScreen.textContent = `Do you want draw a new card? 🤔`;
        renderGame()
    } else if (hasBlackJack === true) {
        displaySuggestionOnScreen.textContent = `You got BackJack, you win! 😎`;
        displayResultOnScreen.textContent = `Sum: ${sumCards}`

    } else {
        displaySuggestionOnScreen.textContent = `Game Over, you Lost! 😧`
    }
}

const newCardBtn = document.getElementById("draw_new_card");
newCardBtn.addEventListener("click", DrawNewCard);