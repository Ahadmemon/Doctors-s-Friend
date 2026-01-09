import React from "react";

function AddFollowUpForm() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <button
        onClick={() => setCurrentView("patientDetail")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Patient Details</span>
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Schedule Follow-up
      </h2>
      <p className="text-gray-600 mb-6">Patient: {selectedPatient.name}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const followUpData = {
            date: formData.get("date"),
            reason: formData.get("reason"),
          };
          handleAddFollowUp(followUpData);
        }}
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Follow-up Date *
          </label>
          <input
            type="date"
            name="date"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Follow-up *
          </label>
          <textarea
            name="reason"
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Blood pressure monitoring, Post-treatment check, Medication review"
          ></textarea>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Schedule Follow-up
          </button>
          <button
            type="button"
            onClick={() => setCurrentView("patientDetail")}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFollowUpForm;
