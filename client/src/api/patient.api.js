import API from "../services/axios";

const addPatient = (data) => {
  return API.post("/patients/addPatient", data);
};

const fetchPatients = (params = {}) => {
  return API.get("/patients/fetchPatients", { params });
};

const getPatientById = (id) => {
  return API.get(`/patients/updatePatient/${id}`);
};

const updatePatient = (id, data) => {
  return API.patch(`/patients/updatePatient/${id}`, data);
};

const deletePatient = (id) => {
  return API.delete(`/patients/deletePatient/${id}`);
};

const addFollowUp = (id, data) => {
  return API.post(`/followUp/addFollowUp/${id}`, data);
};

const getPatientFollowUps = (id) => {
  return API.get(`/followUp/fetchFollowUps/${id}`);
};
export {
  addPatient,
  fetchPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  addFollowUp,
  getPatientFollowUps,
};
