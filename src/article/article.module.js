import { initPrismaService } from '../prisma/prisma.service.js';
import { initArticleService } from './article.service.js';
import { initArticleController } from './article.controller.js';

export const initArticleModule = () => {
  const prisma = initPrismaService();
  const articleService = initArticleService({ prisma });
  const articleRoutes = initArticleController(articleService);

  return {
    services: [prisma, articleService],
    routes: [articleRoutes],
  };
};
