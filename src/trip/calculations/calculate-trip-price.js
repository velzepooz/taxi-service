const PRICE_PER_KM = 1;

/**
 * Calculates price for trip
 * @param {number} distance - distance in kms
 * @returns {number}
 */
export const calculatePriceForTrip = (distance) => distance * PRICE_PER_KM;
