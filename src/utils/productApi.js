const API = process.env.VUE_APP_API;

export const getProduct = (token) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};

export const getCart = (token) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => reject(error));
  });
};

export const addToCart = ({ productId, token }) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/cart/${productId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};

export const removeFromCart = ({ productId, token }) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};
