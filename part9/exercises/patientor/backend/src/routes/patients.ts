import type { Request, Response } from 'express';
import { Router } from 'express';
import type { NonSensitivePatient } from '../types.ts';
import { patients } from '../../data/patients.ts';

const router = Router();

router.get('/', (_req: Request, res: Response<NonSensitivePatient[]>) => {
  res.send(
    patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })),
  );
});

export default router;
