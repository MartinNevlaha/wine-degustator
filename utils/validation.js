import validate from 'validate.js';

export const isIdValid = (id) => {
  return validate.isNumber(+id) && id.length > 0 && id > 0;
}

export const isRatingValid = (results, eliminateStatus) => {
  if (eliminateStatus) {
      return true;
  } else {
      const transformResuls = Object.values(results);
      return !transformResuls.includes(null);
  }
}