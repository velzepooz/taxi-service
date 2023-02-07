import diContainer from 'true-di';
import { initUserRepository } from './auth/user.repository.js';
import { initDbQueryBuilder } from './db.js';
import { initJwtService } from './auth/jwt.service.js';
import { initAuthService } from './auth/auth.service.js';
import { config } from './config.js';

/** @type {import('../types/src/di-container').DiContainer} */
const container = diContainer.default({
  queryBuilder: () => initDbQueryBuilder({
    ...config.db,
  }),
  jwtService: () => initJwtService(),
  userRepository: ({ queryBuilder }) => initUserRepository({ queryBuilder }),
  authService: ({ userRepository, jwtService }) => initAuthService({ userRepository, jwtService }),
});

export default container;
