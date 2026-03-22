import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./components/AuthScreens/LoginScreen.jsx";
import RegisterScreen from "./components/AuthScreens/RegisterScreen.jsx";
import Layout from "./components/Layout/Layout.jsx";
import AddPatientForm from "./components/DoctorsComponents/Patients/AddPatientForm.jsx";
import PatientDetailScreen from "./components/DoctorsComponents/Patients/PatientDetailScreen.jsx";
import AddFollowUp from "./components/DoctorsComponents/Patients/AddFollowUpForm.jsx";
import FollowUpHistory from "./components/DoctorsComponents/Patients/FollowUpHistory.jsx";
import { useAuth } from "./context/AuthContext";
import { AnimatePresence } from "framer-motion";
import NotificationList from "./components/Chat/NotificationList.jsx";
import ChatRoom from "./components/Chat/ChatRoom.jsx";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

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
        <Route path="/patients/notifications" element={<NotificationList />} />
        <Route path="/patients/chat" element={<ChatRoom />} />
        {/* <Route path="/patients/:id/chat" element={<ChatRoom />} /> */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
