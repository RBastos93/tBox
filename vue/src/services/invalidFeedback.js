const clear = () => {
  const isInvalidElements = document.getElementsByClassName('is-invalid');

  while (isInvalidElements.length > 0) {
    isInvalidElements[0].classList.remove('is-invalid');
  }
};

const invalid = ({ statusCode, errors}) => {
  clear();

  if (statusCode === 400) {
    for (const error of errors) {
      if (document.getElementById(error.param)) {
        document.getElementById(error.param).classList.add('is-invalid');
        document.getElementById(`${error.param}-feedback`).innerHTML = error.message;
      }
    }
  }
};

export default invalid;
