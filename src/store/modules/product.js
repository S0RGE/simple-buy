import {
  getProduct,
  addToCart,
  getCart,
  removeFromCart,
} from '@/utils/productApi.js';

import { setError } from '@/utils/error';

export default {
  state: () => ({
    products: [],
    cart: [],
  }),

  actions: {
    DELETE_PRODUCTS_FROM_CART: ({ commit, state, rootState }, productId) => {
      rootState.status = 'loading';
      const productsToDelete = state.cart.filter(
        (pr) => pr.product_id === productId
      );
      productsToDelete.forEach((product) => {
        removeFromCart({
          productId: product.id,
          token: rootState.auth.token,
        });
      });
      commit('DELETE_PRODUCTS_FROM_CART', productId);
      rootState.status = '';
    },
    PRODUCT_REQ: ({ commit, rootState }) => {
      rootState.status = 'loading';
      getProduct(rootState.auth.token)
        .then((response) => {
          // dispatch('order/getSome', {}, { root: true })
          commit('PRODUCT_REQ', response.data);
        })
        .catch((error) => setError(error.error.message, rootState));
      rootState.status = '';
    },
    ADD_TO_CART: ({ commit, rootState }, productId) => {
      rootState.status = 'loading';
      return new Promise((resolve, reject) => {
        addToCart({ productId, token: rootState.auth.token })
          .then((prod) => {
            commit('ADD_TO_CART', prod.data);
            resolve(prod.data);
            rootState.status = '';
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    INCREMENT_PRODUCT_COUNT: ({ commit, state, rootState }, productId) => {
      rootState.status = 'loading';
      const productToAdd = state.cart.find((pr) => pr.product_id == productId);
      if (productToAdd) {
        addToCart({ productId, token: rootState.auth.token }).then(
          (prodInfo) => {
            const formatedProduct = Object.assign({}, productToAdd, {
              product_id: prodInfo.data.product_id,
              id: prodInfo.data.product_cart_id,
            });
            commit('INCREMENT_PRODUCT_COUNT', formatedProduct);
          }
        );
      }
      rootState.status = '';
    },
    DECREMENT_PRODUCT_COUNT: ({ commit, state, rootState }, productId) => {
      rootState.status = 'loading';
      const productToRemove = state.cart.find((pr) => pr.id == productId);
      if (productToRemove) {
        removeFromCart({ productId, token: rootState.auth.token }).then(() =>
          commit('DECREMENT_PRODUCT_COUNT', productToRemove)
        );
      }
      rootState.status = '';
    },
    CART_REQ: ({ commit, rootState }) => {
      rootState.status = 'loading';
      return new Promise((resolve, reject) => {
        getCart(rootState.auth.token)
          .then((response) => {
            commit('CART_REQ', response.data);
            resolve(response);
          })
          .catch((error) => {
            setError(error.error.message, rootState);
            reject(error);
          });
        rootState.status = '';
      });
    },
  },

  mutations: {
    PRODUCT_REQ: (state, products) => {
      state.products = products;
    },
    CART_REQ: (state, products) => {
      state.cart = products;
    },
    ADD_TO_CART: (state, { product_id, product_cart_id }) => {
      const productToAdd = state.products.find((pr) => pr.id === product_id);
      const formatedProduct = Object.assign({}, productToAdd, {
        product_id,
        id: product_cart_id,
      });
      state.cart.push(formatedProduct);
    },
    INCREMENT_PRODUCT_COUNT: (state, productToAdd) => {
      state.cart.push(productToAdd);
    },
    DECREMENT_PRODUCT_COUNT: (state, productToRemove) => {
      const index = state.cart.indexOf(productToRemove);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    DELETE_PRODUCTS_FROM_CART: (state, productId) => {
      state.cart = state.cart.filter(
        (product) => product.product_id !== productId
      );
    },
  },

  getters: {
    getProdustById: (state) => (productId) => {
      return state.products.find((product) => product.id === productId);
    },
    getAllProducts: (state) => state.products,
    getCart: (state) => {
      const result = [];
      state.cart?.forEach((product) => {
        const elem = result.find((p) => p.product_id === product.product_id);
        if (!elem) {
          result.push(Object.assign({}, product, { count: 1 }));
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
