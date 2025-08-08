export interface TokenManager {
  generateToken(payload: any): string;
  validateToken(token: string): boolean;
}
