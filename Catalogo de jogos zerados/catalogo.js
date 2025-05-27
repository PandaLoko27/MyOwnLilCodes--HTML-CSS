// Seleção dos elementos do DOM
const gameForm = document.getElementById('gameForm');
const gamesList = document.getElementById('gamesList');

// Recupera os jogos do localStorage ou inicia com um array vazio
let games = JSON.parse(localStorage.getItem('games')) || [];

/**
 * Função para salvar o array de jogos no localStorage
 */
function saveGames() {
  localStorage.setItem('games', JSON.stringify(games));
}

/**
 * Função para renderizar todos os jogos na tela.
 * 
 * Para cada jogo:
 * - Cria um card
 * - Adiciona botões de editar e remover
 * - Insere o card na lista
 */
function renderGames() {
  // Limpa a lista atual
  gamesList.innerHTML = '';

  // Itera sobre cada jogo e cria o card
  games.forEach((game, index) => {
    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card'); // Animação fade-in automática via CSS

    // Estrutura interna do card
    gameCard.innerHTML = `
      <img src="${game.imageUrl}" alt="${game.name}">
      <div class="game-details">
        <h3>${game.name}</h3>
        <p><strong>Tempo:</strong> ${game.time} horas</p>
        <p><strong>Data de conclusão:</strong> ${game.date}</p>
      </div>
      <div class="action-buttons">
        <button class="edit-btn">Editar</button>
        <button class="remove-btn">Remover</button>
      </div>
    `;

    /**
     * Botão de Remover
     * - Mostra uma confirmação
     * - Se confirmado, anima fade-out e remove o jogo após 300ms
     */
    gameCard.querySelector('.remove-btn').addEventListener('click', () => {
      const confirmed = confirm('Tem certeza que deseja excluir este jogo?');
      if (confirmed) {
        gameCard.classList.add('removing');  // Classe CSS que ativa a animação
        setTimeout(() => {
          games.splice(index, 1);  // Remove do array
          saveGames();
          renderGames();  // Atualiza a lista
        }, 300);
      }
    });

    /**
     * Botão de Editar
     * - Solicita novos dados via prompt
     * - Se preenchido, atualiza o jogo e salva
     */
    gameCard.querySelector('.edit-btn').addEventListener('click', () => {
      const newName = prompt('Novo nome do jogo:', game.name);
      const newTime = prompt('Novo tempo de gameplay (horas):', game.time);
      const newDate = prompt('Nova data de conclusão:', game.date);
      const newImageUrl = prompt('Nova URL da imagem:', game.imageUrl);

      // Se o usuário preencheu todos os campos
      if (newName && newTime && newDate && newImageUrl) {
        games[index] = {
          name: newName,
          time: newTime,
          date: newDate,
          imageUrl: newImageUrl
        };
        saveGames();
        renderGames();
      }
    });

    // Adiciona o card na lista
    gamesList.appendChild(gameCard);
  });
}

/**
 * Evento de envio do formulário
 * - Previne o recarregamento padrão
 * - Coleta dados do formulário
 * - Cria um novo objeto de jogo
 * - Adiciona no array e salva
 * - Renderiza novamente a lista
 */
gameForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Coleta dos valores do formulário
  const imageUrl = document.getElementById('gameImage').value;
  const name = document.getElementById('gameName').value;
  const time = document.getElementById('gameTime').value;
  const date = document.getElementById('gameDate').value;

  // Cria objeto com os dados
  const newGame = { imageUrl, name, time, date };

  // Adiciona ao array
  games.push(newGame);
  saveGames();
  renderGames();

  // Limpa o formulário
  gameForm.reset();
});

// Inicializa renderizando os jogos armazenados
renderGames();