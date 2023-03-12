/**
 * @typedef {import('../../types/src/maps/maps.service').MapsAPIProvider} MapsAPIProvider
 * @typedef {import('../../types/src/maps/maps.service').GetDirectionInfo} GetDirectionInfo
 * @typedef {import('../../types/src/maps/google-maps-provider').GoogleDirectionResponse} GoogleDirectionResponse
 * @typedef {import('../../types/src/maps/maps.service').MapsAPIProviderDeps} MapsAPIProviderDeps
 * @typedef {import('../../types/src/maps/maps.service').DirectionInfoParams} DirectionInfoParams
 */

import { partial } from '@oldbros/shiftjs';
import { makeHttpRequest } from '../utils/http-request.utils.js';

const API_URL = 'https://maps.googleapis.com/maps/api/directions/json';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
/**
 * @param {MapsAPIProviderDeps} deps
 * @param {DirectionInfoParams} params
 */
export const getDirectionInfo = async (deps, { departurePoint, destinationPoint }) => {
  const { logger } = deps;
  try {
    /** @type {GoogleDirectionResponse} */
    // eslint-disable-next-line max-len
    const response = await makeHttpRequest(`${API_URL}?origin=${departurePoint.long}, ${departurePoint.lat}&destination=${destinationPoint.long}, ${destinationPoint.lat}&key=${GOOGLE_API_KEY}`);
    if (!response || response.status !== 'OK') {
      logger.error(response.status);
      return null;
    }
    const [bestRoute] = response.routes;
    if (!bestRoute) return null;
    const [routeInfo] = bestRoute.legs;

    return routeInfo
      ? {
        destinationAddress: routeInfo.end_address,
        departureAddress: routeInfo.start_address,
        distance: routeInfo.distance.value,
        duration: routeInfo.duration.value,
      } : null;
  } catch (e) {
    logger.error(e);

    return null;
  }
};

/**
 * @param {MapsAPIProviderDeps} deps
 * @returns {MapsAPIProvider}
 */
export const initGoogleMapsProvider = (deps) => {
  const serviceName = 'GoogleMapsProvider';
  return {
    getDirectionInfo: partial(
      getDirectionInfo,
      { ...deps, logger: deps.logger.child({ service: serviceName, method: 'getDirectionInfo' }) },
    ),
  };
};
