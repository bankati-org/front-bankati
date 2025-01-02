export interface ApiResponse<T> {
  message: string;
  data: T; // This can be of any type
  status: string; // e.g., "success", "error"
  statusCode: number; // HTTP status code
  timestamp: string; // ISO string representation of LocalDateTime
}
