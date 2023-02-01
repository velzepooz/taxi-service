import { User } from "../user.repository";

export type SignUpDto = Pick<User, 'firstName'|'lastName'|'email'|'password'|'phone'|'dateOfBirth'>;