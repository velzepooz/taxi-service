/** @typedef {import('../../types/src/car/car.service').Deps} Deps */

import { partial } from '@oldbros/shiftjs';

/**
 *
 * @param {Deps} deps
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<Car[]>}
 */
export const getCarsList = async ({ carRepository }, page, perPage) => carRepository
  .getCarsList(perPage, (page - 1) * perPage);

/**
 * @param {Deps} deps
 * @returns {CarService}
 */
export const initCarService = (deps) => ({
  getCarsList: partial(getCarsList, deps),
});
