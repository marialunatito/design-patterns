import { AuthFactory } from "./interfaces/authFactory";
import { OAuthFactory } from "./product/oauth/OAuthFactory";
import { SAMLFactory } from "./product/saml/SAMLFactory";

function run(factory: AuthFactory, credentials: any, payload: any) {
  const auth = factory.createAuthenticator();
  const tokenManager = factory.createTokenManager();

  const isAuthenticated = auth.authenticate(credentials);
  console.log("Authenticated?", isAuthenticated);

  if (isAuthenticated) {
    const token = tokenManager.generateToken(payload);
    console.log("Generated token:", token);
    console.log("Valid token?", tokenManager.validateToken(token));
  }
}

console.log("\n--- OAuth Flow ---");
run(new OAuthFactory(), { client_id: "valid-client" }, { user: "Maria" });

console.log("\n--- SAML Flow ---");
run(new SAMLFactory(), { assertion: "valid-assertion" }, { user: "Maria" });
