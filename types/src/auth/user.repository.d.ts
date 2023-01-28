export function createUser({ queryBuilder }: Deps, userToCreate: UserToCreate): Promise<void>;
export function findOne({ queryBuilder }: Deps, conditions: FindOneCondition): Promise<UserDto | null>;
export function updateOne({ queryBuilder }: Deps, conditions: FindOne, updateData: UserToUpdate): Promise<void>;
export function initUserRepository(deps: Deps): UserRepository;
export type Database = import('metasql').Database;
export type SignUpDto = import('./dto/sign-up.dto').SignUpDto;
export type UserDto = import('./dto/user.dto').UserDto;
export type Deps = {
    queryBuilder: Database;
};
export type UserToCreate = SignUpDto;
export type UserToUpdate = {
    id?: string | null | undefined;
    createdAt?: string | null | undefined;
    updatedAt?: string | null | undefined;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    phone?: string | null | undefined;
    dateOfBirth?: Date | null | undefined;
    refreshToken?: string | null | undefined;
};
export type FindOneCondition = {
    id?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    phone?: string | null | undefined;
};
export type CreateUser = (userToCreate: UserToCreate) => any;
export type FindOne = (conditions: FindOneCondition) => any;
export type UpdateOne = (conditions: FindOneCondition, updateData: UserToUpdate) => any;
export type UserRepository = {
    createUser: CreateUser;
    findOne: FindOne;
    updateOne: UpdateOne;
};
