let deckId;
let playerScore = 0;
let computerScore = 0;
const remainingCards = document.querySelector(".remaining-cards");

document.querySelector("#new-deck").addEventListener("click", () => {
  fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      remainingCards.textContent = `Cards Remaining: ${data.remaining}`;
      document.querySelector(".draw-btn").disabled = false;
    });
});

document.querySelector(".draw-btn").addEventListener("click", () => {
  drawCards(deckId);
});

function drawCards(deckId) {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cards);
      remainingCards.textContent = `Cards Remaining: ${data.remaining}`;
      renderCards(data.cards[0], data.cards[1]);
      compareCards(data.cards[0].value, data.cards[1].value);
      if (data.remaining === 0) {
        document.querySelector(".draw-btn").disabled = true;
      }
    });
}

function compareCards(compCard, playerCard) {
  const playerScoreText = document.querySelector("#player-score");
  const computerScoreText = document.querySelector("#computer-score");
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
  const playerScoreIndex = cardValues.indexOf(playerCard);
  const compScoreIndex = cardValues.indexOf(compCard);
  const currentResults = document.querySelector(".current-results");
  if (playerScoreIndex > compScoreIndex) {
    playerScore++;
    currentResults.textContent = `Player Scores 1 point`;
  } else if (playerScoreIndex < compScoreIndex) {
    computerScore++;
    currentResults.textContent = `Computer Scores 1 point`;
  } else {
    currentResults.textContent = `Draw`;
  }
  playerScoreText.textContent = `Player score: ${playerScore}`;
  computerScoreText.textContent = `Computer score: ${computerScore}`;
}

function renderCards(compCard, playerCard) {
  document.querySelector("#player-card").innerHTML = `
    <img src="${playerCard.images.png}" alt="${playerCard.value} of ${playerCard.suit}" />
  `;
  document.querySelector("#computer-card").innerHTML = `
    <img src="${compCard.images.png}" alt="${compCard.value} of ${compCard.suit}" />
  `;
}
