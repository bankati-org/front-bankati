import {Status} from "../enum/status";
import {Role} from "../enum/role";

export interface UserResponse {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cin: string; // National ID
  status: Status; // Use the Status enum
  role: Role; // Use the Role enum
  createdAt: string; // Use string for ISO date representation
}
