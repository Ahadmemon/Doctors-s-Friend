import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginScreen from "./components/AuthScreens/LoginScreen.jsx";
import RegisterScreen from "./components/AuthScreens/RegisterScreen.jsx";
import Layout from "./components/Layout/Layout.jsx";
import AddPatientForm from "./components/DoctorsComponents/Patients/AddPatientForm.jsx";
import PatientDetailScreen from "./components/DoctorsComponents/Patients/PatientDetailScreen.jsx";
import AddFollowUp from "./components/DoctorsComponents/Patients/AddFollowUpForm.jsx";
import FollowUpHistory from "./components/DoctorsComponents/Patients/FollowUpHistory.jsx";
import { useAuth } from "./context/AuthContext";
import { AnimatePresence } from "framer-motion";
import AppointmentListScreen from "./components/Appointments/AppointmentListScreen.jsx";
import DoctorAppointmentsScreen from "./components/Appointments/DoctorAppointmentsScreen.jsx";
import ProfileScreen from "./components/DoctorsComponents/ProfileScreen.jsx";
import ScheduleFollowUpScreen from "./components/DoctorsComponents/Patients/ScheduleFollowUp.jsx";

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const location = useLocation(); // ✅ Add this

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <ProfileScreen />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/add-patient"
          element={
            isAuthenticated ? (
              <AddPatientForm />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/patient/:id"
          element={
            isAuthenticated ? (
              <PatientDetailScreen />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/patients/:id/followups" element={<FollowUpHistory />} />
        <Route path="/patients/:id/followups/add" element={<AddFollowUp />} />
        <Route
          path="/patients/:id/followups/schedule"
          element={
            isAuthenticated ? (
              <ScheduleFollowUpScreen />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/appointments"
          element={
            isAuthenticated ? (
              <AppointmentListScreen />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/patients/appointments"
          element={
            isAuthenticated ? (
              <DoctorAppointmentsScreen />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
