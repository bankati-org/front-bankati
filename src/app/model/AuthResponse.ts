import {UserResponse} from "./UserResponse";

export interface AuthResponse {
  token: string;
  userResponseDto: UserResponse;
  refreshToken: string;
  message: string;
}
