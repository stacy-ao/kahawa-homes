import { db } from '@/lib/db.server';

export async function getProperties() {
  return await db.property.findMany();
}

export async function getPropertyById(id: number | string) {
  return await db.property.findUnique({ where: { id } });
}
