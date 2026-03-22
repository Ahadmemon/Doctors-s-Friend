import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";

function PatientList({ patients, removePatient, loading, error }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDelete = async (patientId) => {
    if (!confirm("Are you sure you want to delete this patient?")) return;
    try {
      await removePatient(patientId);
    } catch (err) {
      // Handle error silently or display error message
      console.log(err);
    }
  };

  if (loading)
    return <div className="p-8 text-center">Loading patients...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  if (!patients.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No patients found.</p>
          {/* <button
            onClick={() => navigate("/add-patient")}
            className="mt-4 text-indigo-600 font-semibold"
          >
            Add your first patient
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Weight
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Last Visit
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr
                  key={patient._id}
                  onClick={() => navigate(`/patient/${patient._id}`)}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {patient.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {patient.age} yrs, {patient.gender}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-800">
                      {patient.contactNumber}
                    </p>
                    <p className="text-xs text-gray-500">{patient.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {patient.weight}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {formatDate(patient.updatedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${patient.status === "resolved" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}
                    >
                      {patient.status?.charAt(0)?.toUpperCase() +
                        patient.status?.slice(1)}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/patient/${patient._id}`)}
                        className="text-indigo-600 hover:text-indigo-800"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(patient._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PatientList;
