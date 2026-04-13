import TopBar from "../Dashboard/TopBar/TopBar";
import StatusCards from "../Dashboard/StatusCards/StatusCards";
import SearchBox from "../Dashboard/SearchBox/SearchBox";
import PatientList from "../Dashboard/PatientList/PatientList";
import { useEffect, useMemo, useState } from "react";
import { fetchPatients, deletePatient } from "../../api/patient.api";
import { motion } from "framer-motion";

function Layout() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetchPatients();
        if (!mounted) return;

        let data = [];

        if (
          res.data?.data?.followUpData &&
          Array.isArray(res.data.data.followUpData)
        ) {
          const uniquePatients = new Map();

          res.data.data.followUpData.forEach((followUp) => {
            if (followUp.patient) {
              const patientId = followUp.patient._id;

              if (!uniquePatients.has(patientId)) {
                const patientData = {
                  ...followUp.patient,
                  diseases: followUp.diseases || [],
                  treatments: followUp.treatments || "",
                  notes: followUp.notes || "",
                };

                uniquePatients.set(patientId, patientData);
              }
            }
          });

          data = Array.from(uniquePatients.values());
        }

        setPatients(data);
      } catch (err) {
        if (!mounted) return;
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch patients",
        );
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const removePatient = async (id) => {
    setLoading(true);
    try {
      await deletePatient(id);
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete patient",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Filter by name and contact
  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const contact = (p.contactNumber || "").toLowerCase();

      const q = searchTerm.trim().toLowerCase();

      const matchesSearch = !q || name.includes(q) || contact.includes(q);

      const patientStatus = (p.status || "").toLowerCase();
      const filterStatus = statusFilter.toLowerCase();

      const matchesStatus =
        filterStatus === "all" || patientStatus === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [patients, searchTerm, statusFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.9 }}
      className="min-h-screen bg-gray-100 px-2 sm:px-4 lg:px-6 py-6"
    >
      {/* White Card Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-4 md:p-8">
        {/* Top Bar */}
        <div className="mb-4">
          <TopBar />
        </div>

        {/* Loading/Error */}
        {loading && (
          <div className="py-4 text-center text-gray-500">
            Loading patients...
          </div>
        )}
        {error && <div className="py-4 text-center text-red-600">{error}</div>}

        {/* Status Cards */}
        <div className="mb-4">
          <StatusCards
            patients={patients}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>

        {/* Search Box */}
        <div className="mb-4">
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Patient List */}
        <div>
          <PatientList
            patients={filteredPatients}
            removePatient={removePatient}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Layout;
