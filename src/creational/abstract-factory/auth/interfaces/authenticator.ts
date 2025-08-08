export interface Authenticator {
  authenticate(credentials: string): boolean;
}
