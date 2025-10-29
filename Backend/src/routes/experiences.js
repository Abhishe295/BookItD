import express from 'express';
import { Router } from 'express';
import { getExperienceById, listExperiences } from '../controllers/experienceController.js';

const experienceRouter = express.Router();

// GET /experiences
experienceRouter.get('/', listExperiences);

// GET /experiences/:id
experienceRouter.get('/:id', getExperienceById);

export default experienceRouter;
