import {validationResult} from 'express-validator'
import Promo from '../models/Promo.js';

export async function validatePromo(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });

  const { code } = req.body;
  try {
    const promo = await Promo.findOne({ code: code.toUpperCase() });
    if (!promo) return res.status(404).json({ ok: false, valid: false, message: 'Invalid promo' });

    if (promo.expiresAt && promo.expiresAt < new Date()) {
      return res.status(400).json({ ok: false, valid: false, message: 'Promo expired' });
    }

    return res.json({
      ok: true,
      valid: true,
      data: {
        code: promo.code,
        type: promo.type,
        value: promo.value
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
}


