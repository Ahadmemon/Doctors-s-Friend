import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { getPatientFollowUps } from "../../../api/patient.api";

function FollowUpHistory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const res = await getPatientFollowUps(id);
        setFollowUps(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUps();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        Loading follow-ups...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex justify-center px-2 sm:px-4 lg:px-6 py-6"
    >
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-4 md:p-8">
        {/* Top Bar */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Follow-up History
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {followUps.map((f) => (
            <div
              key={f._id}
              className="border border-gray-200 rounded-xl p-4 md:p-5 hover:shadow-sm transition"
            >
              {/* Date */}
              <p className="text-xs text-gray-500 mb-2">
                {new Date(f.createdAt).toLocaleDateString()}
              </p>

              {/* Diseases */}
              {f.diseases && (
                <div className="mb-2">
                  <p className="text-sm font-semibold text-gray-800">
                    Diseases
                  </p>
                  <p className="text-gray-700 text-sm">{f.diseases}</p>
                </div>
              )}

              {/* Treatments */}
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-800">
                  Treatments
                </p>
                <p className="text-gray-700 text-sm">{f.treatments}</p>
              </div>

              {/* Notes */}
              {f.notes && (
                <div>
                  <p className="text-sm font-semibold text-gray-800">Notes</p>
                  <p className="text-gray-700 text-sm">{f.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default FollowUpHistory;
