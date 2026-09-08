import type { Request, Response } from 'express';
import { Router } from 'express';
import type { Diagnosis } from '../types.ts';
import { diagnoses } from '../../data/diagnoses.ts';

const router = Router();

router.get('/', (_req: Request, res: Response<Diagnosis[]>) => {
  res.send(diagnoses);
});

export default router;
