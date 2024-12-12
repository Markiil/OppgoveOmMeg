document.getElementById("deal-start").addEventListener("click", startGame);
document.getElementById("bet-button").addEventListener("click", bet);
document.getElementById("stand-button").addEventListener("click", stand);


//lege til Kortene
const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];
let playerHand = [];
let opponentHand = [];
let communityCards = [];
let round = 0;

let playerMoney = 1000;
let opponentMoney = 1000;
let pot = 0;

// Start spill
function startGame() {
    deck = createDeck();
    shuffleDeck(deck);
    playerHand = [deck.pop(), deck.pop()];
    opponentHand = [deck.pop(), deck.pop()];
    communityCards = [];
    round = 0;
    pot = 0;

    updateMoney();
    displayHand(playerHand, "player-cards");
    displayHand([], "opponent-cards");
    document.getElementById("community-cards").innerHTML = '';
    document.getElementById("result").innerText = '';

    
    document.getElementById("bet-button").disabled = false;
}

// Oppdater visning av penger
function updateMoney() {
    document.getElementById("player-money").innerText = playerMoney;
    document.getElementById("opponent-money").innerText = opponentMoney;
    document.getElementById("pot").innerText = pot;
}

// Lag kortstokk
function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ rank, suit });
        }
    }
    return deck;
}

// Bland kortene
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Vis hånd
function displayHand(hand, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    hand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        if (card.suit === '♥' || card.suit === '♦') {
            cardDiv.classList.add('red');
        }
        cardDiv.innerText = `${card.rank} ${card.suit}`;
        container.appendChild(cardDiv);
    });
}

// Bet
function bet() {
    const betAmount = parseInt(document.getElementById("bet-amount").value);
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Vennligst angi et gyldig beløp");
        return;
    }
    if (betAmount > playerMoney) {
        alert("Du er fattig.");
        return;
    }

    // Spilleren og motstanderen satser samme beløp
    playerMoney -= betAmount;
    opponentMoney -= betAmount;
    pot += betAmount * 2;

    updateMoney();

    // Legg et bordkort til
    if (round < 5) {
        communityCards.push(deck.pop());
        displayHand(communityCards, "community-cards");
        round++;

        if (round === 5) {
            showResult();
        }
    }
}

// Stand
function stand() {
    showResult();
}

// Evaluering
function showResult() {
    const finalPlayerHand = [...playerHand, ...communityCards];
    const finalOpponentHand = [...opponentHand, ...communityCards];

    displayHand(opponentHand, "opponent-cards");

    const playerResult = evaluateHand(finalPlayerHand);
    const opponentResult = evaluateHand(finalOpponentHand);

    let resultText = `Din hånd: ${playerResult} | Motstanderens hånd: ${opponentResult}`;
    const winner = determineWinner(playerResult, opponentResult);

    let winnerText = '';
    if (winner === "player") {
        playerMoney += pot;
        resultText += " - Du vinner!";
        winnerText = "Du vinner!";
    } else if (winner === "opponent") {
        opponentMoney += pot;
        resultText += " - Motstanderen vinner!";
        winnerText = "Motstanderen vinner!";
    } else {
        playerMoney += pot / 2;
        opponentMoney += pot / 2;
        resultText += " - Uavgjort!";
        winnerText = "Uavgjort!";
    }

    pot = 0;
    updateMoney();
    document.getElementById("result").innerText = resultText;

    // Vis vinnerbeskjeden midt på skjermen
    const winnerMessage = document.getElementById("winner-message");
    winnerMessage.innerText = winnerText;
    winnerMessage.style.display = "block"; // Vis beskjed

    // Deaktiver satsing etter at runden er over
    document.getElementById("bet-button").disabled = true; // Deaktiver satsingsknappen

    // Skjul vinnerbeskjeden etter noen sekunder
    setTimeout(() => {
        winnerMessage.style.display = "none";
    }, 3000); // Skjul etter 3 sekunder
}

// Enkel håndsammenligning
function evaluateHand(hand) {
    const ranks = hand.map(card => card.rank);
    const suits = hand.map(card => card.suit);

    const isFlush = new Set(suits).size === 1;
    const rankCounts = ranks.reduce((acc, rank) => {
        acc[rank] = (acc[rank] || 0) + 1;
        return acc;
    }, {});

    const counts = Object.values(rankCounts);

    if (isFlush) return "Flush";
    if (counts.includes(4)) return "Fire like";
    if (counts.includes(3) && counts.includes(2)) return "Fullt hus";
    if (counts.includes(3)) return "Tre like";
    if (counts.filter(count => count === 2).length === 2) return "To par";
    if (counts.includes(2)) return "Par";

    return "Høyeste kort";
}

function determineWinner(playerResult, opponentResult) {
    const handRanking = ["Høyeste kort", "Par", "To par", "Tre like", "Fullt hus", "Fire like", "Flush"];
    const playerRank = handRanking.indexOf(playerResult);
    const opponentRank = handRanking.indexOf(opponentResult);

    if (playerRank > opponentRank) return "player";
    if (opponentRank > playerRank) return "opponent";
    return "tie";
}

// Hent alle chips og legg til en klikk-lytter
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', function () {
        const chipValue = parseInt(this.dataset.value);
        const betInput = document.getElementById('bet-amount');
        const currentBet = parseInt(betInput.value) || 0; // Sett til 0 hvis feltet er tomt
        betInput.value = currentBet + chipValue; // Legger til verdien
    });
});
