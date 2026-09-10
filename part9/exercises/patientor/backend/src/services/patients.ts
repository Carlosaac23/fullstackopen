import { v1 as uuid } from 'uuid';
import type { NewPatient } from '../types.ts';
import { patients } from '../../data/patients.ts';

export function addPatient(patient: NewPatient): NewPatient {
  const addedPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(addedPatient);
  return addedPatient;
}
