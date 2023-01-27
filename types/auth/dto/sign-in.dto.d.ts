/**
 * @typedef {object} SignInDto
 * @property {string} password
 * @property {string} phone
 */
export const signInDto: {
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
export type SignInDto = {
    password: string;
    phone: string;
};
