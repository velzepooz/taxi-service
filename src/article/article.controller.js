/** @typedef {import('fastify').RouteOptions} FastifyRoute */
/** @typedef {import('./article.service').ArticleService} ArticleService*/
/** @typedef {import('./dto/article.dto').CreateArticleDto} CreateArticleDto*/

import { createArticleDto } from './dto/article.dto.js';

/**
 * @param {ArticleService} articleService
 * @returns {FastifyRoute[]}
*/
export const initArticleController = (articleService) => {
  const urlPrefix = '/article';

  /** @type {FastifyRoute} */
  const createArticleRoute = {
    method: 'POST',
    url: `${urlPrefix}`,
    schema: {
      body: createArticleDto,
    },
    handler: async (req, res) => {
      /** @type {*} CreateArticleDto */
      const payload = req.body;
      const result = await articleService.createArticle(payload);
      const [code, data] = result ? [200, result] : [204, null];
      res.code(code).send(data);
    },
  };

  return [createArticleRoute];
};
