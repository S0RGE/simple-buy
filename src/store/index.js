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
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myAppToken', token);
            resolve();
          })
          .catch(() => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            reject();
          });
      });
    },
    REG_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        registrationRequest(user)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myAppToken', token);
            resolve();
          })
          .catch(() => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            reject();
          });
      });
    },
    AUTH_LOGOUT: ({ commit, state }) => {
      return new Promise((resolve) => {
        logoutRequest(state.token).then(() => {
          commit('AUTH_LOGOUT');
          localStorage.removeItem('myAppToken');
          resolve();
        });
      });
    },
  },
  modules: {},
});
