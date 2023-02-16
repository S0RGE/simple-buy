import { createStore } from 'vuex';
import auth from './modules/auth';
import product from './modules/product';
import order from './modules/order';

export default createStore({
  state: {
    status: '',
    error: ''
  },
  getters: {
    getStatus: (state) => state.status,
    getError: (state) => state.error,
  },
  mutations: {},
  actions: {},
  modules: {
    product,
    auth,
    order,
  },
});
