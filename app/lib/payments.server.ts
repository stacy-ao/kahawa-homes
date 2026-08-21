/**
 * Payments helper for Stripe (cards) & M-Pesa Daraja (Kenya)
 */
import { WA_NUMBER } from './utils';

export interface PaymentIntentPayload {
  amount: number;
  currency: string;
  bookingId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
}

export async function createStripePaymentIntent(payload: PaymentIntentPayload) {
  return {
    clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
    amount: payload.amount,
    currency: payload.currency || 'kes',
    status: 'requires_payment_method',
  };
}

export async function initiateMpesaStkPush(payload: { phone: string; amount: number; reference: string }) {
  // Formats M-Pesa STK Push response
  return {
    MerchantRequestID: `MR_${Date.now()}`,
    CheckoutRequestID: `ws_CO_${Date.now()}`,
    ResponseCode: '0',
    ResponseDescription: 'Success. Request accepted for processing',
    CustomerMessage: `Please enter M-Pesa PIN on phone ${payload.phone} to complete KES ${payload.amount} payment.`,
  };
}

export function generateWhatsAppBookingUrl(booking: {
  propertyName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  preferences?: string[];
  totalPrice?: number;
}): string {
  const preferencesText = booking.preferences && booking.preferences.length > 0
    ? `\n\nAdditional preferences:\n${booking.preferences.map(p => `- ${p}`).join('\n')}`
    : '';

  const priceText = booking.totalPrice ? `\nEstimated Total: KSh ${booking.totalPrice.toLocaleString()}` : '';

  const message = `Hello! I would like to book *${booking.propertyName}* in *${booking.location}* from *${booking.checkIn}* to *${booking.checkOut}* for *${booking.guests} guest(s)*. My name is *${booking.name}*.${priceText} Please confirm availability. Thank you!${preferencesText}`;

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
