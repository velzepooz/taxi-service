import { describe, it, beforeEach, before } from 'node:test';
import assert from 'node:assert';
import { faker } from '../utils/faker.js';
import { buildApp } from '../utils/test.utils.js';

describe('On authController', () => {
  let app;

  before(() => {
    app = buildApp();
  });

  describe('On signUp', () => {
    let userToCreate;

    beforeEach(async () => {
      userToCreate = {
        firstName: faker.firstName(),
        lastName: faker.lastName(),
        email: faker.email(),
        phone: faker.mobilePhone(),
        password: faker.password(),
        dateOfBirth: new Date().toISOString(),
      };
    });

    it('Should return HTTP 201 CREATED', async () => {
      const response = await app.inject()
        .post('/auth/signUp')
        .payload(userToCreate);

      assert.strictEqual(response.statusCode, 201);
    });

    it('Should return HTTP 400 in case of invalid email', async () => {
      userToCreate.email = faker.string();
      const response = await app.inject()
        .post('/auth/signUp')
        .payload(userToCreate);

      assert.strictEqual(response.statusCode, 400);
    });

    it('Should return HTTP 400 in case of invalid date of birth', async () => {
      userToCreate.dateOfBirth = faker.string();
      const response = await app.inject()
        .post('/auth/signUp')
        .payload(userToCreate);

      assert.strictEqual(response.statusCode, 400);
    });
  });
});
