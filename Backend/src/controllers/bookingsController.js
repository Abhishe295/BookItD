import { validationResult } from 'express-validator';
import Experience from '../models/Experience.js';
import Booking from '../models/Booking.js';
import Promo from '../models/Promo.js';

export async function createBooking(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });

  const { experienceId, timeSlotId, user, promoCode } = req.body;

  try {
    // 1) Decrement available atomically
    const query = { _id: experienceId, 'timeSlots._id': timeSlotId, 'timeSlots.available': { $gt: 0 } };
    const update = { $inc: { 'timeSlots.$.available': -1 } };

    const updated = await Experience.findOneAndUpdate(query, update, { new: true });

    if (!updated) {
      return res.status(409).json({ ok: false, message: 'Selected slot is sold out or not found' });
    }

    // find the slot to compute price
    const slot = updated.timeSlots.find(s => String(s._id) === String(timeSlotId));
    if (!slot) {
      // should not happen, but if so rollback
      await Experience.updateOne({ _id: experienceId, 'timeSlots._id': timeSlotId }, { $inc: { 'timeSlots.$.available': 1 } });
      return res.status(400).json({ ok: false, message: 'Slot not found' });
    }

    let price = slot.price ?? 0;

    // apply promo if provided
    let appliedPromo = null;
    if (promoCode) {
      const promo = await Promo.findOne({ code: promoCode.toUpperCase() });
      if (promo && (!promo.expiresAt || promo.expiresAt > new Date())) {
        appliedPromo = promo;
        if (promo.type === 'percent') {
          price = price - (price * promo.value) / 100;
        } else if (promo.type === 'flat') {
          price = Math.max(0, price - promo.value);
        }
      }
      // if invalid promo, we don't fail booking; we simply ignore promo (or you can choose to fail)
    }

    // 2) Create booking
    const booking = new Booking({
      experience: experienceId,
      timeSlotId,
      user: {
        name: user.name,
        email: user.email
      },
      promoCode: appliedPromo ? appliedPromo.code : null,
      pricePaid: price
    });

    const saved = await booking.save();

    // 3) Return booking confirmation
    // Populate experience for richer frontend rendering
const populated = await Booking.findById(saved._id).populate('experience');

res.status(201).json({ ok: true, data: [populated] }); // ✅ return as array
  } catch (err) {
    console.error('Booking error', err);
    // Try rollback: increment available back if possible
    try {
      if (experienceId && timeSlotId) {
        await Experience.updateOne({ _id: experienceId, 'timeSlots._id': timeSlotId }, { $inc: { 'timeSlots.$.available': 1 } });
      }
    } catch (e) {
      console.error('Rollback failed', e);
    }
    res.status(500).json({ ok: false, error: 'Server error' });
  }
}
