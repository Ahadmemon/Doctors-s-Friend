import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Loader, AlertCircle } from "lucide-react";
import {
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../../api/appointment.api.js";

export default function DoctorAppointmentsScreen() {
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
      const data = await getDoctorAppointments();
      setAppointments(data.data || []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, action) => {
    if (action === "cancel" && !window.confirm("Cancel this appointment?"))
      return;
    try {
      setLoadingApptId(appointmentId);
      await updateAppointmentStatus(appointmentId, action);
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === appointmentId
            ? { ...apt, status: action === "accept" ? "accepted" : "cancelled" }
            : apt,
        ),
      );
    } catch (err) {
      alert(`Error: ${err.message || err}`);
    } finally {
      setLoadingApptId(null);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-blue-200 rounded-full transition"
          >
            <ArrowLeft size={24} className="text-blue-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage patient appointments
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size={40} className="text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <div>
              <p className="font-semibold">Error loading appointments</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">No appointments</p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((apt) => (
              <div
                key={apt._id}
                className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      Patient: {apt.userId?.fullName || "N/A"}
                    </h3>
                    {apt.reason && (
                      <p className="text-sm text-gray-600 mt-1">
                        Reason: {apt.reason}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${getStatusBadgeColor(apt.status)}`}
                  >
                    {apt.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-blue-600" />
                    {apt.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-blue-600" />
                    {apt.time}
                  </div>
                </div>

                {/* Doctor can accept or cancel pending appointments */}
                {apt.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(apt._id, "accept")}
                      disabled={loadingApptId === apt._id}
                      className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition text-sm"
                    >
                      {loadingApptId === apt._id ? "..." : "Accept"}
                    </button>
                    <button
                      onClick={() => handleStatusChange(apt._id, "cancel")}
                      disabled={loadingApptId === apt._id}
                      className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition text-sm"
                    >
                      {loadingApptId === apt._id ? "..." : "Cancel"}
                    </button>
                  </div>
                )}

                {/* Doctor can still cancel an accepted appointment */}
                {apt.status === "accepted" && (
                  <button
                    onClick={() => handleStatusChange(apt._id, "cancel")}
                    disabled={loadingApptId === apt._id}
                    className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition text-sm"
                  >
                    {loadingApptId === apt._id ? "..." : "Cancel Appointment"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
