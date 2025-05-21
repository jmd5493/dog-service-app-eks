require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event) {
  const { ownerName, dogName, trainingProgram, price } = JSON.parse(event.body);

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${trainingProgram} for ${dogName} (Owner: ${ownerName})`,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://primalcanine.netlify.app/success',
      cancel_url: 'https://primalcanine.netlify.app/cancel',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
