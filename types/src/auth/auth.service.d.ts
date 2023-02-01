import {User, UserRepository} from "./user.repository";
import { JwtService } from "./jwt.service";
import {SignUpDto} from "./dto/sign-up.dto";
import {SignInDto} from "./dto/sign-in.dto";

export type Deps = {
  userRepository: UserRepository;
  jwtService: JwtService;
};

export type JwtConfig = {
  accessTokenSecret: string;
  accessTokenExpireTime: string;
  refreshTokenSecret: string;
  refreshTokenExpireTime: string;
};

export type SignInResult = {
  user: User;
  accessCookie: string;
  refreshCookie: string;
};

export type SignUpUser = (payload: SignUpDto) => Promise<any>;
export type SignInUser = (payload: SignInDto) => Promise<SignInResult>;
export type RefreshAccessToken = (user: User) => Promise<string>;
export type AuthService = {
  signUpUser: SignUpUser;
  signInUser: SignInUser;
  refreshAccessToken: RefreshAccessToken;
};