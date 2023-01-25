/**
 * @typedef {import('../prisma/prisma.service').PrismaService} Prisma
 * @typedef {import('./dto/driver.dto').CreateDriverDto} CreateDriverDto
 *
 * @typedef {object} Deps
 * @property {Prisma} prisma
 *
 * @callback CreateDriver
 * @param {CreateDriverDto} payload
 */

import { partial } from '@oldbros/shiftjs';

/**
 * @param {Deps} deps
 * @param {CreateDriverDto} payload
 */
export const createDriver = (deps, payload) => {
  const { prisma } = deps;

  return prisma.driver.create({ data: payload });
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
