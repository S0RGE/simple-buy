import { getProduct, addToCart, getCart } from '@/utils/productApi.js';

export default {

  state: () => ({
    products: [],
    cart: [],
  }),

  actions: {
    PRODUCT_REQ: ({ commit }) => {
      getProduct()
        .then((response) => {
          commit('product_req', response.data);
        })
        .catch((error) => console.error(error));
    },
    ADD_TO_CART: ({ commit }, productId) => {
      addToCart(productId).then(() => commit('add_to_cart', productId));
    },
    CART_REQ: ({ commit }) => {
      getCart()
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
  },

  getters: {
    getAllProducts: (state) => state.products,
    getCart: (state) => state.cart,
  },
  
};
