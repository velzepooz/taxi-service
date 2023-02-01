export type UserDto = {
    id: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    firstName: string;
    lastName: string;
    email: string;
    password: string | null;
    phone: string;
    dateOfBirth: Date;
    refreshToken?: string | null | undefined;
};