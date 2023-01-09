import {
  getProduct,
  addToCart,
  getCart,
  removeFromCart,
} from '@/utils/productApi.js';

export default {
  state: () => ({
    products: [],
    cart: [],
  }),

  actions: {
    PRODUCT_REQ: ({ commit, rootState }) => {
      getProduct(rootState.auth.token)
        .then((response) => {
          commit('PRODUCT_REQ', response.data);
        })
        .catch((error) => console.error(error));
    },
    ADD_TO_CART: ({ commit, rootState }, productId) => {
      addToCart({ productId, token: rootState.auth.token }).then(() =>
        commit('ADD_TO_CART', productId)
      );
    },
    INCREMENT_PRODUCT_COUNT: ({ commit, state, rootState }, productId) => {
      const productToAdd = state.cart.find((pr) => pr.product_id == productId);
      if (productToAdd) {
        addToCart({ productId, token: rootState.auth.token }).then(() =>
          commit('INCREMENT_PRODUCT_COUNT', productId)
        );
      }
    },
    DECREMENT_PRODUCT_COUNT: ({ commit, state, rootState }, productId) => {
      const productToAdd = state.cart.find((pr) => pr.id == productId);
      if (productToAdd) {
        removeFromCart({ productId, token: rootState.auth.token }).then(() =>
          commit('DECREMENT_PRODUCT_COUNT', productId)
        );
      }
    },
    CART_REQ: ({ commit, rootState }) => {
      getCart(rootState.auth.token)
        .then((response) => {
          commit('CART_REQ', response.data);
        })
        .catch((error) => console.error(error));
    },
  },

  mutations: {
    PRODUCT_REQ: (state, products) => {
      state.products = products;
    },
    CART_REQ: (state, products) => {
      state.cart = products;
    },
    ADD_TO_CART: (state, productId) => {
      state.cart.push(
        state.products.find((product) => product.id === productId)
      );
    },
    INCREMENT_PRODUCT_COUNT: (state, productId) => {
      const productToIncrement = state.cart.find(
        (pr) => pr.product_id === productId
      );
      state.cart.push(productToIncrement);
    },
    DECREMENT_PRODUCT_COUNT: (state, productId) => {
      const productToIncrement = state.cart.find((pr) => pr.id === productId);
      const index = state.cart.indexOf(productToIncrement);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
  },

  getters: {
    getProdustById: (state) => (productId) => {
      return state.products.find((product) => product.id === productId);
    },
    getAllProducts: (state) => state.products,
    getCart: (state) => {
      const result = [];
      state.cart.forEach((product) => {
        const elem = result.find((p) => p.product_id === product.product_id);
        if (!elem) {
          result.push(Object.assign(product, { count: 1 }));
        } else {
          elem.count++;
        }
      });
      return result.sort((a, b) => {
        return b.name > a.name;
      });
    },
  },
};
