import mongoose from "mongoose";

const PromoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['percent', 'flat'], required: true },
  value: { type: Number, required: true }, // percent (10) or flat (100)
  expiresAt: { type: Date, default: null },
  usageLimit: { type: Number, default: null }, // future extension
});

const Promo = mongoose.model('Promo', PromoSchema);
export default Promo;
