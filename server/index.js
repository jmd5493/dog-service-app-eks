const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_...'); 

const app = express();
app.use(cors());
app.use(express.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const USERS = [
  { username: 'trainer', passwordHash: bcrypt.hashSync('password123', 10) } // hardcoded for now
];

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret123';

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid username or password' });

  const match = bcrypt.compareSync(password, user.passwordHash);
  if (!match) return res.status(401).json({ error: 'Invalid username or password' });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Protect create-checkout-session
app.post('/create-checkout-session', authenticateToken, async (req, res) => {
  // your stripe logic here
});




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
