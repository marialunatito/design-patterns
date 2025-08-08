import { TokenManager } from "../../interfaces/tokenManager";

export class SAMLTokenManger implements TokenManager {
  generateToken(payload: any): string {
    console.log("🔐 SAML: Issuing SAML token...");
    return `saml-token-${payload.user}`;
  }
  validateToken(token: string): boolean {
    console.log("🔐 SAML: Checking token signature...");
    return token.startsWith("saml-token-");
  }
}
