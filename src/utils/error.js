export const setError = (message, state) => {
  state.error = message;
  setTimeout(() => {
    state.error = '';
  }, 3000);
};
