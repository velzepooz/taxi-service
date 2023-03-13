/**
 * @typedef {import('../../types/src/car/car.repository').Deps} Deps
 * @typedef {import('../../types/src/car/car.repository').Car} Car
 * @typedef {import('../../types/src/car/car.repository').CarRepository} CarRepository
 * */

import { partial } from '@oldbros/shiftjs';

/**
 * @param {Deps} deps
 * @param {number} id
 * @returns {Promise<Car | null>}
 */
export const getCarById = async ({ queryBuilder }, id) => {
  /** @type {*} */
  const [car] = await queryBuilder.select('Car', ['id'], { id });

  return car || null;
};

/**
 * @param {Deps} deps
 * @returns {CarRepository}
 */
export const initCarRepository = (deps) => ({
  getCarById: partial(getCarById, deps),
});
