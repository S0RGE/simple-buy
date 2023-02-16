import { fetchMakeOrderRequest, fetchGetOrderRequest } from './service';
import { setError } from '@/utils/error';

export default {
  state: () => ({
    orders: [],
  }),
  actions: {
    MAKE_AN_ORDER: ({ commit, rootState }) => {
      rootState.status = 'loading';
      return new Promise((resolve, reject) => {
        fetchMakeOrderRequest(rootState.auth.token, [...rootState.product.cart])
          .then((newOrder) => {
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
        fetchGetOrderRequest(rootState.auth.token)
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
