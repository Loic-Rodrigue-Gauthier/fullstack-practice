export interface AuthRequest {
  email: string;
  password: string;
}

export interface CurrentUser {
  id: number;
  email: string;
}
