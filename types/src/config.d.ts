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
 * @typedef {object} JWT
 * @property {string} accessTokenSecret
 * @property {string} accessTokenExpireTime
 * @property {string} refreshTokenSecret
 * @property {string} refreshTokenExpireTime
 */
/**
 * @typedef {object} Config
 * @property {ServerConfig} server - config for http server
 * @property {DbConfig} db - config for db connection
 * @property {JWT} jwt - config for jwt tokens
 */
/** @type Config */
export const config: Config;
export type ServerConfig = {
    host: string;
    port: number;
};
export type DbConfig = {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
};
export type JWT = {
    accessTokenSecret: string;
    accessTokenExpireTime: string;
    refreshTokenSecret: string;
    refreshTokenExpireTime: string;
};
export type Config = {
    /**
     * - config for http server
     */
    server: ServerConfig;
    /**
     * - config for db connection
     */
    db: DbConfig;
    /**
     * - config for jwt tokens
     */
    jwt: JWT;
};
