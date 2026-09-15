import axios from 'axios';

import { patientsApiBaseUrl } from '../constants';
import { Patient, PatientFormValues } from '../types';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(patientsApiBaseUrl);

  return data;
};

const getOnePatient = async (id: string) => {
  const { data } = await axios<Patient>(`${patientsApiBaseUrl}/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(patientsApiBaseUrl, object);

  return data;
};

export default {
  getAll,
  getOnePatient,
  create,
};
