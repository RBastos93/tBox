let debounceTimer;

const debounce = (func, delay) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(func, delay);
};

const maskMoney = {
  decimal: ',',
  thousands: '.',
  precision: 2,
  masked: false,
};

const removeChars = (value, replaceChars, regex) => {
  const v = value.replace(regex, (val) => replaceChars[val]);

  return v;
};

export {
  debounce,
  maskMoney,
  removeChars,
};
