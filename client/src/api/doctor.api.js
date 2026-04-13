import API from "../services/axios";

const updateDoctor = (id, data) => {
  return API.patch(`/doctors/updateDoctor/${id}`, data);
};

export { updateDoctor };
