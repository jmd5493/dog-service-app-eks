const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_...'); 

const app = express();
app.use(cors());
app.use(express.json());



app.post('/create-checkout-session', async (req, res) => {
    const { ownerName, dogName, trainingProgram, price } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${trainingProgram} for ${dogName} (Owner: ${ownerName})`,
            },
            unit_amount: Math.round(price * 100), // ensure it's an integer in cents
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      });
  
      res.json({ url: session.url });
    } catch (err) {
      console.error('❌ Stripe Checkout Error:', err); // 👈 full error log
      res.status(500).json({ error: err.message });
    }
  });
  

const PORT = 4242;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
