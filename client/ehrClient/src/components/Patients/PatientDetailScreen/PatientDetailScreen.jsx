import React from "react";

function PatientDetailScreen() {
  return (
    <div className="space-y-6">
      <button
        onClick={() => setCurrentView("dashboard")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft size={20} />
        <span>Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedPatient.name}
            </h2>
            <p className="text-gray-500">
              {selectedPatient.age} years, {selectedPatient.gender}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                selectedPatient.status === "resolved"
                  ? "bg-green-100 text-green-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {selectedPatient.status.charAt(0).toUpperCase() +
                selectedPatient.status.slice(1)}
            </span>
            <button
              onClick={() => {
                const newStatus =
                  selectedPatient.status === "ongoing" ? "resolved" : "ongoing";
                handleUpdatePatientStatus(selectedPatient.id, newStatus);
              }}
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
            >
              Mark as{" "}
              {selectedPatient.status === "ongoing" ? "Resolved" : "Ongoing"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Contact</p>
            <p className="font-semibold text-gray-800">
              {selectedPatient.contact}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-semibold text-gray-800">
              {selectedPatient.email}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Blood Group</p>
            <p className="font-semibold text-gray-800">
              {selectedPatient.bloodGroup}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Last Visit</p>
            <p className="font-semibold text-gray-800">
              {selectedPatient.lastVisit}
            </p>
          </div>
        </div>

        <div className="border-t pt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Diagnosis</h3>
            <p className="text-gray-700">{selectedPatient.diagnosis}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Current Medications
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {selectedPatient.medications.map((med, idx) => (
                <li key={idx} className="text-gray-700">
                  {med}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Allergies</h3>
            <p className="text-gray-700">
              {selectedPatient.allergies.join(", ")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Clinical Notes</h3>
            <p className="text-gray-700">{selectedPatient.notes}</p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView("addFollowUp")}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          <Calendar size={20} />
          <span>Schedule Follow-up</span>
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Follow-up History
        </h3>
        <div className="space-y-4">
          {selectedPatient.followUps.map((followUp, idx) => (
            <div key={idx} className="border-l-4 border-indigo-600 pl-4 py-2">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-800">{followUp.date}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    followUp.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {followUp.status.charAt(0).toUpperCase() +
                    followUp.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-700">{followUp.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientDetailScreen;
