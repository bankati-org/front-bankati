export enum Status {
  REGISTERED = 'REGISTERED',                       // Initial registration, email confirmation link sent
  EMAIL_VERIFIED = 'EMAIL_VERIFIED',               // Email confirmed
  ACTIVE = 'ACTIVE',                               // Fully verified and active
  BLOCKED = 'BLOCKED'                             // Account blocked
}
