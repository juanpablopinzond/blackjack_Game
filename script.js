const displayCardsOnScreen = document.getElementById("displayCards");
const displayResultOnScreen = document.getElementById("diplayResult");
const displaySuggestionOnScreen = document.getElementById("game_suggestion");
const displayReward = document.getElementById("game_reward");
let cardsArray = []
let sumCards = 0;
let isAlive = true;
let hasBlackJack = false;
let moneyEarned = Math.floor(Math.random() * 100 + 100);
let moneyForWinBlackjack = 500;
let totalOfReward = moneyEarned + moneyForWinBlackjack;
const playerName = document.getElementById("player_name");
const playerLasName = document.getElementById("player_lstName");
const playerAge = document.getElementById("player_age");
let user = {
    name: null,
    lastName: null,
    age: null
};

const namePattern = /^[a-zA-Z\s]+$/; //Expresion regular para permitir solo letras y espacios
const numberPatterns = /^[0-9]+$/; //Expresion regular para permitir solo numeros

//Se ejecutan los do mientras se ingresen valores correctamente,
//si se ingresa cadena vacia, solo espacios o numeros el bucle ejecuta el do.

do {
    user.name = window.prompt("Insert your name");
} while (user.name === null || user.name.trim() === "" || !namePattern.test(user.name));

do {
    user.lastName = window.prompt("Insert your last name");
} while (user.lastName === null || user.lastName.trim() === "" || !namePattern.test(user.lastName));

do {
    user.age = window.prompt("Insert your age");
} while (user.age === null || user.name.trim() === "" || !numberPatterns.test(user.age));


if (user.name !== "" && user.lastName !== "" && user.age !== "") {
    playerName.textContent = `Name: ${user.name}`;
    playerLasName.textContent = `Last Name: ${user.lastName}`;
    playerAge.textContent = `Age: ${user.age}`;
}


function startGame() {
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
        displayReward.textContent = `You got ${moneyEarned}$ as a first move`;
        isAlive = true;
    } else if (sumCards === 21) {
        displaySuggestionOnScreen.textContent = `You got BackJack, you win! 😎`;
        hasBlackJack = true
        displayReward.textContent = `you take the ${moneyEarned}$ and ${moneyForWinBlackjack}$ for winning BlackJack = ${totalOfReward}$`;
    } else {
        displaySuggestionOnScreen.textContent = `Game Over, you Lost! 😧`
        isAlive = false
        displayReward.textContent = "You lost all the money";
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