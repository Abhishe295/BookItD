import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  experience: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
  timeSlotId: { type: mongoose.Schema.Types.ObjectId, required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  promoCode: { type: String },
  pricePaid: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;
