import { Button, Divider, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import PatientDetailPage from './components/PatientDetailPage';
import PatientListPage from './components/PatientListPage';
import { patientsApiBaseUrl } from './constants';
import patientService from './services/patients';
import { Patient } from './types';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(patientsApiBaseUrl);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      console.log('Fetched patients:', patients);
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route
              path="/"
              element={<PatientListPage patients={patients} setPatients={setPatients} />}
            />
            <Route path="/patients/:id" element={<PatientDetailPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
