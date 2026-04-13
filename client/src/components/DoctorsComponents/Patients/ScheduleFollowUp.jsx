import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { scheduleFollowUp } from "../../../api/patient.api";
import { motion } from "framer-motion";

const timeSlots = ["10:00", "12:00", "18:00", "20:00"];

function ScheduleFollowUpScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!date || !time) {
      setError("Date & time required");
      return;
    }

    setLoading(true);
    try {
      await scheduleFollowUp(id, { date, time, reason });
      setSuccess("Follow-up scheduled successfully");
      setDate("");
      setTime("");
      setReason("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex justify-center px-2 sm:px-4 lg:px-6 py-6"
    >
      {/* 🔥 Responsive width applied here */}
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-md p-4 md:p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar size={20} />
          Schedule Follow-up
        </h2>

        {/* Error / Success */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg mb-4 text-sm">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    time === t
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-800 border-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Reason (optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
              placeholder="Enter reason..."
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading ? "Scheduling..." : "Schedule Follow-up"}
          </button>
        </form>

        {/* Redirect */}
        {success && (
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default ScheduleFollowUpScreen;
