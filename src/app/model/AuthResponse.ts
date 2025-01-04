import {UserResponse} from "./UserResponse";

export interface AuthResponse {
  token: string;
  userDTO: UserResponse;
  refreshToken: string;
  message: string;
}
