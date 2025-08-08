import { Authenticator } from "../../interfaces/authenticator";
import { AuthFactory } from "../../interfaces/authFactory";
import { TokenManager } from "../../interfaces/tokenManager";
import { SAMLAuthentication } from "./SAMLAuthenticator";
import { SAMLTokenManger } from "./SAMLTokenManager";

export class SAMLFactory implements AuthFactory {
  createAuthenticator(): Authenticator {
    return new SAMLAuthentication();
  }
  createTokenManager(): TokenManager {
    return new SAMLTokenManger();
  }
}
