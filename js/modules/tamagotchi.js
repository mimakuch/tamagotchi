export default class Tamagotchi {
  constructor() {
    this.health = { value: 10, importance: 1 };
    this.hunger = { value: 10, importance: 3 };
    this.energy = { value: 10, importance: 2 };
    this.fun = { value: 10, importance: 4 };
    this.healthDecreaseInterval = setInterval(() => this.decreaseHealth(), 1000);
    this.hungerDecreaseInterval = setInterval(() => this.decreaseHunger(), 1000);
    this.energyDecreaseInterval = setInterval(() => this.decreaseEnergy(), 2000);
    this.funDecreaseInterval = setInterval(() => this.decreaseFun(), 1000);
    console.log("Tamagotchi initialized");
  }

  displayHealth = () => {
    this.healthElement.innerText = this.health.value;
  };

  displayHunger = () => {
    this.hungerElement.innerText = this.hunger.value;
  };

  displayEnergy = () => {
    this.energyElement.innerText = this.energy.value;
  };

  displayFun = () => {
    this.funElement.innerText = this.fun.value;
  };


    decreaseHealth() {
      if (this.hunger.value <= 0 || this.energy.value <= 0) {
        if (this.health.value > 0) {
          this.health.value -= 1
          this.displayHealth()
        } else {
          clearInterval(this.healthDecreaseInterval)
        }
      }
    }

    decreaseEnergy() {
      if (this.energy.value > 0 && this.fun.value === 0) {
        this.energy.value -=2
        this.displayEnergy()
      } else if (this.energy.value > 0) {
        this.energy.value -=1
        this.displayEnergy()
      } else {
        clearInterval(this.energyDecreaseInterval)
      }
    }

    decreaseHunger() {
      if (this.hunger.value > 0) {
        this.hunger.value -= 1
        this.displayHunger()
      } else {
        clearInterval(this.hungerDecreaseInterval)
      }
    }

    decreaseFun() {
      if (this.fun.value > 0) {
        this.fun.value -= 1
        this.displayFun()
      } else {
        clearInterval(this.funDecreaseInterval)
      }
    }

  mount = ({ healthElement, hungerElement, energyElement, funElement }) => {
    this.healthElement = healthElement;
    this.hungerElement = hungerElement;
    this.energyElement = energyElement;
    this.funElement = funElement;

    this.displayHealth();
    this.displayHunger();
    this.displayEnergy();
    this.displayFun();
  };
}
