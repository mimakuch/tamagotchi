export default class Abilities {
  constructor(tamagotchi) {
    this.tamagotchi = tamagotchi;
    this.isEating = false;
    this.isSleeping = false;
    this.feedingInterval = null;
    this.sleepingInterval = null;
    console.log("Abilities module initialized");
  }

  startFeeding() {
    if (this.isSleeping) {
      this.stopSleeping();
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
    if (this.isEating) {
      this.stopFeeding();
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

  mount = ({feedingButton, sleepingButton}) => {
    this.feedingButton = feedingButton;
    this.sleepingButton = sleepingButton;

    this.feedingButton.addEventListener('click', () =>
      this.startFeeding()
    );
    this.sleepingButton.addEventListener('click', () =>
      this.startSleeping()
    );

  }
}


