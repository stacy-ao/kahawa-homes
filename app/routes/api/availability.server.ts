import { db } from '@/lib/db.server';

export async function checkAvailability(propertyId: number | string, checkIn: string, checkOut: string) {
  const property = await db.property.findUnique({ where: { id: propertyId } });
  if (!property) return { available: false, error: 'Property not found' };

  const isBlocked = property.bookedDates?.some((date) => date >= checkIn && date < checkOut);
  return {
    available: !isBlocked,
    propertyId,
    checkIn,
    checkOut,
  };
}
