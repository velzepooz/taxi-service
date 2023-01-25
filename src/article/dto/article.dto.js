export const articleDto = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    blogId: {
      type: ['string', 'null'],
    },
    authorId: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    abstract: {
      type: 'string',
    },
    keywords: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    content: {
      type: ['number', 'string', 'boolean', 'object', 'array', 'null'],
    },
  },
};

export const createArticleDto = {
  required: ['author', 'title', 'abstract', 'keywords', 'content'],
  ...articleDto,
};

/**
 * @typedef {object} CreateArticleDto
 * @property {string} authorId
 * @property {string} title
 * @property {string} abstract
 * @property {string} keywords
 * @property {object} content
 *
 * @typedef {object} ArticleDto
 * @property {?string} id
 * @property {?string} blogId
 * @property {string} authorId
 * @property {string} title
 * @property {string} abstract
 * @property {string} keywords
 * @property {object} content
 */
