import { makeAnOrderRequest, getOrderRequest } from '@/utils/ordersApi.js';

export default {
  state: () => ({
    orders: [],
  }),
  actions: {
    MAKE_AN_ORDER: ({ commit, rootState }) => {
      makeAnOrderRequest(rootState.auth.token).then((response) => {
        commit('MAKE_AN_ORDER', response);
        rootState.product.cart = [];
      });
    },
    ORDER_REQ: ({ commit, rootState }) => {
      return new Promise((resolve, reject) => {
        getOrderRequest(rootState.auth.token)
          .then((response) => {
            commit('ORDER_REQ', response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getAllOrders: (state) => state.orders,
  },
  mutations: {
    MAKE_AN_ORDER: (state, order) => {
      state.orders.push(order);
    },
    ORDER_REQ: (state, orders) => {
      state.orders = orders;
    },
  },
};
