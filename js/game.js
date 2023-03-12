import Tamagotchi from "./modules/tamagotchi.js";

export default class Game {
  constructor() {
    this.tamagotchi = new Tamagotchi();
  }

  start = ({ healthElement, hungerElement, energyElement, funElement }) => {
    this.tamagotchi.mount({
      healthElement: document.querySelector(`${healthElement}`),
      hungerElement: document.querySelector(`${hungerElement}`),
      energyElement: document.querySelector(`${energyElement}`),
      funElement: document.querySelector(`${funElement}`),
    });
    console.log("Game started");
  };

}
