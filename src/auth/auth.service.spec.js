import { describe, it, beforeEach, before } from 'node:test';
import assert from 'node:assert';
import { config } from '../config.js';
import { faker } from '../../test/utils/faker.js';
import { initDbQueryBuilder } from '../db.js';
import { getStartOfDay } from '../utils/datetime.utils.js';
import { initUserRepository } from './user.repository.js';
import { initAuthService } from './auth.service.js';
import { initJwtService } from './jwt.service.js';

describe('On authService', () => {
  let queryBuilder,
      authService,
      userRepository;

  before(async () => {
    queryBuilder = initDbQueryBuilder({
      ...config.db,
      logger: {
        db: () => console,
        debug: () => console,
      },
    });
    userRepository = initUserRepository({ queryBuilder });
    const jwtService = initJwtService();
    authService = initAuthService({ userRepository, jwtService, config });
  });

  describe('On signUpUser', async () => {
    let userToCreate;

    beforeEach(async () => {
      userToCreate = {
        firstName: faker.firstName(),
        lastName: faker.lastName(),
        email: faker.email(),
        phone: faker.mobilePhone(),
        password: faker.password(),
        dateOfBirth: new Date(),
      };
    });

    it('Should create user account', async () => {
      await authService.signUpUser(userToCreate);

      const [createdUser] = await queryBuilder.select(
        'User',
        ['firstName', 'email', 'lastName', 'phone', 'dateOfBirth'],
        { email: userToCreate.email },
      );

      assert.strictEqual(userToCreate.firstName, createdUser.firstName);
      assert.strictEqual(userToCreate.lastName, createdUser.lastName);
      assert.strictEqual(userToCreate.email, createdUser.email);
      assert.strictEqual(userToCreate.phone, createdUser.phone);
      assert.strictEqual(getStartOfDay(userToCreate.dateOfBirth).getTime(), createdUser.dateOfBirth.getTime());
    });
  });
});
