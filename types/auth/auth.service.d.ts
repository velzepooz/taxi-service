export function signUpUser(deps: Deps, payload: SignUpDto): Promise<void>;
export function signInUser(deps: Deps, payload: SignInDto): Promise<SignInResult>;
export function initAuthService(deps: Deps): AuthService;
export type Database = import('metasql').Database;
export type SignUpDto = import('./dto/sign-up.dto').SignUpDto;
export type SignInDto = import('./dto/sign-in.dto').SignInDto;
export type UserDto = import('./dto/user.dto').UserDto;
export type Config = import('../config').Config;
export type UserRepository = import('./user.repository').UserRepository;
export type JwtService = import('./jwt.service').JwtService;
export type Deps = {
    userRepository: UserRepository;
    jwtService: JwtService;
    config: Config;
};
export type SignInResult = {
    user: UserDto;
    accessCookie: string;
    refreshCookie: string;
};
export type SignUpUser = (payload: SignUpDto) => any;
export type SignInUser = (payload: SignInDto) => Promise<SignInResult>;
export type AuthService = {
    signUpUser: SignUpUser;
    signInUser: SignInUser;
};
