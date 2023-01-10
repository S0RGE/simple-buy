import { makeAnOrderRequest, getOrderRequest } from '@/utils/ordersApi.js';
import { setError } from '@/utils/error';

export default {
  state: () => ({
    orders: [],
  }),
  actions: {
    MAKE_AN_ORDER: ({ commit, rootState }) => {
      rootState.status = 'loading';
      return new Promise((resolve, reject) => {
        makeAnOrderRequest(rootState.auth.token)
          .then((response) => {
            const order_price = rootState.product.cart.reduce(
              (acc, value) => acc + +value.price,
              0
            );
            const products = rootState.product.cart.reduce(
              (acc, value) => acc.concat(value.product_id),
              []
            );
            const newOrder = {
              id: response.data.order_id,
              order_price,
              products,
            };

            commit('MAKE_AN_ORDER', newOrder);
            rootState.product.cart = [];
            resolve();
          })
          .catch((error) => {
            setError(error.error?.message, rootState);
            reject(error);
          });
        rootState.status = '';
      });
    },
    ORDER_REQ: ({ commit, rootState }) => {
      rootState.status = 'loading';
      return new Promise((resolve, reject) => {
        getOrderRequest(rootState.auth.token)
          .then((response) => {
            commit('ORDER_REQ', response.data);
            resolve(response);
          })
          .catch((error) => {
            setError(error.error?.message, rootState);
            reject(error);
          });
        rootState.status = '';
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
