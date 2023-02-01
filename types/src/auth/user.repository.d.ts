import { Database } from 'metasql';
import { SignUpDto } from './dto/sign-up.dto';

export type Deps = {
  queryBuilder: Database;
};

export type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  phone: string;
  dateOfBirth: Date;
  refreshToken?: string | null;
}

export type UserToCreate = SignUpDto;

export type UserToUpdate = {
  id?: number | null | undefined;
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
  id?: number | null | undefined;
  email?: string | null | undefined;
  password?: string | null | undefined;
  phone?: string | null | undefined;
};

export type CreateUser = (userToCreate: UserToCreate) => Promise<void>;
export type FindOne = (conditions: FindOneCondition) => Promise<User>;
export type UpdateOne = (conditions: FindOneCondition, updateData: UserToUpdate) => Promise<void>;

export interface UserRepository {
  createUser: CreateUser;
  findOne: FindOne;
  updateOne: UpdateOne;
}