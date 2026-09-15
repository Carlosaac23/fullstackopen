import { v1 as uuid } from 'uuid';
import type { NewPatient, Patient } from '../types.ts';
import { patients } from '../../data/patients.ts';

export function getNonSensitivePatients() {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}

export function getPatientById(id: string): Patient | undefined {
  return patients.find(patient => patient.id === id);
}

export function addPatient(patient: NewPatient): Patient {
  const addedPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(addedPatient);
  return addedPatient;
}
