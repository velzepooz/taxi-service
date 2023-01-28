/**
 * @param password
 * @returns {Promise<string>}
 */
export function generateHashForPassword(password: any): Promise<string>;
/**
 * @param password
 * @param hash
 * @returns {Promise<boolean>}
 */
export function comparePasswords(password: any, hash: any): Promise<boolean>;
