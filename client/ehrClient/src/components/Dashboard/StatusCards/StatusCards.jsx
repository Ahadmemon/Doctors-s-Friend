import React from "react";

function StatusCards() {
  return (
    //  Stats Cards
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div
        onClick={() => setStatusFilter("all")}
        className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-600 cursor-pointer transition hover:shadow-lg ${
          statusFilter === "all" ? "ring-2 ring-indigo-600" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Patients</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {stats.total}
            </p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <User className="text-indigo-600" size={24} />
          </div>
        </div>
        {statusFilter === "all" && (
          <p className="text-xs text-indigo-600 font-semibold mt-2">
            Currently viewing all
          </p>
        )}
      </div>

      <div
        onClick={() => setStatusFilter("resolved")}
        className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600 cursor-pointer transition hover:shadow-lg ${
          statusFilter === "resolved" ? "ring-2 ring-green-600" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Cases Resolved</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {stats.resolved}
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="text-green-600" size={24} />
          </div>
        </div>
        {statusFilter === "resolved" && (
          <p className="text-xs text-green-600 font-semibold mt-2">
            Showing resolved cases
          </p>
        )}
      </div>

      <div
        onClick={() => setStatusFilter("ongoing")}
        className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-600 cursor-pointer transition hover:shadow-lg ${
          statusFilter === "ongoing" ? "ring-2 ring-orange-600" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Cases Ongoing</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {stats.ongoing}
            </p>
          </div>
          <div className="bg-orange-100 p-3 rounded-full">
            <Clock className="text-orange-600" size={24} />
          </div>
        </div>
        {statusFilter === "ongoing" && (
          <p className="text-xs text-orange-600 font-semibold mt-2">
            Showing ongoing cases
          </p>
        )}
      </div>
    </div>
  );
}

export default StatusCards;
