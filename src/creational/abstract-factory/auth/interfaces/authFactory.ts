import { Authenticator } from "./authenticator";
import { TokenManager } from "./tokenManager";

export interface AuthFactory {
  createAuthenticator(): Authenticator;
  createTokenManager(): TokenManager;
}
