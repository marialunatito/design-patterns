import { TokenManager } from "../../interfaces/tokenManager";

export class OAuthTokenManager implements TokenManager {
  generateToken(payload: any): string {
    console.log("🔐 OAuth: Generating token...");
    return `oauth-token-${payload.user}`;
  }

  validateToken(token: string): boolean {
    console.log("🔐 OAuth: Validating token...");
    return token.startsWith("oauth-token-");
  }
}
