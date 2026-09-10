import { type NewPatient, Gender } from './types.ts';

export function parseNewPatientEntry(object: unknown): NewPatient {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'ssn' in object &&
    'dateOfBirth' in object &&
    'occupation' in object &&
    'gender' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      ssn: parseSsn(object.ssn),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
}

function isString(str: unknown): str is string {
  return typeof str === 'string' || str instanceof String;
}

function parseName(name: unknown): string {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
}

function parseSsn(ssn: unknown): string {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function parseDate(date: unknown): string {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
}

function parseOccupation(occupation: unknown): string {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
}

function isGender(gender: string): gender is Gender {
  return (Object.values(Gender) as string[]).includes(gender);
}

function parseGender(gender: unknown): Gender {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
}
