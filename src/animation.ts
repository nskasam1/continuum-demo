export const CARD_COUNT = 5;
export const CARD_EXIT_STAGGER_S = 0.09;
export const CARD_EXIT_DURATION_S = 0.3;
export const CARD_ENTER_STAGGER_S = 0.06;
export const CARD_ENTER_DURATION_S = 0.35;

export const cardExitFinishMs = (index: number) =>
  (index * CARD_EXIT_STAGGER_S + CARD_EXIT_DURATION_S) * 1000;

export const SYNTHESIS_DURATION_MS = 950;
