import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    // Replace with your actual publishable key from settings
    stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY || '');
  }
  return stripePromise;
};

export const createSubscription = async (priceId: string) => {
  try {
    const stripe = await getStripe();
    if (!stripe) throw new Error('Stripe not initialized');

    // This would typically be handled by your backend
    // For demo purposes, we're just showing the flow
    const session = {
      id: 'demo_session',
      url: '#demo-subscription'
    };

    window.location.href = session.url;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

export const createPaymentIntent = async (amount: number) => {
  try {
    // This would be handled by your backend
    // For demo purposes, we're just showing the structure
    const paymentIntent = {
      client_secret: 'demo_secret'
    };
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};