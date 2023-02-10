import { describe, it, beforeEach, before } from 'node:test';
import assert from 'node:assert';
import { config } from '../config.js';
import { faker } from '../../test/utils/faker.js';
import { initDbQueryBuilder } from '../db.js';
import { getStartOfDay } from '../utils/datetime.utils.js';
import { createUser } from '../../test/factories/user.factory.js';
import { ApplicationError } from '../shared/application.error.js';
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
    authService = initAuthService({ userRepository, jwtService });
  });

  describe('On signUpUser', async () => {
    let userToCreate;

    beforeEach(async () => {
      userToCreate = {
        firstName: faker.firstName(),
        lastName: faker.lastName(),
        email: faker.email(),
        phone: faker.mobilePhone(),
        password: faker.string(),
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

  describe('On signInUser', async () => {
    let user, signInPayload;

    beforeEach(async () => {
      const password = faker.string();
      user = await createUser({ password });
      signInPayload = {
        phone: user.phone,
        password,
      };
    });

    it('Should sign return user, access and refresh cookies', async () => {
      const result = await authService.signInUser(signInPayload);

      assert.strictEqual(result.user.firstName, user.firstName);
      assert.strictEqual(result.user.lastName, user.lastName);
      assert.strictEqual(result.user.email, user.email);
      assert.strictEqual(result.user.phone, user.phone);
      assert.strictEqual(result.user.password, null);
      assert.match(result.accessCookie, /^Authentication=/);
      assert.match(result.refreshCookie, /^Refresh=/);
    });

    it('Should throw error if no such user', async () => {
      signInPayload.phone = faker.mobilePhone();

      assert.rejects(authService.signInUser(signInPayload), ApplicationError);
    });

    it('Should throw error if password invalid', async () => {
      signInPayload.password = faker.string();

      assert.rejects(authService.signInUser(signInPayload), ApplicationError);
    });
  });

  describe('On refreshAccessToken', async () => {
    it('Should generate new access cookie', async () => {
      const result = await authService.refreshAccessToken(faker.integer({}));

      assert.match(result, /^Authentication=/);
    });
  });

  describe('On signOut', async () => {
    let user;

    beforeEach(async () => {
      user = await createUser({});
    });

    it('Should set refresh token to null', async () => {
      await authService.signOut(user.id);
      const [updatedUser] = await queryBuilder.select(
        'User',
        ['refreshToken'],
        { id: user.id },
      );

      assert.deepEqual(updatedUser.refreshToken, null);
    });
  });
});
