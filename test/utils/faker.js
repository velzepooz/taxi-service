import Chance from 'chance';

export class Faker {
  constructor() {
    this._chance = new Chance();
  }

  email() {
    return this._chance.email();
  }

  uid() {
    return this._chance.guid();
  }

  string(length = 10) {
    return this._chance.string({ length });
  }

  firstName() {
    return this._chance.first();
  }

  lastName() {
    return this._chance.last();
  }

  mobilePhone() {
    return this._chance.phone({ formatted: false });
  }

  appleId() {
    return this._chance.apple_token();
  }

  integer({ min = 0, max = 100 }) {
    return this._chance.integer({ min, max });
  }

  country() {
    return this._chance.country({ full: true });
  }

  state() {
    return this._chance.state({ full: true });
  }

  city() {
    return this._chance.city();
  }

  hash(length = 20) {
    return this._chance.hash({ length });
  }

  url() {
    return this._chance.url();
  }
}

export const faker = new Faker();
