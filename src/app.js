import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();

  // Start game
  game.start({
    healthElement: '.health',
    hungerElement: '.hunger',
    energyElement: '.energy',
    funElement: '.fun',
    feedingButton: '.feedingButton',
    sleepingButton: '.sleepingButton',
    playingButton: '.playingButton',
  });
});
