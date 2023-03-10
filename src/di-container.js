import diContainer from 'true-di';
import { initUserRepository } from './auth/user.repository.js';
import { initDbQueryBuilder } from './db.js';
import { initJwtService } from './auth/jwt.service.js';
import { initAuthService } from './auth/auth.service.js';
import { config } from './config.js';
import { initDriverRepository } from './driver/driver.repository.js';
import { initDriverService } from './driver/driver.service.js';
import { initCarRepository } from './car/car.repository.js';

/** @type {import('../types/src/di-container').DiContainer} */
const container = diContainer.default({
  queryBuilder: () => initDbQueryBuilder({
    ...config.db,
  }),
  jwtService: () => initJwtService(),
  userRepository: ({ queryBuilder }) => initUserRepository({ queryBuilder }),
  authService: ({ userRepository, jwtService }) => initAuthService({ userRepository, jwtService }),
  driverRepository: ({ queryBuilder }) => initDriverRepository({ queryBuilder }),
  carRepository: ({ queryBuilder }) => initCarRepository({ queryBuilder }),
  driverService: ({ driverRepository, carRepository }) => initDriverService({ driverRepository, carRepository }),
});

export default container;
