export const setError = (message, state) => {
  // TODO: make callback instead state
  state.error = message;
  setTimeout(() => {
    state.error = '';
  }, 3000);
};
