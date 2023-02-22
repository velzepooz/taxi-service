import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

/**
 * @param {Date | string} date
 * @returns {string}
 */
export const getDateByUTCISOString = (date = new Date()) => dayjs.utc(date).toISOString();

/**
 * @param date
 * @return {Date}
 */
export const getStartOfDay = (date = new Date()) => dayjs(date).startOf('days').toDate();
