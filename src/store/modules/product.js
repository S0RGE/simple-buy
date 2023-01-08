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
          commit('product_req', response.data);
        })
        .catch((error) => console.error(error));
    },
    ADD_TO_CART: ({ commit, rootState }, productId) => {
      addToCart({ productId, token: rootState.auth.token }).then(() =>
        commit('add_to_cart', productId)
      );
    },
    INCREMENT_PRODUCT_COUNT: ({ commit, state, rootState }, productId) => {
      const productToAdd = state.cart.find((pr) => pr.product_id == productId);
      if (productToAdd) {
        addToCart({ productId, token: rootState.auth.token }).then(() =>
          commit('increment_product_count', productId)
        );
      }
    },
    DECREMENT_PRODUCT_COUNT: ({ commit, state, rootState }, productId) => {
      const productToAdd = state.cart.find((pr) => pr.id == productId);
      if (productToAdd) {
        removeFromCart({ productId, token: rootState.auth.token }).then(() =>
          commit('decrement_product_count', productId)
        );
      }
    },
    CART_REQ: ({ commit, rootState }) => {
      getCart(rootState.auth.token)
        .then((response) => {
          commit('cart_req', response.data);
        })
        .catch((error) => console.error(error));
    },
  },

  mutations: {
    product_req: (state, products) => {
      state.products = products;
    },
    cart_req: (state, products) => {
      state.cart = products;
    },
    add_to_cart: (state, productId) => {
      state.cart.push(
        state.products.find((product) => product.id === productId)
      );
    },
    increment_product_count: (state, productId) => {
      const productToIncrement = state.cart.find(
        (pr) => pr.product_id === productId
      );
      state.cart.push(productToIncrement);
    },
    decrement_product_count: (state, productId) => {
      const productToIncrement = state.cart.find((pr) => pr.id === productId);
      const index = state.cart.indexOf(productToIncrement);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
  },

  getters: {
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
