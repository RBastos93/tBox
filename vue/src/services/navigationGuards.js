const guard = (to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.name !== 'login' && token) {
    next();
  } else {
    next({ path: 'login' });
  }
};

export default guard;
