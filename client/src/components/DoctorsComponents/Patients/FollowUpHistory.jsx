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
      <div className="flex justify-center items-center h-64">
        Loading follow-ups...
      </div>
    );
  }

  return (
    <motion.div
      i
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Follow-up History
      </h2>

      <div className="space-y-5">
        {followUps.map((f) => (
          <div
            key={f._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5"
          >
            <p className="text-sm text-gray-500 mb-2">
              {new Date(f.createdAt).toLocaleDateString()}
            </p>

            <div className="mb-3">
              <p className="font-semibold text-gray-800 mb-1">Diseases</p>
              <div className="flex flex-wrap gap-2">
                {f.diseases.map((d, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <p className="font-semibold text-gray-800">Treatments</p>
              <p className="text-gray-700">{f.treatments}</p>
            </div>

            {f.notes && (
              <div>
                <p className="font-semibold text-gray-800">Notes</p>
                <p className="text-gray-700">{f.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default FollowUpHistory;
