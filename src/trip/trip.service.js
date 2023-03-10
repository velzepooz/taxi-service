/**
 * @typedef {import('../../types/src/trip/trip.service').Deps} Deps
 * @typedef {import('../../types/src/trip/trip.service').TripService} TripService
 * @typedef {import('../../types/src/trip/trip.service').TripInfo} TripInfo
 * @typedef {import('../../types/src/trip/dto/calculate-trip-price.dto').CalculateTripPriceDto} CalculateTripPriceDto
 */

import { partial } from '@oldbros/shiftjs';

import { ApplicationError } from '../application.error.js';
import { calculatePriceForTrip } from './calculations/calculate-trip-price.js';
import { convertMetersToKilometeres } from './calculations/calculate-distance.js';
import { convertSecondsToMinutes } from './calculations/calculate-duration.js';

/**
 * @param {Deps} deps
 * @param {CalculateTripPriceDto} payload
 * @returns {Promise<TripInfo>}
 */
export const getTripInfo = async ({ mapsService }, payload) => {
  const tripInfoFromMaps = await mapsService.getTripInfo(
    { lat: payload.depLat, long: payload.depLong },
    { lat: payload.destLat, long: payload.destLong },
  );
  if (!tripInfoFromMaps) throw new ApplicationError('Maps service temporarily unavailable');
  const distanceInKms = convertMetersToKilometeres(tripInfoFromMaps.distnace);
  const tripPrice = calculatePriceForTrip(distanceInKms);

  return {
    departureAddress: tripInfoFromMaps.depatureAddress,
    destinationAddress: tripInfoFromMaps.destionationAddress,
    price: tripPrice,
    duration: convertSecondsToMinutes(tripInfoFromMaps.duration),
    distance: distanceInKms,
  };
};

/**
 * @param {Deps} deps
 * @returns {TripService}
 */
export const initTripService = (deps) => ({
  getTripInfo: partial(getTripInfo, deps),
});
