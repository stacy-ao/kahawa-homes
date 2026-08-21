import { db } from '@/lib/db.server';
import type { Booking } from '@/types/booking';

export async function createBooking(data: Booking) {
  return await db.booking.create({ data });
}

export async function getBookings() {
  return await db.booking.findMany();
}
