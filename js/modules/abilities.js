export default class Abilities {
  constructor(tamagotchi) {
    this.tamagotchi = tamagotchi;
    this.isEating = false;
    this.isSleeping = false;
    this.isPlaying = false;
    this.feedingInterval = null;
    this.sleepingInterval = null;
    this.playingInterval = null;
    console.log("Abilities module initialized");
  }

  startFeeding() {
    if (this.isSleeping || this.isPlaying) {
      this.stopSleeping();
      this.stopPlaying();
    }

    this.isEating = !this.isEating;

    if(this.isEating) {

        this.feedingInterval = setInterval(() => {
          this.tamagotchi.hunger.value += 2;
          this.tamagotchi.displayEating();
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
    this.isEating = false;
  }

  startSleeping() {
    if (this.isEating || this.isPlaying) {
      this.stopFeeding();
      this.stopPlaying();
    }

    this.isSleeping = !this.isSleeping;

    if(this.isSleeping) {

      this.sleepingInterval = setInterval(() => {
        this.tamagotchi.energy.value += 2;
        this.tamagotchi.displaySleeping();
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
    this.isSleeping = false;
  }

  startPlaying() {
    if (this.isEating || this.isSleeping) {
      this.stopFeeding();
      this.stopSleeping();
    }

    this.isPlaying = !this.isPlaying;

    if(this.isPlaying) {

      this.playingInterval = setInterval(() => {
        this.tamagotchi.fun.value += 2;
        this.tamagotchi.energy.value -= 1;
        this.tamagotchi.displayPlaying();
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
    this.isPlaying = false;
  }

  mount = ({feedingButton, sleepingButton, playingButton}) => {
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

  }
}


