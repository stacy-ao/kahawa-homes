export type UserRole = 'guest' | 'host' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt?: number;
}

export interface UserProfile {
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  notificationsEnabled?: boolean;
}
