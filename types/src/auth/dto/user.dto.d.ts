export type UserDto = {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    firstName: string;
    lastName: string;
    email: string;
    password: string | null;
    phone: string;
    dateOfBirth: Date;
    refreshToken?: string | null | undefined;
};