import { createStore } from 'vuex';
import { loginRequest, registrationRequest } from '@/utils/api.js';

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
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      loginRequest(user)
        .then((token) => {
          commit('AUTH_SUCCESS', token);
          localStorage.setItem('myAppToken', token);
        })
        .catch(() => {
          commit('AUTH_ERROR');
          localStorage.removeItem('myAppToken');
        });
    },
    REG_REQUEST: ({ commit }, user) => {
      registrationRequest(user)
        .then((token) => {
          commit('AUTH_SUCCESS', token);
          localStorage.setItem('myAppToken', token);
        })
        .catch(() => {
          commit('AUTH_ERROR');
          localStorage.removeItem('myAppToken');
        });
    },
  },
  modules: {},
});
