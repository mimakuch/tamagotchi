import Tamagotchi from './modules/tamagotchi.js';
import Abilities from './modules/abilities.js';
import { MountPropsWithButtons } from './modules/types';
import { MountProps } from './modules/types';

export default class Game {
  tamagotchi: Tamagotchi;
  abilities: Abilities;
  constructor() {
    this.tamagotchi = new Tamagotchi();
    this.abilities = new Abilities(this.tamagotchi);
  }

  start = ({
    healthElement,
    hungerElement,
    energyElement,
    funElement,
    feedingButton,
    sleepingButton,
    playingButton,
  }: MountPropsWithButtons) => {
    this.tamagotchi.mount({
      healthElement: document.querySelector(`${healthElement}`),
      hungerElement: document.querySelector(`${hungerElement}`),
      energyElement: document.querySelector(`${energyElement}`),
      funElement: document.querySelector(`${funElement}`),
    });

    this.abilities.mount({
      feedingButton: document.querySelector(`${feedingButton}`),
      sleepingButton: document.querySelector(`${sleepingButton}`),
      playingButton: document.querySelector(`${playingButton}`),
    });

    console.log('Game started');
  };
}
