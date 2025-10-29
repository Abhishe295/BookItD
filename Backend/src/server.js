import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './lib/db.js';
// import Experience from './models/Experience';
import cors from 'cors'
import experienceRouter from './routes/experiences.js';
import bookingRouter from './routes/booking.js';
import promoRouter from './routes/promo.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

const allowedOrigins = [
  'http://localhost:3000',
  'https://book-it-d.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use('/experiences', experienceRouter);
app.use('/bookings', bookingRouter);
app.use('/promo', promoRouter);

app.get('/', (req, res) => res.send({ ok: true, message: 'BookIt API' }));

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect DB', err);
    process.exit(1);
  });
