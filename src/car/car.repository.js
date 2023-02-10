/** @typedef {import('../../types/src/car/car.repository').Deps} Deps */

import { partial } from '@oldbros/shiftjs';

/**
 * @param {Deps} deps
 * @param {id} id
 * @returns {Car | null}
 */
export const getCarById = async ({ queryBuilder }, id) => {
  const [car] = await queryBuilder.select('Car', ['id'], { id });

  return car || null;
};

/**
 * @param {Deps} deps
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<Car[]>}
 */
export const getCarsList = async ({ queryBuilder }, limit, offset) => queryBuilder
  .select('Car', ['*'])
  .desc('year')
  .offset(offset)
  .limit(limit);

/**
 * @param {Deps} deps
 * @returns {CarRepository}
 */
export const initCarRepository = (deps) => ({
  getCarById: partial(getCarById, deps),
  getCarsList: partial(getCarsList, deps),
});
