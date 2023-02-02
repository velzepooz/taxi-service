import { User, UserRepository } from './user.repository';
import { JwtService } from './jwt.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

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

export type JwtTokenPayload = {
  id: number;
};

export type SignUpUser = (payload: SignUpDto) => Promise<any>;
export type SignInUser = (payload: SignInDto) => Promise<SignInResult>;
export type RefreshAccessToken = (userId: User['id']) => Promise<string>;
export type SignOut = (userId: User['id']) => Promise<void>;
export type AuthService = {
  signUpUser: SignUpUser;
  signInUser: SignInUser;
  refreshAccessToken: RefreshAccessToken;
  signOut: SignOut;
};