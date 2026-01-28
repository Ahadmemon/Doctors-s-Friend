import React from "react";

function AddPatientForm() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <button
        onClick={() => setCurrentView("dashboard")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Dashboard</span>
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Patient</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const patientData = {
            name: formData.get("name"),
            age: parseInt(formData.get("age")),
            gender: formData.get("gender"),
            contact: formData.get("contact"),
            email: formData.get("email"),
            bloodGroup: formData.get("bloodGroup"),
            diagnosis: formData.get("diagnosis"),
            status: formData.get("status"),
            lastVisit: formData.get("lastVisit"),
            medications: formData
              .get("medications")
              .split(",")
              .map((m) => m.trim())
              .filter((m) => m),
            allergies: formData
              .get("allergies")
              .split(",")
              .map((a) => a.trim())
              .filter((a) => a),
            notes: formData.get("notes"),
          };
          handleAddPatient(patientData);
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age *
            </label>
            <input
              type="number"
              name="age"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              name="gender"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact *
            </label>
            <input
              type="tel"
              name="contact"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnosis *
            </label>
            <input
              type="text"
              name="diagnosis"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              name="status"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ongoing">Ongoing</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Visit *
            </label>
            <input
              type="date"
              name="lastVisit"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medications (comma-separated)
            </label>
            <input
              type="text"
              name="medications"
              placeholder="e.g., Aspirin 81mg, Lisinopril 10mg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergies (comma-separated)
            </label>
            <input
              type="text"
              name="allergies"
              placeholder="e.g., Penicillin, Pollen"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Clinical Notes
          </label>
          <textarea
            name="notes"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter clinical notes, observations, or treatment plans..."
          ></textarea>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Add Patient
          </button>
          <button
            type="button"
            onClick={() => setCurrentView("dashboard")}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPatientForm;
