import type { Request, Response } from 'express';
import { Router } from 'express';
import type { NonSensitivePatient } from '../types.ts';
import { patients } from '../../data/patients.ts';
import { addPatient } from '../services/patients.ts';
import { parseNewPatientEntry } from '../utils.ts';

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

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatientParsed = parseNewPatientEntry(req.body);
    const newPatient = addPatient(newPatientParsed);

    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
