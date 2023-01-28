export function initJwtService(): JwtService;
export type GenerateJwtToken = Function;
export type VerifyJwt = Function;
export type JwtService = {
    generateJwtToken: GenerateJwtToken;
    verifyJwt: VerifyJwt;
};
