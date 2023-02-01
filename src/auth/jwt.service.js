/**
 * @typedef {import('../../types/src/auth/jwt.service').JwtService} JwtService
 * @typedef {import('../../types/src/auth/jwt.service').GenerateJwtToken} GenerateJwtToken
 * @typedef {import('../../types/src/auth/jwt.service').VerifyJwtToken} VerifyJwtToken
 */
import * as jose from 'jose';

/** @type {GenerateJwtToken} */
const generateJwtToken = async ({ payload, secret, expireTime = '1000h' }) => {
  const key = new TextEncoder().encode(
    secret,
  );

  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expireTime)
    .sign(key);
};

/** @type {VerifyJwtToken} */
const verifyJwt = async (jwtToken, secret) => {
  const encodedSecret = new TextEncoder().encode(
    secret,
  );

  return jose.jwtVerify(jwtToken, encodedSecret)
    .then(({ payload }) => payload)
    .catch(console.error);
};

/**
 * @returns {JwtService}
 */
export const initJwtService = () => ({
  generateJwtToken,
  verifyJwt,
});
