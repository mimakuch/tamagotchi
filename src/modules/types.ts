export interface MountProps {
  healthElement: HTMLElement | null;
  hungerElement: HTMLElement | null;
  energyElement: HTMLElement | null;
  funElement: HTMLElement | null;
}

export interface MountPropsWithButtons extends MountProps {
  feedingButton: HTMLElement | null;
  sleepingButton: HTMLElement | null;
  playingButton: HTMLElement | null;
}
