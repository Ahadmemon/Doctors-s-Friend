import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, User, X, ArrowLeft, Loader } from "lucide-react";
import {
  getMyAppointments,
  updateAppointmentStatus,
} from "../../api/appointment.api.js";

export default function AppointmentListScreen() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingApptId, setLoadingApptId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getMyAppointments();
      setAppointments(data.data || []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;
    try {
      setLoadingApptId(appointmentId);
      await updateAppointmentStatus(appointmentId, "cancel");
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === appointmentId ? { ...apt, status: "cancelled" } : apt,
        ),
      );
    } catch (err) {
      alert(`Error: ${err.message || err}`);
    } finally {
      setLoadingApptId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-300";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const activeAppointments = appointments.filter(
    (apt) => apt.status === "pending" || apt.status === "accepted",
  );
  const otherAppointments = appointments.filter(
    (apt) => apt.status !== "pending" && apt.status !== "accepted",
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-blue-200 rounded-full transition-all"
          >
            <ArrowLeft size={24} className="text-blue-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Appointments
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Track your appointment requests
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size={40} className="text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg">
            <p>{error}</p>
            <button
              onClick={fetchAppointments}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No appointments yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Book an appointment to get started
            </p>
          </div>
        ) : (
          <>
            {/* Active: pending or accepted */}
            {activeAppointments.length > 0 && (
              <div className="space-y-4">
                {activeAppointments.map((apt) => (
                  <div
                    key={apt._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-4 border-l-4 border-blue-500"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Dr. {apt.doctorId?.user?.fullName || "Unknown Doctor"}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {apt.reason || "General consultation"}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(apt.status)}`}
                      >
                        {apt.status.charAt(0).toUpperCase() +
                          apt.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={18} className="text-blue-600" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={18} className="text-blue-600" />
                        <span>{apt.time}</span>
                      </div>
                    </div>

                    {apt.doctorId?.user?.email && (
                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                        <User size={16} className="text-blue-600" />
                        <span>{apt.doctorId.user.email}</span>
                      </div>
                    )}

                    {/* Patient can only cancel — doctor accepts */}
                    <div className="pt-3 border-t">
                      <button
                        onClick={() => handleCancel(apt._id)}
                        disabled={loadingApptId === apt._id}
                        className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                      >
                        {loadingApptId === apt._id ? (
                          <Loader size={18} className="animate-spin" />
                        ) : (
                          <X size={18} />
                        )}
                        Cancel Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Other: completed / cancelled */}
            {otherAppointments.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Past Appointments
                </h2>
                <div className="space-y-4">
                  {otherAppointments.map((apt) => (
                    <div
                      key={apt._id}
                      className="bg-white rounded-lg shadow-md p-4 opacity-75"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Dr.{" "}
                            {apt.doctorId?.user?.fullName || "Unknown Doctor"}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {apt.date} at {apt.time}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(apt.status)}`}
                        >
                          {apt.status.charAt(0).toUpperCase() +
                            apt.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
