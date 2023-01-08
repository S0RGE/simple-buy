import { createStore } from 'vuex';
import {
  loginRequest,
  registrationRequest,
  logoutRequest,
} from '@/utils/api.js';

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
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
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
          .then((token) => {
            commit('auth_success', token);
            localStorage.setItem('myAppToken', token);
            resolve();
          })
          .catch(() => {
            commit('auth_error');
            localStorage.removeItem('myAppToken');
            reject();
          });
      });
    },
    REG_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        registrationRequest(user)
          .then((token) => {
            commit('auth_success', token);
            localStorage.setItem('myAppToken', token);
            resolve();
          })
          .catch(() => {
            commit('auth_error');
            localStorage.removeItem('myAppToken');
            reject();
          });
      });
    },
    AUTH_LOGOUT: ({ commit, state }) => {
      return new Promise((resolve) => {
        logoutRequest(state.token).then(() => {
          commit('auth_logout');
          localStorage.removeItem('myAppToken');
          resolve();
        });
      });
    },
  },
  modules: {},
});
