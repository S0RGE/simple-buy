import {
  loginRequest,
  registrationRequest,
  logoutRequest,
} from '@/utils/apiAuth.js';

export default {
  state: () => ({
    token: localStorage.getItem('user-token') || '',
    status: '',
  }),
  mutations: {
    auth_success: (state, token) => {
      state.token = token;
    },
    auth_error: (state) => {
      state.token = '';
    },
    auth_logout: (state) => {
      state.token = '';
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
    getToken: (state) => state.token,
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
          .then((token) => {
            commit('auth_success', token);
            localStorage.setItem('user-token', token);
            resolve();
          })
          .catch(() => {
            commit('auth_error');
            localStorage.removeItem('user-token');
            reject();
          });
      });
    },
    REG_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        registrationRequest(user)
          .then((token) => {
            commit('auth_success', token);
            localStorage.setItem('user-token', token);
            resolve();
          })
          .catch(() => {
            commit('auth_error');
            localStorage.removeItem('user-token');
            reject();
          });
      });
    },
    AUTH_LOGOUT: ({ commit, state }) => {
      return new Promise((resolve) => {
        console.log('logout', state.token);
        logoutRequest(state.token).then(() => {
          commit('auth_logout');
          localStorage.removeItem('user-token');
          resolve();
        });
      });
    },
  },
};
