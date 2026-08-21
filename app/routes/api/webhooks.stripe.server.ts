export async function handleStripeWebhook(event: { type: string; data: { object: any } }) {
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    return { received: true, status: 'confirmed', paymentIntentId: paymentIntent.id };
  }
  return { received: true };
}
