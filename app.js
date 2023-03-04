import Game from "./js/game.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();

  // Start game
  game.start({
    healthElement: document.querySelector(".health"),
    hungerElement: document.querySelector(".hunger"),
    energyElement: document.querySelector(".energy"),
    funElement: document.querySelector(".fun"),
  });
});
