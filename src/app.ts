import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();

  // Start game
  game.start({
    healthElement: document.querySelector('.health'),
    hungerElement: document.querySelector('.hunger'),
    energyElement: document.querySelector('.energy'),
    funElement: document.querySelector('.fun'),
    feedingButton: document.querySelector('.feedingButton'),
    sleepingButton: document.querySelector('.sleepingButton'),
    playingButton: document.querySelector('.playingButton'),
  });
});
