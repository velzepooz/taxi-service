/** @type {import('../../types/src/auth/auth.service').JwtConfig} */
export const jwtConfig = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
  accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRE_TIME || '15m',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
  refreshTokenExpireTime: process.env.REFRESH_TOKEN_EXPIRE_TIME || '1d',
};
