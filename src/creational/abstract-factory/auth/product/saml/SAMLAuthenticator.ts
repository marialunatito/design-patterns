import { Authenticator } from "../../interfaces/authenticator";

export class SAMLAuthentication implements Authenticator {
  authenticate(credentials: any): boolean {
    console.log("🔐 SAML: Validating SAML assertion");
    return credentials.assertion === "valid-assertion";
  }
}
