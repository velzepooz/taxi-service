/**
 * @typedef {import('../../types/src/car/car.service').Deps} Deps
 * @typedef {import('../../types/src/car/car.service').GetCarsListParams} GetCarsListParams
 * @typedef {import('../../types/src/car/car.service').CarService} CarService
 * @typedef {import('../../types/src/car/car.repository').Car} Car
 */

import { partial } from '@oldbros/shiftjs';

/**
 *
 * @param {Deps} deps
 * @param {GetCarsListParams} getListParams
 * @returns {Promise<Car[]>}
 */
export const getCarsList = async ({ carRepository }, { page, perPage, search }) => carRepository
  .getCarsList({ limit: perPage, offset: (page - 1) * perPage, search });

/**
 * @param {Deps} deps
 * @returns {CarService}
 */
export const initCarService = (deps) => ({
  getCarsList: partial(getCarsList, deps),
});
