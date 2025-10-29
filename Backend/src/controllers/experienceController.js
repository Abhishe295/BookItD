import Experience from '../models/Experience.js'; // use import + .js extension

export async function listExperiences(req, res) {
  try {
    const exps = await Experience.find({}, '-timeSlots'); // omit timeSlots
    res.json({ ok: true, data: exps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
}

export async function getExperienceById(req, res) {
  try {
    const id = req.params.id;
    const exp = await Experience.findById(id);
    if (!exp) return res.status(404).json({ ok: false, error: 'Experience not found' });
    res.json({ ok: true, data: exp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
}