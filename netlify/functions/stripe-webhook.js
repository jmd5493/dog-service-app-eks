const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event) {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // Set this in Netlify env vars
    );
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Handle the event
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    // TODO: Notify trainer, update DB, send email, etc.
  }
  if (stripeEvent.type === 'checkout.session.expired') {
    // TODO: Handle canceled/expired payment
  }

  return { statusCode: 200, body: 'Received' };
};
