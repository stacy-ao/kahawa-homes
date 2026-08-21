/**
 * Database client helper for Prisma / Supabase
 */
import { fallbackProperties } from './utils';
import type { Property } from '@/types/property';
import type { Booking } from '@/types/booking';

// Mock in-memory store for client/SSR hybrid runs
let inMemoryProperties: Property[] = [...fallbackProperties];
let inMemoryBookings: Booking[] = [];

export const db = {
  property: {
    findMany: async () => inMemoryProperties,
    findUnique: async ({ where }: { where: { id: number | string } }) => {
      return inMemoryProperties.find(p => String(p.id) === String(where.id)) || null;
    },
    create: async ({ data }: { data: Property }) => {
      inMemoryProperties.push(data);
      return data;
    },
    update: async ({ where, data }: { where: { id: number | string }; data: Partial<Property> }) => {
      const index = inMemoryProperties.findIndex(p => String(p.id) === String(where.id));
      if (index !== -1) {
        inMemoryProperties[index] = { ...inMemoryProperties[index], ...data };
        return inMemoryProperties[index];
      }
      return null;
    },
    delete: async ({ where }: { where: { id: number | string } }) => {
      inMemoryProperties = inMemoryProperties.filter(p => String(p.id) !== String(where.id));
      return true;
    },
  },
  booking: {
    findMany: async () => inMemoryBookings,
    create: async ({ data }: { data: Booking }) => {
      inMemoryBookings.push(data);
      return data;
    },
    findUnique: async ({ where }: { where: { id: string } }) => {
      return inMemoryBookings.find(b => b.id === where.id) || null;
    },
  },
};
