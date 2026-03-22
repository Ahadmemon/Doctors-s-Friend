import { Search, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SearchBox({
  searchTerm,
  setSearchTerm,
  // statusFilter,
  // setStatusFilter,
}) {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patients by name or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          {/* {statusFilter !== "all" && (
            <button
              onClick={() => setStatusFilter("all")}
              className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold"
            >
              Clear Filter
            </button>
          )} */}
          <button
            onClick={() => navigate("/add-patient")}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            <UserPlus size={20} />
            <span>Add Patient</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
