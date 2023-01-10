import { createStore } from 'vuex';
import auth from './modules/auth.js';
import product from './modules/product.js';
import order from './modules/order.js';

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
