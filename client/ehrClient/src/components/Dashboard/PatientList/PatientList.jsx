import React from "react";

function PatientList() {
  return (
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
                Diagnosis
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Last Visit
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 transition">
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
                  <p className="text-sm text-gray-800">{patient.contact}</p>
                  <p className="text-xs text-gray-500">{patient.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {patient.diagnosis}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {patient.lastVisit}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      patient.status === "resolved"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {patient.status.charAt(0).toUpperCase() +
                      patient.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedPatient(patient);
                      setCurrentView("patientDetail");
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;
