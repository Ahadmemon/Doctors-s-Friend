import { Activity } from "lucide-react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-50 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">EHR System</h1>
          <p className="text-gray-600 mt-2">Electronic Health Records</p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
