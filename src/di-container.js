import diContainer from 'true-di';
import { initUserRepository } from './auth/user.repository.js';
import { initDbQueryBuilder } from './db.js';
import { initJwtService } from './auth/jwt.service.js';
import { initAuthService } from './auth/auth.service.js';
import { config } from './config.js';
import { initDriverRepository } from './driver/driver.repository.js';
import { initDriverService } from './driver/driver.service.js';
import { initCarRepository } from './car/car.repository.js';
import { initCarService } from './car/car.service.js';


// @ts-ignore
const createContainer = diContainer.default;

/** @type {import('../types/src/di-container').DiContainer} */
const container = createContainer({
  queryBuilder: () => initDbQueryBuilder({
    ...config.db,
  }),
  jwtService: () => initJwtService(),
  userRepository: ({ queryBuilder }) => initUserRepository({ queryBuilder }),
  authService: ({ userRepository, jwtService }) => initAuthService({ userRepository, jwtService }),
  driverRepository: ({ queryBuilder }) => initDriverRepository({ queryBuilder }),
  carRepository: ({ queryBuilder }) => initCarRepository({ queryBuilder }),
  driverService: ({ driverRepository, carRepository }) => initDriverService({ driverRepository, carRepository }),
  carService: ({ carRepository }) => initCarService({ carRepository }),
});

export default container;
