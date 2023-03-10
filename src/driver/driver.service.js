/**
 * @typedef {import('../../types/src/driver/driver.service').Deps} Deps
 * @typedef {import('../../types/src/driver/dto/create-driver.dto').CreateDriverDto} CreateDriverDto
 * @typedef {import('../../types/src/driver/driver.service').DriverService} DriverService
 * @typedef {import('../../types/src/driver/driver.repository').Driver} Driver
 */

import { partial } from '@oldbros/shiftjs';
import { ApplicationError } from '../utils/application.error.js';

/**
 * @param {Deps} deps
 * @param {CreateDriverDto} payload
 * @param {number} userId
 * @returns {Promise<Driver>}
 */
export const createDriver = async ({ driverRepository, carRepository }, payload, userId) => {
  const car = await carRepository.getCarById(payload.carId);

  if (!car) throw new ApplicationError('Invalid car');

  return driverRepository.createDriver({ ...payload, userId });
};

/**
 * @param {Deps} deps
 * @returns {DriverService}
 */
export const initDriverService = (deps) => ({
  createDriver: partial(createDriver, deps),
});
