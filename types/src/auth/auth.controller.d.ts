export function initAuthController(authService: AuthService): FastifyRoute[];
export type SignUpDto = import('./dto/sign-up.dto').SignUpDto;
export type SignInDto = import('./dto/sign-in.dto').SignInDto;
export type FastifyRoute = import('fastify').RouteOptions;
export type AuthService = import('./auth.service').AuthService;
