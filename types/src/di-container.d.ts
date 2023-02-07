import {JwtService} from "./auth/jwt.service";
import {Database} from "metasql";
import {UserRepository} from "./auth/user.repository";
import {AuthService} from "./auth/auth.service";

export type DiContainer = {
  queryBuilder: Database;
  jwtService: JwtService;
  userRepository: UserRepository;
  authService: AuthService;
};