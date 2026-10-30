// Elementos del DOM
const redBtn = document.getElementById('redBtn');
const blueBtn = document.getElementById('blueBtn');
const resultSection = document.getElementById('resultSection');
const resultMessage = document.getElementById('resultMessage');
const resultDetail = document.getElementById('resultDetail');
const resetBtn = document.getElementById('resetBtn');

// Estado de la partida
let winningButton = null;
let lastWinningButton = null;
let consecutiveWinsForSame = 0;

/**
 * Prepara una nueva partida seleccionando aleatoriamente qué botón será el ganador.
 * Incluye protección contra rachas para asegurar variedad y que no gane siempre el mismo.
 */
function setupNewGame() {
  // Selección aleatoria base (50% rojo, 50% azul)
  let newWinner = Math.random() < 0.5 ? 'red' : 'blue';

  // Si coincide con la partida anterior, contamos la racha
  if (newWinner === lastWinningButton) {
    consecutiveWinsForSame++;
    // Si ha salido el mismo 2 veces seguidas, forzamos que cambie para evitar repeticiones excesivas
    if (consecutiveWinsForSame >= 2) {
      newWinner = (newWinner === 'red') ? 'blue' : 'red';
      consecutiveWinsForSame = 1;
    }
  } else {
    consecutiveWinsForSame = 1;
  }

  winningButton = newWinner;
  lastWinningButton = newWinner;
}

/**
 * Procesa la elección del usuario ('red' o 'blue')
 * @param {'red' | 'blue'} chosenButton 
 */
function handleChoice(chosenButton) {
  // Deshabilitar botones para evitar más clics en esta partida
  redBtn.disabled = true;
  blueBtn.disabled = true;

  const didWin = chosenButton === winningButton;
  const winnerName = winningButton === 'red' ? 'Pastilla Roja 🔴' : 'Pastilla Azul 🔵';

  // Resaltar visualmente qué pastilla era la ganadora y cuál la perdedora
  if (winningButton === 'red') {
    redBtn.classList.add('is-winner');
    blueBtn.classList.add('is-loser');
  } else {
    blueBtn.classList.add('is-winner');
    redBtn.classList.add('is-loser');
  }

  // Mostrar mensaje de victoria o derrota
  if (didWin) {
    resultMessage.textContent = '¡Has ganado!';
    resultMessage.className = 'result-message win';
    resultDetail.textContent = `¡Elegiste la verdad! La pastilla ganadora era la ${winnerName}.`;
  } else {
    resultMessage.textContent = 'Has perdido';
    resultMessage.className = 'result-message lose';
    resultDetail.textContent = `Caíste en la ilusión. El destino ganador estaba en la ${winnerName}.`;
  }

  // Mostrar la sección de resultados
  resultSection.classList.remove('hidden');
}

/**
 * Reinicia el estado del juego para una nueva partida
 */
function resetGame() {
  // Ocultar sección de resultados
  resultSection.classList.add('hidden');
  resultMessage.textContent = '';
  resultMessage.className = 'result-message';
  resultDetail.textContent = '';

  // Quitar clases de ganador/perdedor
  redBtn.classList.remove('is-winner', 'is-loser');
  blueBtn.classList.remove('is-winner', 'is-loser');

  // Reactivar botones
  redBtn.disabled = false;
  blueBtn.disabled = false;

  // Generar un nuevo botón ganador para la siguiente partida
  setupNewGame();
}

// Event Listeners
redBtn.addEventListener('click', () => handleChoice('red'));
blueBtn.addEventListener('click', () => handleChoice('blue'));
resetBtn.addEventListener('click', resetGame);

// Inicializar el ganador de la primera partida al cargar
setupNewGame();
