import type { User, UserRole } from '@/types/user';

export const mockCurrentUser: User = {
  id: 'usr_guest_01',
  name: 'Nelly Arunga',
  email: 'arunganelly@gmail.com',
  phone: '+254795526788',
  role: 'host',
  avatar: '',
  createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
};

export async function getUserSession(): Promise<User | null> {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('kahawa-user-session') : null;
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

export async function requireUser(role?: UserRole): Promise<User> {
  const user = await getUserSession() || mockCurrentUser;
  if (role && user.role !== role && user.role !== 'admin') {
    throw new Error(`Unauthorized: Requires ${role} role`);
  }
  return user;
}
