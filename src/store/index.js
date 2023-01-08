import { createStore } from 'vuex';
import auth from './modules/auth.js';
import product from './modules/product.js';
import order from './modules/order.js';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    product,
    auth,
    order,
  },
});
