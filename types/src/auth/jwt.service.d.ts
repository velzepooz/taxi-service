import {JWTPayload} from "jose";

export type GenerateTokenData = {
  payload:  any;
  secret: string;
  expireTime?: string;
};
export type GenerateJwtToken = (data: GenerateTokenData) => Promise<string>;
export type VerifyJwtToken = <T>(jwtToken: string, encodedSecret: string) => Promise<JWTPayload | void | T>;

export interface JwtService {
  generateJwtToken: GenerateJwtToken;
  verifyJwt: VerifyJwtToken;
}