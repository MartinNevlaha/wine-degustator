import validate from 'validate.js';

export const isIdValid = (id) => {
  return validate.isNumber(+id) && id > 0;
}

export const isRatingValid = (results, eliminateStatus) => {
  if (eliminateStatus) {
      return true;
  } else {
      const transformResuls = Object.values(results);
      return !transformResuls.includes(null);
  }
}

export const isInputNameValid = (string) => {
  return validate.isString(string) && string.length > 3;
}

export const isInputPassValid = (string) => {
  return validate.isString(string) && string.length > 5
}