export const updateObj = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const sumResult = (state, value, btnType) => {
  let sum = 0;
  let wineCategory = null;
  const wineRating = [
    "Vynikajúce",
    "Veľmi dobré",
    "Dobré",
    "Priemerné",
    "Podpriemerné",
  ];
  for (const oldValue in state) {
    // btn was presed, we need remove old value, and add new value
    if (oldValue === btnType && state[oldValue] !== null) {
      sum = sum - state[oldValue];
    }
    sum += state[oldValue];
  }
  sum += value;
  if (sum >= 90) {
    wineCategory = wineRating[0];
  } else if (sum >= 85) {
    wineCategory = wineRating[1];
  } else if (sum >= 80) {
    wineCategory = wineRating[2];
  } else if (sum >= 60) {
    wineCategory = wineRating[3];
  } else if (sum < 60) {
    wineCategory = wineRating[4];
  }
  return [sum, wineCategory];
};