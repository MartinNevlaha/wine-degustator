import validate from "validate.js";

export const isIdValid = (id) => {
  return validate.isNumber(+id) && id > 0;
};

export const isRatingValid = (results, eliminateStatus) => {
  if (eliminateStatus) {
    return true;
  } else {
    const transformResuls = Object.values(results);
    return !transformResuls.includes(null);
  }
};

export const isInputNameValid = (string) => {
  return validate.isString(string) && string.length > 3;
};

export const isInputPassValid = (string) => {
  return validate.isString(string) && string.length > 5;
};

export const isUrlValid = (url) => {
  const regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  if (regexp.test(url)) {
    return true;
  } else {
    return false;
  }
};
