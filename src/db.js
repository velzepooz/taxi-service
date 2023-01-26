/**
 * @typedef {import('metasql').DatabaseConfig} DatabaseConfig
 * @typedef {import('metasql').Database} Database
 */
import metasql from 'metasql';

/**
 * @param {DatabaseConfig} config
 * @returns {Database}
 */
export const initDbQueryBuilder = (config) => new metasql.Database(config);
