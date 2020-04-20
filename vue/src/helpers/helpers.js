let debounceTimer;

const debounce = (func, delay) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(func, delay);
};

export default {
  debounce,
};
