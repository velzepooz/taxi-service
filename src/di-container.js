import diContainer from 'true-di';
import { initUserRepository } from './auth/user.repository.js';
import { initDbQueryBuilder } from './db.js';
import { initJwtService } from './auth/jwt.service.js';
import { initAuthService } from './auth/auth.service.js';
import { config } from './config.js';
import { initDriverRepository } from './driver/driver.repository.js';
import { initDriverService } from './driver/driver.service.js';
import { initCarRepository } from './car/car.repository.js';
import { initTripService } from './trip/trip.service.js';
import { initGoogleMapsProvider } from './maps/google-maps-provider.js';
import { initMapsService } from './maps/maps.service.js';
import { initLogger } from './logger.js';

/** @type {import('../types/src/di-container').DiContainer} */
const container = diContainer.default({
  queryBuilder: () => initDbQueryBuilder({
    ...config.db,
  }),
  logger: () => initLogger(),
  jwtService: () => initJwtService(),
  userRepository: ({ queryBuilder }) => initUserRepository({ queryBuilder }),
  authService: ({ userRepository, jwtService }) => initAuthService({ userRepository, jwtService }),
  driverRepository: ({ queryBuilder }) => initDriverRepository({ queryBuilder }),
  carRepository: ({ queryBuilder }) => initCarRepository({ queryBuilder }),
  driverService: ({ driverRepository, carRepository }) => initDriverService({ driverRepository, carRepository }),
  mapsApiProvider: ({ logger }) => initGoogleMapsProvider({ logger }),
  mapsService: ({ mapsApiProvider }) => initMapsService({ mapsApiProvider }),
  tripService: ({ mapsService }) => initTripService({ mapsService }),
});

export default container;
