import React from "react";

function SearchBox() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search patients by name, diagnosis, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        {statusFilter !== "all" && (
          <button
            onClick={() => setStatusFilter("all")}
            className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition whitespace-nowrap"
          >
            Clear Filter
          </button>
        )}
        <button
          onClick={() => setCurrentView("addPatient")}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition whitespace-nowrap"
        >
          <UserPlus size={20} />
          <span>Add Patient</span>
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
