import API from "../services/axios.js";

// Every function resolves to ApiResponse: { statusCode, message, data }
// So in components: const data = await getMyAppointments() → data.data is the array

export const bookAppointment = ({ doctorId, date, time, reason }) =>
  API.post("/appointments", { doctorId, date, time, reason }).then(
    (res) => res.data,
  );

export const getMyAppointments = () =>
  API.get("/appointments/my").then((res) => res.data);

export const getDoctorAppointments = () =>
  API.get("/appointments/doctor/my").then((res) => res.data);

export const getAppointmentById = (id) =>
  API.get(`/appointments/${id}`).then((res) => res.data);

export const updateAppointmentStatus = (id, action) =>
  API.patch(`/appointments/${id}/update-status`, { action }).then(
    (res) => res.data,
  );

export const getAvailableSlots = (doctorId, date) =>
  API.get(`/appointments/doctor/${doctorId}/slots`, { params: { date } }).then(
    (res) => res.data,
  );
