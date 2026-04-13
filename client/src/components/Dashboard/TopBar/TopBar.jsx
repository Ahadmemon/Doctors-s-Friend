import { LogOut, User, Calendar } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const goToAppointments = () => {
    navigate("/patients/appointments"); // adjust if your route is different
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold">
            DF
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Doctor's Friend
            </h1>
            <p className="text-xs text-gray-500">Patient Record System</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6">
          {/* Appointments Button */}
          <button
            onClick={goToAppointments}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <Calendar size={18} />
            Appointments
          </button>

          {/* User */}
          {user && (
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center">
                <User size={16} className="text-indigo-600" />
              </div>

              <div className="text-sm text-right">
                <div className="font-semibold text-gray-800">
                  {user?.fullName || user?.name || "Doctor"}
                </div>

                <div className="text-xs text-gray-500">
                  {user?.qualification || user?.email}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
                className="text-red-600 p-2 rounded hover:bg-red-50"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
