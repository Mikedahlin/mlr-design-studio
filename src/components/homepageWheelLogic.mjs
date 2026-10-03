const mod = (value, length) => ((value % length) + length) % length;

export function getSnappedIndex(position, cardCount = 6) {
  return mod(Math.round(position), cardCount);
}

export function commitWheelSelection(currentIndex, position, settled, cardCount = 6) {
  return settled ? getSnappedIndex(position, cardCount) : currentIndex;
}

const AUTO_TURN_RATE = 0.000035;

export function getAutoTurnTarget(position) {
  return position - 1;
}

export function getAutoTurnDuration() {
  return 1 / (AUTO_TURN_RATE * 1000);
}

export function getCardTapAction({ cardIndex, selectedIndex, moved }) {
  if (moved > 10) return "momentum";
  return cardIndex === selectedIndex ? "inspect" : "select";
}
