import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { z } from 'zod';
import { getNonSensitivePatients, getPatientById, addPatient } from '../services/patients.ts';
import {
  NewPatientSchema,
  type NonSensitivePatient,
  type NewPatient,
  type Patient,
} from '../types.ts';

const router = Router();

router.get('/', (_req: Request, res: Response<NonSensitivePatient[]>) => {
  res.send(getNonSensitivePatients());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<Patient | { error: string }>) => {
  const { id } = req.params;
  const patient = getPatientById(id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

function newPatientParser(req: Request, _res: Response, next: NextFunction) {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
}

function errorMiddleware(error: unknown, _req: Request, res: Response, next: NextFunction) {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
}

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = addPatient(req.body);

    res.json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
