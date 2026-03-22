import React, { useState } from "react";
import {
  Search,
  UserPlus,
  Calendar,
  LogOut,
  User,
  Activity,
  CheckCircle,
  Clock,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

// Mock data
const initialPatients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    contact: "123-456-7890",
    email: "john@example.com",
    bloodGroup: "O+",
    status: "ongoing",
    diagnosis: "Hypertension",
    lastVisit: "2024-12-15",
    medications: ["Lisinopril 10mg", "Aspirin 81mg"],
    allergies: ["Penicillin"],
    notes: "Patient showing improvement with current medication",
    followUps: [
      {
        date: "2024-12-20",
        reason: "Blood pressure check",
        status: "scheduled",
      },
      {
        date: "2024-11-15",
        reason: "Initial consultation",
        status: "completed",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    contact: "098-765-4321",
    email: "jane@example.com",
    bloodGroup: "A+",
    status: "resolved",
    diagnosis: "Seasonal Allergies",
    lastVisit: "2024-11-20",
    medications: ["Cetirizine 10mg"],
    allergies: ["None"],
    notes: "Symptoms fully resolved",
    followUps: [
      { date: "2024-11-20", reason: "Follow-up check", status: "completed" },
    ],
  },
  {
    id: 3,
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    contact: "555-123-4567",
    email: "michael@example.com",
    bloodGroup: "B-",
    status: "ongoing",
    diagnosis: "Type 2 Diabetes",
    lastVisit: "2024-12-18",
    medications: ["Metformin 500mg", "Glimepiride 2mg"],
    allergies: ["Sulfa drugs"],
    notes: "Blood sugar levels stabilizing",
    followUps: [
      {
        date: "2025-01-10",
        reason: "Diabetes management review",
        status: "scheduled",
      },
    ],
  },
];

function App2() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard");
  const [patients, setPatients] = useState(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'ongoing', 'resolved'

  // Auth handlers
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // Simple validation
    if (email && password && password.length >= 8) {
      setIsAuthenticated(true);
      setCurrentView("dashboard");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // Simple validation
    if (email && password && password.length >= 8) {
      setIsAuthenticated(true);
      setCurrentView("dashboard");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("login");
    setSelectedPatient(null);
  };

  // Patient handlers
  const handleAddPatient = (patientData) => {
    const newPatient = {
      ...patientData,
      id: patients.length + 1,
      followUps: [],
    };
    setPatients([...patients, newPatient]);
    setCurrentView("dashboard");
  };

  const handleUpdatePatientStatus = (patientId, newStatus) => {
    const updatedPatients = patients.map((p) => {
      if (p.id === patientId) {
        return { ...p, status: newStatus };
      }
      return p;
    });
    setPatients(updatedPatients);
    setSelectedPatient(updatedPatients.find((p) => p.id === patientId));
  };

  const handleAddFollowUp = (followUpData) => {
    const updatedPatients = patients.map((p) => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          followUps: [...p.followUps, { ...followUpData, status: "scheduled" }],
        };
      }
      return p;
    });
    setPatients(updatedPatients);
    setSelectedPatient(
      updatedPatients.find((p) => p.id === selectedPatient.id),
    );
    setCurrentView("patientDetail");
  };

  // Filter patients based on search
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contact.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: patients.length,
    resolved: patients.filter((p) => p.status === "resolved").length,
    ongoing: patients.filter((p) => p.status === "ongoing").length,
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text- mb-8">
            <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">EHR System</h1>
            <p className="text-gray-600 mt-2">Electronic Health Records</p>
          </div>

          {currentView === "login" ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="doctor@hospital.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    minLength="8"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 8 characters required
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Sign In
              </button>
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setCurrentView("register")}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Register
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Dr. John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="doctor@hospital.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength="8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 8 characters required
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Create Account
              </button>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setCurrentView("login")}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Main App Layout
  return (
    <div className="min-h-screen bg-gray-300">
      {/* Header */}
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
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/*Wrap up div(main div wrapping all the components on the screen) used to apply same stylings to all components like padding for stats card and search bar is equal thus wrapped in this div */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard View */}
        {currentView === "dashboard" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div
                onClick={() => setStatusFilter("all")}
                className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-600 cursor-pointer transition hover:shadow-lg ${
                  statusFilter === "all" ? "ring-2 ring-indigo-600" : ""
                }`}
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
                    <p className="text-gray-500 text-sm font-medium">
                      Cases Ongoing
                    </p>
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

            {/* Search and Add Patient */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative w-full">
                  <Search
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
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

            {/* Patient List */}
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
                      <tr
                        key={patient.id}
                        className="hover:bg-gray-50 transition"
                      >
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
                          <p className="text-sm text-gray-800">
                            {patient.contact}
                          </p>
                          <p className="text-xs text-gray-500">
                            {patient.email}
                          </p>
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
          </>
        )}
        {/* Add Patient Form */}
        {currentView === "addPatient" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <button
              onClick={() => setCurrentView("dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Add New Patient
            </h2>

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
        )}
        {/* Patient Detail View */}
        {currentView === "patientDetail" && selectedPatient && (
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
                        selectedPatient.status === "ongoing"
                          ? "resolved"
                          : "ongoing";
                      handleUpdatePatientStatus(selectedPatient.id, newStatus);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
                  >
                    Mark as{" "}
                    {selectedPatient.status === "ongoing"
                      ? "Resolved"
                      : "Ongoing"}
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
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Diagnosis
                  </h3>
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
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Allergies
                  </h3>
                  <p className="text-gray-700">
                    {selectedPatient.allergies.join(", ")}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Clinical Notes
                  </h3>
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

            {/* Follow-up History */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Follow-up History
              </h3>
              <div className="space-y-4">
                {selectedPatient.followUps.map((followUp, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-indigo-600 pl-4 py-2"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-800">
                        {followUp.date}
                      </p>
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
        )}
        {/* Add Follow-up Form */}
        {currentView === "addFollowUp" && selectedPatient && (
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
            <p className="text-gray-600 mb-6">
              Patient: {selectedPatient.name}
            </p>

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
        )}
      </div>
    </div>
  );
}

export default App2;
