import Tamagotchi from './tamagotchi';
import { MountPropsWithButtons } from './types';

export default class Abilities {
  tamagotchi: Tamagotchi;
  feedingInterval: null | number;
  sleepingInterval: null | number;
  playingInterval: null | number;
  feedingButton: HTMLElement | null;
  sleepingButton: HTMLElement | null;
  playingButton: HTMLElement | null;
  constructor(tamagotchi: Tamagotchi) {
    this.tamagotchi = tamagotchi;
    this.feedingInterval = null;
    this.sleepingInterval = null;
    this.playingInterval = null;
    this.feedingButton = null;
    this.sleepingButton = null;
    this.playingButton = null;

    console.log('Abilities module initialized');
  }

  startFeeding() {
    console.log('Click');

    this.tamagotchi.currentActivity = 'eating';

    if (this.tamagotchi.currentActivity === 'eating') {
      this.stopSleeping();
      this.stopPlaying();
      clearInterval(this.tamagotchi.hungerDecreaseInterval);

      this.feedingInterval = setInterval(() => {
        this.tamagotchi.hunger.value += 2;
        this.tamagotchi.stateCheck();
        if (this.tamagotchi.hunger.value >= 10) {
          this.stopFeeding();
        }
      }, 1000);
    } else {
      this.stopFeeding();
    }
  }

  stopFeeding() {
    if (!this.feedingInterval) {
      console.warn('Feeding interval is not found!');
      return;
    }
    clearInterval(this.feedingInterval);

    this.tamagotchi.hungerDecreaseInterval = setInterval(
      () => this.tamagotchi.decreaseHunger(),
      1000
    );
    this.tamagotchi.currentActivity = null;
  }

  startSleeping() {
    this.tamagotchi.currentActivity = 'sleeping';

    if (this.tamagotchi.currentActivity === 'sleeping') {
      this.stopFeeding();
      this.stopPlaying();
      clearInterval(this.tamagotchi.energyDecreaseInterval);

      this.sleepingInterval = setInterval(() => {
        this.tamagotchi.energy.value += 2;
        this.tamagotchi.stateCheck();
        if (this.tamagotchi.energy.value >= 10) {
          this.stopSleeping();
        }
      }, 1000);
    } else {
      this.stopSleeping();
    }
  }

  stopSleeping() {
    if (!this.sleepingInterval) {
      console.warn('Sleeping interval is not found!');
      return;
    }
    clearInterval(this.sleepingInterval);
    this.tamagotchi.energyDecreaseInterval = setInterval(
      () => this.tamagotchi.decreaseEnergy(),
      2000
    );
    this.tamagotchi.currentActivity = null;
  }

  startPlaying() {
    this.tamagotchi.currentActivity = 'playing';

    if (this.tamagotchi.currentActivity === 'playing') {
      this.stopFeeding();
      this.stopSleeping();
      clearInterval(this.tamagotchi.funDecreaseInterval);

      this.playingInterval = setInterval(() => {
        this.tamagotchi.fun.value += 2;
        this.tamagotchi.energy.value -= 1;
        this.tamagotchi.stateCheck();
        if (this.tamagotchi.fun.value >= 10) {
          this.stopPlaying();
        }
      }, 1000);
    } else {
      this.stopPlaying();
    }
  }

  stopPlaying() {
    if (!this.playingInterval) {
      console.warn('Playing interval is not found!');
      return;
    }
    clearInterval(this.playingInterval);
    this.tamagotchi.funDecreaseInterval = setInterval(
      () => this.tamagotchi.decreaseFun(),
      1000
    );
    this.tamagotchi.currentActivity = null;
  }

  mount = ({
    feedingButton,
    sleepingButton,
    playingButton,
  }: MountPropsWithButtons) => {
    this.feedingButton = feedingButton;
    this.sleepingButton = sleepingButton;
    this.playingButton = playingButton;

    if (!this.feedingButton) {
      console.warn('Feeding button is not found!');
      return;
    }
    this.feedingButton.addEventListener('click', () =>
      this.startFeeding()
    );

    if (!this.sleepingButton) {
      console.warn('Sleeping button is not found!');
      return;
    }
    this.sleepingButton.addEventListener('click', () =>
      this.startSleeping()
    );

    if (!this.playingButton) {
      console.warn('Playing button is not found!');
      return;
    }
    this.playingButton.addEventListener('click', () =>
      this.startPlaying()
    );
  };
}
