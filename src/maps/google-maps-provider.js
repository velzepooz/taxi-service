/**
 * @typedef {import('../../types/src/maps/maps.service').MapsAPIProvider} MapsAPIProvider
 * @typedef {import('../../types/src/maps/maps.service').GetDirectionInfo} GetDirectionInfo
 * @typedef {import('../../types/src/maps/google-maps-provider').GoogleDirectionResponse} GoogleDirectionResponse
 */

import { makeHttpRequest } from '../utils/http-request.utils.js';

const API_URL = 'https://maps.googleapis.com/maps/api/directions/json';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
/**
 * @type {GetDirectionInfo}
 */
export const getDirectionInfo = async (departurePoint, destinationPoint) => {
  try {
    /** @type {GoogleDirectionResponse} */
    // eslint-disable-next-line max-len
    const response = await makeHttpRequest(`${API_URL}?origin=${depaturePoint.long}, ${depaturePoint.lat}&destination=${destinationPoint.long}, ${destinationPoint.lat}&key=${GOOGLE_API_KEY}`);
    const routeInfo = response.routes[0].legs[0];

    return {
      destinationAddress: routeInfo.end_address,
      departureAddress: routeInfo.start_address,
      distance: routeInfo.distance.value,
      duration: routeInfo.duration.value,
    };
  } catch (e) {
    console.log(e);

    return null;
  }
};

/**
 * @type {MapsAPIProvider}
 */
export const googleMapsProvider = {
  getDirectionInfo,
};
