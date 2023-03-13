/**
 * @typedef {import('../../types/src/driver/driver.repository').Deps} Deps
 * @typedef {import('../../types/src/driver/driver.repository').Driver} Driver
 * @typedef {import('../../types/src/driver/driver.repository').DriverRepository} DriverRepository
 * @typedef {import('../../types/src/driver/driver.repository').DriverToCreate} DriverToCreate
 */

import { partial } from '@oldbros/shiftjs';

/**
 * @param {Deps} deps
 * @param {DriverToCreate} driverToCreate
 * @returns {Promise<Driver>}
 */
export const createDriver = async ({ queryBuilder }, driverToCreate) => {
  /** @type {*} */
  const result = await queryBuilder
    .insert('Driver', { ...driverToCreate, updatedAt: new Date() })
    .returning(['*']);

  return result.rows[0];
};

/**
 * @param {Deps} deps
 * @returns {DriverRepository}
 */
export const initDriverRepository = (deps) => ({
  createDriver: partial(createDriver, deps),
});
