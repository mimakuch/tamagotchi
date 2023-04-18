import Tamagotchi from "./modules/tamagotchi.js";
import Abilities from "./modules/abilities.js";

export default class Game {
    constructor() {
        this.tamagotchi = new Tamagotchi(this.abilities);
        this.abilities = new Abilities(this.tamagotchi);
    }

    start = (
        {
            healthElement,
            hungerElement,
            energyElement,
            funElement,
            feedingButton,
            sleepingButton,
            playingButton,
            restartButton,
        }) => {

        this.tamagotchi.mount({
            healthElement: document.querySelector(`${healthElement}`),
            hungerElement: document.querySelector(`${hungerElement}`),
            energyElement: document.querySelector(`${energyElement}`),
            funElement: document.querySelector(`${funElement}`),
        });

        this.abilities.mount({
            feedingButton: document.querySelector(`${feedingButton}`),
            sleepingButton: document.querySelector(`${sleepingButton}`),
            playingButton: document.querySelector(`${playingButton}`),
        });

        document.querySelector(`${restartButton}`).addEventListener(
            'click',
            () => this.restart()
        )

        console.log("Game started");
    };

    restart = () => {
        this.tamagotchi.health = { value: 10, importance: 1 };
        this.tamagotchi.hunger = { value: 10, importance: 3 };
        this.tamagotchi.energy = { value: 10, importance: 2 };
        this.tamagotchi.fun = { value: 10, importance: 4 };

        clearInterval(this.tamagotchi.healthDecreaseInterval);
        clearInterval(this.tamagotchi.hungerDecreaseInterval);
        clearInterval(this.tamagotchi.energyDecreaseInterval);
        clearInterval(this.tamagotchi.funDecreaseInterval);

        this.tamagotchi.healthDecreaseInterval = setInterval(() => this.tamagotchi.decreaseHealth(), 1000);
        this.tamagotchi.hungerDecreaseInterval = setInterval(() => this.tamagotchi.decreaseHunger(), 1000);
        this.tamagotchi.energyDecreaseInterval = setInterval(() => this.tamagotchi.decreaseEnergy(), 2000);
        this.tamagotchi.funDecreaseInterval = setInterval(() => this.tamagotchi.decreaseFun(), 1000);

        this.tamagotchi.displayHealth();
        this.tamagotchi.displayHunger();
        this.tamagotchi.displayEnergy();
        this.tamagotchi.displayFun();
        this.tamagotchi.displayHappy();
    }

}
