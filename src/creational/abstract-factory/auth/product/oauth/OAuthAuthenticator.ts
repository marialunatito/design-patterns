import { Authenticator } from "../../interfaces/authenticator";

export class OAuthAuthenticator implements Authenticator {
  authenticate(credentials: any): boolean {
    console.log("🔐 OAuth: Authenticating with client_id and secret...");
    return credentials.client_id === "valid-client";
  }
}
