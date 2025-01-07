import {Role} from "../enum/role";
import {Status} from "../enum/status";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cin: string; // National ID
  password: string;
  address: string;
  id_agent: string;
  role: Role; // CLIENT, AGENT, ADMIN
  status: Status;
  createdAt: string; // or Date if you prefer
  updatedAt: string; // or Date if you prefer
  createdByAgent: boolean;
  passwordSet: boolean;
  createdByAdmin: boolean;
}
