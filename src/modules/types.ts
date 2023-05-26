export interface MountProps {
  healthElement: Element | string | null;
  hungerElement: Element | string | null;
  energyElement: Element | string | null;
  funElement: Element | string | null;
}

export interface MountPropsWithButtons extends MountProps {
  feedingButton: Element | string | null;
  sleepingButton: Element | string | null;
  playingButton: Element | string | null;
}
