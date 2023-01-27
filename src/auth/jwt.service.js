import * as jose from 'jose';
/**
 * @typedef {Function} GenerateJwtToken
 * @property {object} data
 * @property {string} secret
 * @property {?string} expireTime
 * @returns {Promise<string>}
 */
/**
 * @typedef {Function} VerifyJwt
 * @property {string} jwtToken
 * @property {string} secret
 * @returns {Promise<any>}
 */
/**
 *
 * @typedef {object} JwtService
 * @property {GenerateJwtToken} generateJwtToken
 * @property {VerifyJwt} verifyJwt
 */

/** @type {GenerateJwtToken} */
const generateJwtToken = async ({ data, secret, expireTime = '1000h' }) => {
  const key = new TextEncoder().encode(
    secret,
  );

  return new jose.SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expireTime)
    .sign(key);
};

/** @type {VerifyJwt}  */
const verifyJwt = async (jwtToken, secret) => {
  const encodedSecret = new TextEncoder().encode(
    secret,
  );

  try {
    const { payload } = await jose.jwtVerify(jwtToken, encodedSecret);

    return payload;
  } catch (e) {
    console.error(e);

    return null;
  }

};

/**
 * @returns {JwtService}
 */
export const initJwtService = () => ({
  generateJwtToken,
  verifyJwt,
});
