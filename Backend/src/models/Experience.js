import mongoose from "mongoose";

const TimeSlotSchema = new mongoose.Schema({
  date: { type: String, required: true }, // ISO date string or readable date
  time: { type: String, required: true }, // e.g. "10:00 AM - 12:00 PM"
  price: { type: Number, required: true, default: 0 },
  available: { type: Number, required: true, default: 0 } // remaining seats
}, { _id: true });

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, default: '' },
  longDescription: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  location: { type: String, default: '' },
  timeSlots: [TimeSlotSchema],
  createdAt: { type: Date, default: Date.now }
});

const Experience = mongoose.model('Experience', ExperienceSchema);
export default Experience;
