import express from 'express';
import { body } from 'express-validator';
import { createBooking } from '../controllers/bookingsController.js';

const bookingRouter = express.Router();

bookingRouter.post(
  '/',
  [
    body('experienceId').notEmpty(),
    body('timeSlotId').notEmpty(),
    body('user.name').isLength({ min: 1 }),
    body('user.email').isEmail()
  ],
  createBooking
);
// bookingRouter.get('/',getBookings);

export default bookingRouter;