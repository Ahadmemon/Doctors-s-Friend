import React from "react";

function TopBar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
            <Activity className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">EHR System</h1>
            <p className="text-xs text-gray-500">Healthcare Management</p>
          </div>
        </div>
        <button
          //   onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default TopBar;
