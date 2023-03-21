/**
 * @typedef {import('../../types/src/maps/maps.service').MapsAPIProvider} MapsAPIProvider
 * @typedef {import('../../types/src/maps/maps.service').GetDirectionInfo} GetDirectionInfo
 * @typedef {import('../../types/src/maps/google-maps-provider').GoogleDirectionResponse} GoogleDirectionResponse
 * @typedef {import('../../types/src/maps/maps.service').MapsAPIProviderDeps} MapsAPIProviderDeps
 * @typedef {import('../../types/src/maps/maps.service').DirectionInfoParams} DirectionInfoParams
 */

import { partial } from '@oldbros/shiftjs';
import { ApplicationError } from '../application.error.js';
import { makeHttpRequest } from '../utils/http-request.utils.js';

const API_URL = 'https://maps.googleapis.com/maps/api/directions/json';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
/**
 * @param {MapsAPIProviderDeps} deps
 * @param {DirectionInfoParams} params
 */
export const getDirectionInfo = async (deps, { departurePoint, destinationPoint }) => {
  const { logger } = deps;
  const urlQueryParams = getDirectionInfoUrl({
    departurePointLong: departurePoint.long,
    departurePointLat: departurePoint.lat,
    destinationPoint: destinationPoint.long,
    destinationPointLat: destinationPoint.lat,
  });
  /** @type {GoogleDirectionResponse} */
  const response = await makeHttpRequest(`${API_URL}?${urlQueryParams}&key=${GOOGLE_API_KEY}`);
  if (!response || response.status !== 'OK') {
    logger.error({ status: response.status, error: response.error_message });
    throw new ApplicationError('Google map unavailable');
  }
  const [bestRoute] = response.routes;
  if (!bestRoute) throw new ApplicationError('No best rout found');
  const [routeInfo] = bestRoute.legs;
  if (!routeInfo) throw new ApplicationError('No rout info found');

  return {
    destinationAddress: routeInfo.end_address,
    departureAddress: routeInfo.start_address,
    distance: routeInfo.distance.value,
    duration: routeInfo.duration.value,
  };
};

/**
 * @param {object} queryParams
 * @property {string} departurePointLong
 * @property {string} departurePointLat
 * @property {string} destinationPointLong
 * @property {string} destinationPointLat
 * @returns {string}
 */
function getDirectionInfoUrl({ departurePointLong, departurePointLat, destinationPointLong, destinationPointLat }) {
  // eslint-disable-next-line max-len
  return `origin=${departurePointLong}, ${departurePointLat}&destination=${destinationPointLong}, ${destinationPointLat}`;
}

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
