import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { patientsApiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(patientsApiBaseUrl);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(patientsApiBaseUrl, object);

  return data;
};

export default {
  getAll,
  create,
};
