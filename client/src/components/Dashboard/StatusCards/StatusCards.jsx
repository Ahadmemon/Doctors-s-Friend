import { User, CheckCircle, Clock } from "lucide-react";

function StatusCards({ patients, statusFilter, setStatusFilter }) {
  const stats = {
    total: patients.length,
    resolved: patients.filter((p) => p.status === "resolved").length,
    ongoing: patients.filter((p) => p.status === "ongoing").length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => setStatusFilter("all")}
          className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-600 cursor-pointer ${statusFilter === "all" ? "ring-2 ring-indigo-600" : ""}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Patients
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.total}
              </p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <User className="text-indigo-600" size={24} />
            </div>
          </div>
        </div>

        <div
          onClick={() => setStatusFilter("resolved")}
          className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600 cursor-pointer ${statusFilter === "resolved" ? "ring-2 ring-green-600" : ""}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Cases Resolved
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.resolved}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div
          onClick={() => setStatusFilter("ongoing")}
          className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-600 cursor-pointer ${statusFilter === "ongoing" ? "ring-2 ring-orange-600" : ""}`}
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
        </div>
      </div>
    </div>
  );
}

export default StatusCards;
