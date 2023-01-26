/**
 * @typedef {object} ServerConfig
 * @property {string} host
 * @property {number} port
 */
/**
 * @typedef {object} DbConfig
 * @property {string} host
 * @property {number} port
 * @property {string} database
 * @property {string} user
 * @property {string} password
 */
/**
 * @typedef {object} Config
 * @property {ServerConfig} server - config for http server
 * @property {DbConfig} db - config for db connection
 */
/** @type Config */
export const config = {
  server: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT
      ? +process.env.PORT
      : 3000,
  },
  db: {
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port: process.env.POSTGRES_PORT
      ? +process.env.POSTGRES_PORT
      : 5432,
    database: process.env.POSTGRES_DATABASE_NAME || '',
    user: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
  },
};
