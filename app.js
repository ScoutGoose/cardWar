// GLOBAL VARIABLES
const draw = compareCards();
let deckId;
const remainingCards = document.querySelector(".remaining-cards");

// GET A NEW DECK
document.querySelector("#new-deck").addEventListener("click", () => {
  fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      remainingCards.textContent = `Cards Remaining: ${data.remaining}`;
      document.querySelector(".draw-btn").disabled = false;
    });
});

// ADD EVENT LISTENER TO DRAW CARDS
document.querySelector(".draw-btn").addEventListener("click", () => {
  drawCards(deckId);
});

// DRAW CARDS LOGIC
function drawCards(deckId) {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cards);
      remainingCards.textContent = `Cards Remaining: ${data.remaining}`;
      renderCards(data.cards[0], data.cards[1]);
      draw(data.cards[0].value, data.cards[1].value);
      if (data.remaining === 0) {
        document.querySelector(".draw-btn").disabled = true;
      }
    })
    .catch((err) => console.log(err));
}

// COMPARE TWO CARDS
function compareCards() {
  const scores = [0, 0];
  const cardValues = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  return function (compCard, playerCard) {
    const playerScoreIndex = cardValues.indexOf(playerCard);
    const compScoreIndex = cardValues.indexOf(compCard);
    const currentResults = document.querySelector(".current-results");
    if (playerScoreIndex > compScoreIndex) {
      scores[1]++;
      currentResults.textContent = `You score 1 point`;
    } else if (playerScoreIndex < compScoreIndex) {
      scores[0]++;
      currentResults.textContent = `Computer scores 1 point`;
    } else {
      currentResults.textContent = `Tie`;
    }
    currentResults.textContent += compareTotalScores(scores[0], scores[1]);
    document.querySelector(
      "#player-score"
    ).textContent = `My score: ${scores[1]}`;
    document.querySelector(
      "#computer-score"
    ).textContent = `Computer score: ${scores[0]}`;
  };
}

// CHECK POINT ADVANTAGE
function compareTotalScores(compScore, playerScore) {
  return compScore > playerScore
    ? `\r\nComputer is ${compScore - playerScore} point(s) ahead`
    : compScore < playerScore
    ? `\r\nYau are ${playerScore - compScore} point(s) ahead`
    : `\r\n It is a tie`;
}

// RENDER CARDS
function renderCards(compCard, playerCard) {
  document.querySelector("#player-card").innerHTML = `
    <img src="${playerCard.images.png}" alt="${playerCard.value} of ${playerCard.suit}" />
  `;
  document.querySelector("#computer-card").innerHTML = `
    <img src="${compCard.images.png}" alt="${compCard.value} of ${compCard.suit}" />
  `;
}
