/**
 * @typedef {import('../../types/src/car/car.repository').Deps} Deps
 * @typedef {import('../../types/src/car/car.repository').GetCarsListQueryParams} GetCarsListQueryParams
 * @typedef {import('../../types/src/car/car.repository').Car} Car
 * @typedef {import('../../types/src/car/car.repository').CarRepository} CarRepository
 */

import { partial } from '@oldbros/shiftjs';
import Cursor from 'pg-cursor';

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
 * @param {GetCarsListQueryParams} queryParams
 * @returns {Promise<Car[]>}
 */
export const getCarsList = async ({ queryBuilder }, { limit, offset, search }) => (await queryBuilder
  .query(`
SELECT * FROM "Car"
WHERE LOWER(manufacturer) LIKE LOWER(CONCAT('%', $1::text, '%')) OR LOWER(model) LIKE LOWER(CONCAT('%', $1::text, '%'))
ORDER BY year DESC 
LIMIT $2 
OFFSET $3
  `, [search, limit, offset])).rows;

/**
 * @param {Deps} deps
 * @returns {Promise<number>}
 */
export const countCars = async ({ queryBuilder }) => (await queryBuilder
  .query('SELECT COUNT(id) FROM "Car"', []))
  .rows[0]
  .count;

export const getCarsWithCursor = async ({ queryBuilder }, { perPage, search }) => {
  const client = await queryBuilder.pool.connect();
  const cursor = await client.query(new Cursor(`
SELECT * FROM "Car"
WHERE LOWER(manufacturer) LIKE LOWER(CONCAT('%', $1::text, '%')) OR LOWER(model) LIKE LOWER(CONCAT('%', $1::text, '%'))
ORDER BY year DESC 
  `, [search]));

  return cursor.read(perPage);
};
/**
 * @param {Deps} deps
 * @returns {CarRepository}
 */
export const initCarRepository = (deps) => ({
  getCarById: partial(getCarById, deps),
  getCarsList: partial(getCarsList, deps),
  countCars: partial(countCars, deps),
  getCarsWithCursor: partial(getCarsWithCursor, deps),
});
