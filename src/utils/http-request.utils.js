import { ApplicationError } from '../application.error.js';

/**
 * @param {string} url
 * @param {object} requestData
 * @property {string} method
 * @property {object} headers
 * @property {*} data
 * @returns {*}
 */
export const makeHttpRequest = (url, { method, headers, data } = {}) => fetch(url, {
  method: 'GET' || method,
  ...headers && { headers },
  ...data && { body: JSON.stringify(data) },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error(error);
    throw new ApplicationError('Error at makeHttpRequest');
  });
