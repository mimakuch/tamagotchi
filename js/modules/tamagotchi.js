export default class Tamagotchi {
  constructor() {
    this.health = { value: 10, importance: 1 };
    this.hunger = { value: 10, importance: 3 };
    this.energy = { value: 10, importance: 2 };
    this.fun = { value: 10, importance: 4 };
    console.log("Tamagotchi initialized");
  }

  displayHealth = (elementSelector) => {
    const displayElement = document.querySelector(elementSelector);
    displayElement.innerText = this.health.value;
  };

  decreaseParameters = () => {

    const healthInterval = setInterval(() => {
      if (this.hunger.value <= 0 || this.energy.value <= 0) {
        if (this.health.value > 0) {
          this.health.value -= 1
        } else {
          clearInterval(healthInterval)
        }
      }
    }, 1000)

    const energyInterval = setInterval( () => {
      if (this.energy.value > 0 && this.fun.value === 0) {
        this.energy.value -=2
      } else if (this.energy.value > 0) {
        this.energy.value -=1
      } else {
        clearInterval(energyInterval)
      }
    }, 2000)

    const hungerInterval = setInterval( () => {
      if (this.hunger.value > 0) {
        this.hunger.value -= 1
      } else {
        clearInterval(hungerInterval)
      }
    }, 1000)

    const funInterval = setInterval( () => {
      if (this.fun.value > 0) {
        this.fun.value -= 1
      } else {
        clearInterval(funInterval)
      }
    }, 1000)

  }

  mount = ({ healthElement, hungerElement, energyElement, funElement }) => {
    this.displayHealth(healthElement);
    this.decreaseParameters();
  };
}
