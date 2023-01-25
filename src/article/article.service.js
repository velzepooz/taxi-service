/**
 * @typedef {import('../prisma/prisma.service').PrismaService} Prisma
 * @typedef {import('./dto/article.dto').CreateArticleDto} CreateArticleDto
 *
 * @typedef {object} Deps
 * @property {Prisma} prisma
 *
 * @callback CreateAricle
 * @param {CreateArticleDto} payload
*/

import { partial } from '@oldbros/shiftjs';

/**
 * @param {Deps} deps
 * @param {CreateArticleDto} payload
*/
export const createArticle = (deps, payload) => {
  const { prisma } = deps;
  return prisma.article.create({ data: payload });
};

/** @param {Deps} deps */
export const initArticleService = (deps) => ({
  /** @type {CreateAricle} */
  createArticle: partial(createArticle, deps),
});

/**
 * @typedef {object} ArticleService
 * @property {CreateAricle} createArticle
 */
