/**
 * @typedef {object} SignUpDto
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} password
 * @property {string} phone
 * @property {Date} dateOfBirth
 */
export const signUpDto: {
    additionalProperties: boolean;
    type: string;
    properties: {
        id: {
            type: string;
        };
        createdAt: {
            type: string;
            format: string;
        };
        updatedAt: {
            type: string;
            format: string;
        };
        firstName: {
            type: string;
        };
        lastName: {
            type: string;
        };
        email: {
            type: string;
            format: string;
        };
        phone: {
            type: string;
            minLength: number;
            maxLength: number;
        };
        password: {
            type: string;
            minLength: number;
            maxLength: number;
        };
        dateOfBirth: {
            type: string;
            format: string;
        };
        refreshToken: {
            type: string;
        };
    };
    required: string[];
};
export type SignUpDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: Date;
};