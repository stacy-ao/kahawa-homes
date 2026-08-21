import { createStripePaymentIntent, initiateMpesaStkPush } from '@/lib/payments.server';

export async function processPayment(payload: { method: 'stripe' | 'mpesa'; amount: number; phone?: string; bookingId: string; name: string }) {
  if (payload.method === 'mpesa') {
    return await initiateMpesaStkPush({
      phone: payload.phone || '',
      amount: payload.amount,
      reference: payload.bookingId,
    });
  }

  return await createStripePaymentIntent({
    amount: payload.amount,
    currency: 'kes',
    bookingId: payload.bookingId,
    customerName: payload.name,
  });
}
