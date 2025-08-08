import { AuthFactory } from "../../interfaces/authFactory";
import { Authenticator } from "../../interfaces/authenticator";
import { TokenManager } from "../../interfaces/tokenManager";

import { OAuthAuthenticator } from "./OAuthAuthenticator";
import { OAuthTokenManager } from "./OAuthTokenManager";

export class OAuthFactory implements AuthFactory {
  createAuthenticator(): Authenticator {
    return new OAuthAuthenticator();
  }

  createTokenManager(): TokenManager {
    return new OAuthTokenManager();
  }
}
