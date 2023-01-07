import { createStore } from 'vuex';
import { loginRequest, registrationRequest } from '@/utils/api.js';

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  mutations: {
    auth_success: (state, token) => {
      state.token = token;
    },
    auth_error: (state) => {
      state.token = '';
    },
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      loginRequest(user)
        .then((token) => {
          commit('auth_success', token);
          localStorage.setItem('myAppToken', token);
        })
        .catch(() => {
          commit('auth_error');
          localStorage.removeItem('myAppToken');
        });
    },
    REG_REQUEST: ({ commit }, user) => {
      registrationRequest(user)
        .then((token) => {
          commit('auth_success', token);
          localStorage.setItem('myAppToken', token);
        })
        .catch(() => {
          commit('auth_error');
          localStorage.removeItem('myAppToken');
        });
    },
  },
  modules: {},
});
