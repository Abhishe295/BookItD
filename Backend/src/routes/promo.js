import express from 'express';
import { body } from 'express-validator';
import { validatePromo } from '../controllers/promoController.js';
const promoRouter = express.Router();


promoRouter.post('/validate', [ body('code').notEmpty() ], validatePromo);

export default promoRouter;
