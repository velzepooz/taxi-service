import { describe, it, beforeEach, before } from 'node:test';
import assert from 'node:assert';
import { faker } from '../utils/faker.js';
import { initFastifyApp } from '../../src/fastify-app.js';
import { createUser } from '../factories/user.factory.js';

describe('On authController', () => {
  let app;

  before(() => {
    app = initFastifyApp({ logger: false });
  });

  describe('On signUp', () => {
    let userToCreate;

    beforeEach(async () => {
      userToCreate = {
        firstName: faker.firstName(),
        lastName: faker.lastName(),
        email: faker.email(),
        phone: faker.mobilePhone(),
        password: faker.string(),
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

  describe('On signIn', () => {
    let user, signInPayload;

    beforeEach(async () => {
      const password = faker.string();
      user = await createUser({ password });
      signInPayload = {
        phone: user.phone,
        password,
      };
    });

    it('Should return HTTP 200 and user data', async () => {
      const response = await app.inject({ headers: { 'content-type': 'application/json' } })
        .post('/auth/signIn')
        .payload(signInPayload);

      assert.strictEqual(response.statusCode, 200);
      assert.strictEqual(response.json().firstName, user.firstName);
      assert.strictEqual(response.json().lastName, user.lastName);
      assert.strictEqual(response.json().email, user.email);
      assert.strictEqual(response.json().phone, user.phone);
      assert.strictEqual(response.json().password, null);
    });

    it('Should set access and refresh token to cookie', async () => {
      const response = await app.inject({ headers: { 'content-type': 'application/json' } })
        .post('/auth/signIn')
        .payload(signInPayload);

      assert.match(response.headers['set-cookie'][0], /^Authentication=/);
      assert.match(response.headers['set-cookie'][1], /^Refresh=/);
    });

    it('Should return error if invalid password', async () => {
      signInPayload.password = faker.string();
      const response = await app.inject({ headers: { 'content-type': 'application/json' } })
        .post('/auth/signIn')
        .payload(signInPayload);

      assert.strictEqual(response.json().message, 'Invalid password');
      assert.strictEqual(response.headers['set-cookie'], undefined);
    });

    it('Should return error if no such user exists', async () => {
      signInPayload.phone = faker.mobilePhone();
      const response = await app.inject({ headers: { 'content-type': 'application/json' } })
        .post('/auth/signIn')
        .payload(signInPayload);

      assert.strictEqual(response.json().message, 'User not found');
      assert.strictEqual(response.headers['set-cookie'], undefined);
    });
  });
});
