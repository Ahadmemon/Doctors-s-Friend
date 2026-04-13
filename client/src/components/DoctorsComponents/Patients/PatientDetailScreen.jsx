import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { fetchPatients, updatePatient } from "../../../api/patient.api";

function PatientDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        const res = await fetchPatients(); // fetch all follow-ups for this doctor

        // Extract only the patient objects from follow-ups
        const allPatients = res.data?.data?.followUpData
          ?.map((f) => f.patient)
          .filter(Boolean); // remove any undefined/null

        // Find the patient that matches the id from params
        const foundPatient = allPatients.find((p) => p._id === id);

        if (foundPatient) {
          setPatient(foundPatient);
          setError("");
        } else {
          setPatient(null);
          setError("Patient not found");
        }
      } catch (err) {
        setPatient(null);
        setError(
          err.response?.data?.message || "Failed to fetch patient details",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPatientData(); // only fetch if id exists
  }, [id]);

  // Update status locally and on API
  const handleUpdateStatus = async (newStatus) => {
    if (!patient) return;
    setUpdatingStatus(true);
    try {
      await updatePatient(patient._id, { status: newStatus });

      // Update state immediately without refetching
      setPatient((prev) => ({ ...prev, status: newStatus }));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleScheduleFollowUp = () => {
    if (!patient) return;
    navigate(`/patients/${patient._id}/followups/schedule`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading patient details...</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-red-600 font-semibold">
            {error || "Patient not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {patient.name}
              </h2>
              <p className="text-gray-500 text-lg">
                {patient.age} years, {patient.gender}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold text-center ${
                  patient.status === "resolved"
                    ? "bg-green-100 text-green-800"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                {patient.status?.charAt(0)?.toUpperCase() +
                  patient.status?.slice(1)}
              </span>

              <button
                onClick={() =>
                  handleUpdateStatus(
                    patient.status === "ongoing" ? "resolved" : "ongoing",
                  )
                }
                disabled={updatingStatus}
                className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {updatingStatus
                  ? "Updating..."
                  : `Mark as ${patient.status === "ongoing" ? "Resolved" : "Ongoing"}`}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Contact Number</p>
              <p className="font-semibold text-gray-800">
                {patient.contactNumber || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <p className="font-semibold text-gray-800">
                {patient.address || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Weight</p>
              <p className="font-semibold text-gray-800">
                {patient.weight ? `${patient.weight} kg` : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Date Created</p>
              <p className="font-semibold text-gray-800">
                {formatDate(patient.createdAt)}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/patients/${patient._id}/followups`)}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            <Calendar size={20} />
            <span>Show Follow-up history</span>
          </button>

          <button
            onClick={() => navigate(`/patients/${patient._id}/followups/add`)}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            <Calendar size={20} />
            <span>Add Follow-up</span>
          </button>

          <button
            onClick={handleScheduleFollowUp}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            <Calendar size={20} />
            <span>Schedule Follow-up</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default PatientDetailScreen;
