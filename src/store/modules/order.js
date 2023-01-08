import { makeAnOrderRequest } from '@/utils/ordersApi.js';

export default {
  state: () => ({
    orders: [],
  }),
  actions: {
    MAKE_AN_ORDER: ({ commit, rootState }) => {
      makeAnOrderRequest(rootState.auth.token).then((response) => {
        commit('make_an_order', response);
        rootState.product.cart = [];
      });
    },
  },
  getters: {},
  mutations: {
    make_an_order: (state, order) => {
      state.orders.push(order);
    },
  },
};
