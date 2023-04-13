export default class Tamagotchi {
  constructor(abilities) {
    this.health = { value: 10, importance: 1 };
    this.hunger = { value: 10, importance: 3 };
    this.energy = { value: 10, importance: 2 };
    this.fun = { value: 10, importance: 4 };

    this.healthDecreaseInterval = setInterval(() => this.decreaseHealth(), 1000);
    this.hungerDecreaseInterval = setInterval(() => this.decreaseHunger(), 1000);
    this.energyDecreaseInterval = setInterval(() => this.decreaseEnergy(), 2000);
    this.funDecreaseInterval = setInterval(() => this.decreaseFun(), 1000);

    this.abilities = abilities;
    console.log("Tamagotchi initialized");
  }

  // Methods for handling parameters

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
          this.stateCheck()
        } else {
          clearInterval(this.healthDecreaseInterval)
        }
      }
    }

    decreaseEnergy() {
      if (this.energy.value > 1 && this.fun.value === 0) {
        this.energy.value -=2
        this.displayEnergy()
      } else if (this.energy.value > 0) {
        this.energy.value -=1
        this.displayEnergy()
        this.stateCheck()
      } else {
        clearInterval(this.energyDecreaseInterval)
      }
    }

    decreaseHunger() {
      if (this.hunger.value > 0) {
        this.hunger.value -= 1
        this.displayHunger()
        this.stateCheck()
      } else {
        clearInterval(this.hungerDecreaseInterval)
      }
    }

    decreaseFun() {
      if (this.fun.value > 0) {
        this.fun.value -= 1
        this.displayFun()
        this.stateCheck()
      } else {
        clearInterval(this.funDecreaseInterval)
      }
    }

    // Methods for handling state

    displayHappy() {
      const currentState = document.querySelector('.dogIcon')
      currentState.style.background = 'url("./assets/img/state-happy.png")'

      const statusValue = document.querySelector('.statusValue')
      statusValue.innerText = 'happy'
    }

    displaySad() {
      const currentState = document.querySelector('.dogIcon')
      currentState.style.background = 'url("./assets/img/state-bored.png")'

      const statusValue = document.querySelector('.statusValue')
      statusValue.innerText = 'bored'
    }

    displayHungry() {
      const currentState = document.querySelector('.dogIcon')
      currentState.style.background = 'url("./assets/img/state-hungry.png")'

      const statusValue = document.querySelector('.statusValue')
      statusValue.innerText = 'hungry'
    }

    displaySleepy() {
      const currentState = document.querySelector('.dogIcon')
      currentState.style.background = 'url("./assets/img/state-sleepy.png")'

      const statusValue = document.querySelector('.statusValue')
      statusValue.innerText = 'sleepy'
    }

    displayDead() {
      const currentState = document.querySelector('.dogIcon')
      currentState.style.background = 'url("./assets/img/state-dead.png")'
      currentState.style.height = '72px'
      currentState.style.width = 'calc(364px / 2)'
      currentState.style.animation = 'none'

      const statusValue = document.querySelector('.statusValue')
      statusValue.innerText = 'dead'
    }

    displayEating() {
      const currentState = document.querySelector('.dogIcon')
      currentState.style.background = 'url("./assets/img/state-eating.png")'

      const statusValue = document.querySelector('.statusValue')
      statusValue.innerText = 'eating'
    }

    displayPlaying() {

    }

    displaySleeping() {
      const currentState = document.querySelector('.dogIcon')
      currentState.style.background = 'url("./assets/img/state-sleeping.png")'

      const statusValue = document.querySelector('.statusValue')
      statusValue.innerText = 'sleeping'
    }

  stateCheck() {
    const totalImportance = this.health.importance
        + this.hunger.importance
        + this.energy.importance
        + this.fun.importance;
    const weightedSum = (this.health.value * (this.health.importance / totalImportance))
        + (this.hunger.value * (this.hunger.importance / totalImportance))
        + (this.energy.value * (this.energy.importance / totalImportance))
        + (this.fun.value * (this.fun.importance / totalImportance));


      if (this.health.value <= 0) {
        this.displayDead();
      } else if (weightedSum < 3) {
        this.displaySad();
      } else if (weightedSum < 6) {
        this.displaySleepy();
      } else if (weightedSum < 9) {
        this.displayHungry();
      } else {
        this.displayHappy();
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
  }
}
