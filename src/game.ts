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
      healthElement: healthElement,
      hungerElement: hungerElement,
      energyElement: energyElement,
      funElement: funElement,
    });

    this.abilities.mount({
      energyElement: energyElement,
      funElement: funElement,
      healthElement: healthElement,
      hungerElement: hungerElement,
      feedingButton: feedingButton,
      sleepingButton: sleepingButton,
      playingButton: playingButton,
    });

    console.log('Game started');
  };
}
