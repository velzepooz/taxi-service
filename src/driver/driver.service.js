/**
 * @typedef {import('../prisma/prisma.service').PrismaService} Prisma
 *
 * @typedef {object} Deps
 * @property {Prisma} prisma
 *
 * @callback CreateDriver
 */

import { partial } from '@oldbros/shiftjs';

/**
 * @param {Deps} deps
 */
export const createDriver = (deps, payload) => {
  console.log(deps);
  console.log(payload);
};

/** @param {Deps} deps */
export const initDriverService = (deps) => ({
  /** @type {CreateDriver} */
  createDriver: partial(createDriver, deps),
});

/**
 * @typedef {object} DriverService
 * @property {CreateDriver} createDriver
 */
