/**
 * @typedef {import('../../types/src/maps/maps.service').PlaceCoordinates} PlaceCoordinates
 * @typedef {import('../../types/src/maps/maps.service').Deps} Deps
 * @typedef {import('../../types/src/maps/maps.service').MapsService} MapsService
 * @typedef {import('../../types/src/maps/maps.service').DirectionsInfo} DirectionsInfo
 */

import { partial } from '@oldbros/shiftjs';

/**
 * @param {Deps} deps
 * @param {PlaceCoordinates} departurePoint
 * @param {PlaceCoordinates} destinationPoint
 * @returns {Promise<DirectionsInfo | null>}
 */
export const getTripInfo = async ({ mapsApiProvider }, departurePoint, destinationPoint) =>
  mapsApiProvider.getDirectionInfo({ departurePoint, destinationPoint });

/**
 * @param {Deps} deps
 * @returns {MapsService}
 */
export const initMapsService = (deps) => ({
  getTripInfo: partial(getTripInfo, deps),
});
