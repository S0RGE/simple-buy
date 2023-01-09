const API = process.env.VUE_APP_API;

export const makeAnOrderRequest = (token) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/order`, {
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

export const getOrderRequest = (token) => {
  return new Promise((resolve, reject) => {
    fetch(`${API}/order`, {
      method: 'GET',
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
