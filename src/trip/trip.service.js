/**
 * @typedef {import('../../types/src/trip/trip.service').Deps} Deps
 * @typedef {import('../../types/src/trip/trip.service').TripService} TripService
 * @typedef {import('../../types/src/trip/trip.service').TripInfo} TripInfo
 * @typedef {import('../../types/src/trip/dto/calculate-trip-price.dto').CalculateTripPriceDto} CalculateTripPriceDto
 */

import { partial } from '@oldbros/shiftjs';
import { calculatePriceForTrip } from './calculations/calculate-trip-price.js';
import { convertMetersToKilometres } from './calculations/calculate-distance.js';
import { convertSecondsToMinutes } from './calculations/calculate-duration.js';

/**
 * @param {Deps} deps
 * @param {CalculateTripPriceDto} payload
 * @returns {Promise<TripInfo>}
 */
export const getTripCalculationInfo = async ({ mapsService }, payload) => {
  const tripInfoFromMaps = await mapsService.getTripInfo(
    { lat: payload.depLat, long: payload.depLong },
    { lat: payload.destLat, long: payload.destLong },
  );
  const distanceInKms = convertMetersToKilometres(tripInfoFromMaps.distance);
  const tripPrice = calculatePriceForTrip(distanceInKms);

  return {
    departureAddress: tripInfoFromMaps.departureAddress,
    destinationAddress: tripInfoFromMaps.destinationAddress,
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
  getTripCalculationInfo: partial(getTripCalculationInfo, deps),
});
