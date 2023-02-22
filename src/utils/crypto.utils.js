import crypto from 'node:crypto';
import { promisify } from 'util';

const scrypt = promisify(crypto.scrypt);

/**
 * @param password
 * @returns {Promise<string>}
 */
export async function generateHashForPassword(password) {
  const salt = crypto.randomBytes(16).toString('base64');
  const result = await scrypt(password, salt, 64);

  return salt + ':' + result.toString('base64');
}

/**
 * @param password
 * @param hash
 * @returns {Promise<boolean>}
 */
export async function comparePasswords(password, hash) {
  const [salt, key] = hash.split(':');
  const keyBuffer = Buffer.from(key, 'base64');
  const derivedKey = await scrypt(password, salt, 64);

  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}
