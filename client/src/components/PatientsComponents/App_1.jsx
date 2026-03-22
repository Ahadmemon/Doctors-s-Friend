import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { GuestRoute, ProtectedRoute, ProfileRoute } from "./routes/Guards";

import LoginScreen        from "./auth/LoginScreen";
import RegisterScreen     from "./auth/RegisterScreen";
import CreateProfileScreen from "./profile/CreateProfileScreen";
import DashboardScreen    from "./dashboard/DashboardScreen";
import DoctorsList        from "./doctors/DoctorsList";
import ProfileScreen      from "./profile/ProfileScreen";
import ChatRoom           from "./chat/ChatRoom";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Public — redirect if already logged in */}
          <Route element={<GuestRoute />}>
            <Route path="/login"    element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
          </Route>

          {/* Requires user but no profile yet */}
          <Route element={<ProfileRoute />}>
            <Route path="/create-profile" element={<CreateProfileScreen />} />
          </Route>

          {/* Requires user + profile */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardScreen />}>
              <Route index           element={<DoctorsList />} />
              <Route path="profile"  element={<ProfileScreen />} />
            </Route>
            <Route path="/chat/:id" element={<ChatRoom />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
