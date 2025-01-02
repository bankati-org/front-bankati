export enum Status {
  REGISTERED = 'REGISTERED',                       // Initial registration, email confirmation link sent
  EMAIL_VERIFIED = 'EMAIL_VERIFIED',               // Email confirmed
  PHONE_ID_VERIFIED = 'PHONE_ID_VERIFIED',         // Phone and ID verification initiated but not completed
  ACTIVE = 'ACTIVE',                               // Fully verified and active
  BLOCKED = 'BLOCKED'                             // Account blocked
}
