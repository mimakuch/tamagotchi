export default class Abilities {
  constructor(tamagotchi) {
    this.tamagotchi = tamagotchi;
    this.isEating = false;
    this.feedingInterval = null;
    console.log("Abilities module initialized");
  }

  startFeeding() {
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

  mount = ({feedingButton}) => {
    this.feedingButton = feedingButton;
    this.feedingButton.addEventListener('click', () =>
      this.startFeeding()
    )
  }
}


