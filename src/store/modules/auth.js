import {
  loginRequest,
  registrationRequest,
  logoutRequest,
} from '@/utils/apiAuth.js';

export default {
  state: () => ({
    token: localStorage.getItem('user-token') || '',
  }),
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
    },
    AUTH_LOGOUT: (state) => {
      state.token = '';
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
  },
  actions: {
    AUTH_REQUEST: ({ commit, rootState }, user) => {
      rootState.status = 'loading';
      return new Promise((resolve, reject) => {
        loginRequest(user)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('user-token', token);
            resolve();
          })
          .catch(() => {
            commit('AUTH_ERROR');
            localStorage.removeItem('user-token');
            reject();
          });
        rootState.status = '';
      });
    },
    REG_REQUEST: ({ commit, rootState }, user) => {
      rootState.status = 'loading';
      return new Promise((resolve, reject) => {
        registrationRequest(user)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('user-token', token);
            resolve();
          })
          .catch(() => {
            commit('AUTH_ERROR');
            localStorage.removeItem('user-token');
            reject();
          });
        rootState.status = '';
      });
    },
    AUTH_LOGOUT: ({ commit, state, rootState }) => {
      rootState.status = 'loading';
      return new Promise((resolve) => {
        logoutRequest(state.token).then(() => {
          commit('AUTH_LOGOUT');
          localStorage.removeItem('user-token');
          rootState.product.cart = [];
          resolve();
          rootState.status = '';
        });
      });
    },
  },
};
