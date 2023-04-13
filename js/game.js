import Tamagotchi from "./modules/tamagotchi.js";
import Abilities from "./modules/abilities.js";

export default class Game {
  constructor() {
    this.tamagotchi = new Tamagotchi(this.abilities);
    this.abilities = new Abilities(this.tamagotchi);
  }

  start = (
      { healthElement,
        hungerElement,
        energyElement,
        funElement,
        feedingButton,
        sleepingButton }) => {

    this.tamagotchi.mount({
      healthElement: document.querySelector(`${healthElement}`),
      hungerElement: document.querySelector(`${hungerElement}`),
      energyElement: document.querySelector(`${energyElement}`),
      funElement: document.querySelector(`${funElement}`),
    });

    this.abilities.mount({
      feedingButton: document.querySelector(`${feedingButton}`),
      sleepingButton: document.querySelector(`${sleepingButton}`),
    });
    console.log("Game started");
  };

}
