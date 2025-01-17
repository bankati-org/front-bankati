export interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; // Match the Spring Boot field name
  password: string;
  cin: string; // Add this field to match the Spring Boot DTO
}

export interface UserAgentRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cin: string;
}

export interface UserAdminRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cin: string;
}

export interface AgentAdminRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cin: string;
}