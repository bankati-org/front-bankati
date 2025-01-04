export interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; // Match the Spring Boot field name
  password: string;
  cin: string; // Add this field to match the Spring Boot DTO
}
