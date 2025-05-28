import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_...');

const app = express();
app.use(cors());
app.use(express.json());

const USERS = [
  { username: 'trainer', passwordHash: bcrypt.hashSync('canine123', 10) } // hardcoded for now
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
      success_url: 'https://primalcanine.netlify.app/success',
      cancel_url: 'https://primalcanine.netlify.app/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('❌ Stripe Checkout Error:', err); // 👈 full error log
    res.status(500).json({ error: err.message });
  }
});

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend build
app.use(express.static(path.join(__dirname, '../dist')));

// React Router fallback (for SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = 4242;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
