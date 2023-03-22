/**
 * @typedef {import('../../types/src/car/car.service').Deps} Deps
 * @typedef {import('../../types/src/car/car.service').GetCarsListParams} GetCarsListParams
 * @typedef {import('../../types/src/car/car.service').CarService} CarService
 * @typedef {import('../../types/src/car/car.service').CarsList} CarsList
 * @typedef {import('../../types/src/car/car.repository').Car} Car
 */

import { partial } from '@oldbros/shiftjs';

/**
 *
 * @param {Deps} deps
 * @param {GetCarsListParams} getListParams
 * @returns {Promise<CarsList[]>}
 */
export const getCarsList = async ({ carRepository, bus }, { page, perPage, search }) => {
  let cars = [];
  try {
    cars = await carRepository.getCarsWithCursor({ perPage, search });
    bus.emit('mail', cars);
  } catch (e) {
    console.log({ e });
  }
  // const carsPromise = carRepository
  //   .getCarsList({ limit: perPage, offset: (page - 1) * perPage, search });
  // const carsCountPromise = carRepository.countCars();
  // const [cars, carsCount] = await Promise.all([carsPromise, carsCountPromise]);

  return {
    cars,
    currentPage: page,
    totalPages: Math.ceil(1 / perPage) || 1,
  };
};

/**
 * @param {Deps} deps
 * @returns {CarService}
 */
export const initCarService = (deps) => ({
  getCarsList: partial(getCarsList, deps),
});
