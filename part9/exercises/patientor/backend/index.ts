import express from 'express';
import diagnosesRouter from './src/routes/diagnoses.ts';
import patientsRouter from './src/routes/patients.ts';

const app = express();

app.use(express.json());

const PORT = 4000;

app.get('/api/pong', (_req, res) => {
  res.send('Hello, World!');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
