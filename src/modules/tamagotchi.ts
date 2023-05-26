import { MountProps } from './types';

interface Parameters {
  value: number;
  importance: number;
}

export default class Tamagotchi {
  health: Parameters;
  hunger: Parameters;
  energy: Parameters;
  fun: Parameters;
  currentActivity: string | null;
  healthDecreaseInterval: number;
  hungerDecreaseInterval: number;
  energyDecreaseInterval: number;
  funDecreaseInterval: number;
  constructor() {
    this.health = { value: 10, importance: 1 };
    this.hunger = { value: 10, importance: 3 };
    this.energy = { value: 10, importance: 2 };
    this.fun = { value: 10, importance: 4 };

    this.currentActivity = null; // Can be set to eating, sleeping, playing or null

    this.healthDecreaseInterval = setInterval(
      () => this.decreaseHealth(),
      1000
    );
    this.hungerDecreaseInterval = setInterval(
      () => this.decreaseHunger(),
      1000
    );
    this.energyDecreaseInterval = setInterval(
      () => this.decreaseEnergy(),
      2000
    );
    this.funDecreaseInterval = setInterval(
      () => this.decreaseFun(),
      1000
    );

    console.log('Tamagotchi initialized');
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
        this.health.value -= 1;
        this.displayHealth();
        this.stateCheck();
      } else {
        clearInterval(this.healthDecreaseInterval);
      }
    }
  }

  decreaseEnergy() {
    if (this.energy.value > 1 && this.fun.value === 0) {
      this.energy.value -= 2;
      this.displayEnergy();
    } else if (this.energy.value > 0) {
      this.energy.value -= 1;
      this.displayEnergy();
      this.stateCheck();
    } else {
      clearInterval(this.energyDecreaseInterval);
    }
  }

  decreaseHunger() {
    if (this.hunger.value > 0) {
      this.hunger.value -= 1;
      this.displayHunger();
      this.stateCheck();
    } else {
      clearInterval(this.hungerDecreaseInterval);
    }
  }

  decreaseFun() {
    if (this.fun.value > 0) {
      this.fun.value -= 1;
      this.displayFun();
      this.stateCheck();
    } else {
      clearInterval(this.funDecreaseInterval);
    }
  }

  // Methods for handling state

  displayState(background, text) {
    const currentState = document.querySelector('.dogIcon');
    currentState.style.background = background;

    const statusValue = document.querySelector('.statusValue');
    statusValue.innerText = text;
  }

  displayDead() {
    this.displayState('url("./assets/img/state-dead.png")', 'dead');
    const currentState = document.querySelector('.dogIcon');
    currentState.style.height = '72px';
    currentState.style.width = 'calc(364px / 2)';
    currentState.style.animation = 'none';
  }

  stateCheck() {
    switch (this.currentActivity) {
      case 'eating':
        this.displayState(
          'url("./assets/img/state-eating.png")',
          'eating'
        );
        break;
      case 'sleeping':
        this.displayState(
          'url("./assets/img/state-sleeping.png")',
          'sleeping'
        );
        break;
      case 'playing':
        this.displayState(
          'url("./assets/img/state-playing.png")',
          'playing'
        );
        break;
      default:
        const totalImportance =
          this.health.importance +
          this.hunger.importance +
          this.energy.importance +
          this.fun.importance;
        const weightedSum =
          this.health.value *
            (this.health.importance / totalImportance) +
          this.hunger.value *
            (this.hunger.importance / totalImportance) +
          this.energy.value *
            (this.energy.importance / totalImportance) +
          this.fun.value * (this.fun.importance / totalImportance);

        if (this.health.value <= 0) {
          this.displayDead();
          this.disableAbilitiesButtons();
          this.createRestartButton();
        } else if (weightedSum < 3) {
          this.displayState(
            'url("./assets/img/state-bored.png")',
            'bored'
          );
        } else if (weightedSum < 6) {
          this.displayState(
            'url("./assets/img/state-sleepy.png")',
            'sleepy'
          );
        } else if (weightedSum < 9) {
          this.displayState(
            'url("./assets/img/state-hungry.png")',
            'hungry'
          );
        } else {
          this.displayState(
            'url("./assets/img/state-happy.png")',
            'happy'
          );
        }
    }
  }

  // Methods for handling death

  disableAbilitiesButtons() {
    const abilitiesButtons =
      document.querySelectorAll('.gameBoyButton');
    abilitiesButtons.forEach((button) => {
      button.style.display = 'none';
    });
  }

  createRestartButton() {
    const restartButton = document.createElement('button');
    const nav = document.querySelector('.gameBoyNav');

    restartButton.classList.add('restartButton');
    restartButton.innerText = 'restart';
    nav.appendChild(restartButton);

    restartButton.addEventListener('click', () => {
      location.reload();
    });
  }

  mount = ({
    healthElement,
    hungerElement,
    energyElement,
    funElement,
  }: MountProps) => {
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
