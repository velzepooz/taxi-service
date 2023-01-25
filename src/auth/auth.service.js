/**
 * @typedef {import('../prisma/prisma.service').PrismaService} Prisma
 *
 * @typedef {object} Deps
 * @property {Prisma} prisma
 *
 * @callback SignUpUser
 * @param {SignUpDto} payload
 */

import { partial } from '@oldbros/shiftjs';

/**
 * @param {Deps} deps
 * @param {SignUpDto} payload
 */
export const signUpUser = async (deps, payload) => {
  const { prisma } = deps;
  return prisma.user.create({ data: payload });
};

/**
 * @param {Deps} deps
 */
export const initAuthService = (deps) => ({
  signUpUser: partial(signUpUser, deps),
});

/**
 * @typedef {object} AuthService
 * @property {SignUpUser} signUpUser
 */
