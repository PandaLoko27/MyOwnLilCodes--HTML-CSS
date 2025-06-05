const gameBoard = document.querySelector('.game-board');

const emojis = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍍'];
let cards = [...emojis, ...emojis]; // Duplicar os pares
cards = cards.sort(() => 0.5 - Math.random()); // Embaralhar

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Criar as cartas
cards.forEach(emoji => {
  const card = document.createElement('div');
  card.classList.add('card');
  
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">${emoji}</div>
      <div class="card-back"></div>
    </div>
  `;
  
  card.addEventListener('click', () => flipCard(card));
  
  gameBoard.appendChild(card);
});

function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains('matched')) return;
  
  card.classList.add('flipped');
  
  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    checkForMatch();
  }
}

function checkForMatch() {
  const isMatch = firstCard.querySelector('.card-front').textContent ===
                  secondCard.querySelector('.card-front').textContent;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
    checkGameOver();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function checkGameOver() {
  const matchedCards = document.querySelectorAll('.matched');
  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      alert('Parabéns! Você venceu!');
    }, 500);
  }
}
