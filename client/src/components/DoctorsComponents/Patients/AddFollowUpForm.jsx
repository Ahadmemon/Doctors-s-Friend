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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const followUpData = {
      diseases: diseases.split(",").map((d) => d.trim()),
      treatments,
      notes,
    };

    try {
      await addFollowUp(id, followUpData);
      navigate(`/patient/${id}`);
    } catch (err) {
      console.error("Follow-up error:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center"
    >
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Follow-up</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Diseases</label>

            <input
              type="text"
              value={diseases}
              onChange={(e) => setDiseases(e.target.value)}
              placeholder="Example: Diabetes, Hypertension"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <p className="text-xs text-gray-500 mt-1">
              Separate multiple diseases using comma
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Treatments</label>

            <textarea
              rows="3"
              required
              value={treatments}
              onChange={(e) => setTreatments(e.target.value)}
              placeholder="Prescribed medicines or therapy"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Doctor Notes
            </label>

            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Extra observations"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
            >
              Save Follow-up
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-200 py-3 rounded-lg"
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
