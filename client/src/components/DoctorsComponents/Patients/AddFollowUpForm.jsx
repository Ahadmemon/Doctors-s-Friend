import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { addFollowUp } from "../../../api/patient.api";
import { motion } from "framer-motion";

function AddFollowUp() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [diseases, setDiseases] = useState("");
  const [treatments, setTreatments] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await addFollowUp(id, {
        diseases: diseases.trim(),
        treatments,
        notes,
      });
      navigate(`/patient/${id}`);
    } catch (err) {
      setError("Failed to add follow-up");
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
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-4 md:p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Add Follow-up</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Diseases</label>
            <input
              type="text"
              value={diseases}
              onChange={(e) => setDiseases(e.target.value)}
              placeholder="Diabetes, Hypertension"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Treatments</label>
            <textarea
              rows="3"
              required
              value={treatments}
              onChange={(e) => setTreatments(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-200 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default AddFollowUp;
