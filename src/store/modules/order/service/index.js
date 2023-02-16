import { makeAnOrderRequest, getOrderRequest } from '@/utils/ordersApi.js';

export const fetchMakeOrderRequest = (token, cart) => {
  return new Promise((resolve, reject) => {
    makeAnOrderRequest(token)
      .then((response) => {
        const order_price = cart.reduce((acc, value) => acc + +value.price, 0);
        const products = cart.reduce(
          (acc, value) => acc.concat(value.product_id),
          []
        );
        const newOrder = {
          id: response.data.order_id,
          order_price,
          products,
        };

        resolve(newOrder);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetchGetOrderRequest = (token) => {
  return new Promise((resolve, reject) => {
    getOrderRequest(token)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
