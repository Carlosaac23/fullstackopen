import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Patient } from '../../types';

import patientService from '../../services/patients';

export default function PatientDetailPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPatient() {
      const patient = await patientService.getOnePatient(id as string);

      setPatient(patient);
    }

    fetchPatient();
  }, []);

  return (
    <div className="App">
      {patient && (
        <>
          <Typography variant="h6" display={'flex'} gap={1} alignItems={'center'}>
            {patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
          </Typography>
          <div>
            <Typography variant="subtitle1">ssn: {patient.ssn}</Typography>
            <Typography variant="subtitle1">occupation: {patient.occupation}</Typography>
            <Typography variant="subtitle1">date of birth: {patient.dateOfBirth}</Typography>
          </div>
        </>
      )}
    </div>
  );
}
