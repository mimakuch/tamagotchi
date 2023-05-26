export default class Abilities {
  constructor(tamagotchi) {
    this.tamagotchi = tamagotchi;
    this.feedingInterval = null;
    this.sleepingInterval = null;
    this.playingInterval = null;
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
    clearInterval(this.playingInterval);
    this.tamagotchi.funDecreaseInterval = setInterval(
      () => this.tamagotchi.decreaseFun(),
      1000
    );
    this.tamagotchi.currentActivity = null;
  }

  mount = ({ feedingButton, sleepingButton, playingButton }) => {
    this.feedingButton = feedingButton;
    this.sleepingButton = sleepingButton;
    this.playingButton = playingButton;

    this.feedingButton.addEventListener('click', () =>
      this.startFeeding()
    );
    this.sleepingButton.addEventListener('click', () =>
      this.startSleeping()
    );
    this.playingButton.addEventListener('click', () =>
      this.startPlaying()
    );
  };
}
