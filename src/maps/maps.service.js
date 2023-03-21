/**
 * @typedef {import('../../types/src/maps/maps.service').PlaceCoordinates} PlaceCoordinates
 * @typedef {import('../../types/src/maps/maps.service').Deps} Deps
 * @typedef {import('../../types/src/maps/maps.service').MapsService} MapsService
 * @typedef {import('../../types/src/maps/maps.service').DirectionsInfo} DirectionsInfo
 */

import { partial } from '@oldbros/shiftjs';
import { ApplicationError } from '../application.error.js';

/**
 * @param {Deps} deps
 * @param {PlaceCoordinates} departurePoint
 * @param {PlaceCoordinates} destinationPoint
 * @returns {Promise<DirectionsInfo | null>}
 */
export const getTripInfo = async ({ mapsApiProvider, logger }, departurePoint, destinationPoint) => {
  try {
    return await mapsApiProvider.getDirectionInfo({ departurePoint, destinationPoint });
  } catch (e) {
    logger.error(e);
    throw new ApplicationError('Maps service temporarily unavailable');
  }
};

/**
 * @param {Deps} deps
 * @returns {MapsService}
 */
export const initMapsService = (deps) => {
  const serviceName = 'MapsService';
  return {
    getTripInfo: partial(
      getTripInfo,
      {
        ...deps,
        logger: deps.logger.child({ service: serviceName, method: 'getTripInfo' }),
      },
    ),
  };
};
