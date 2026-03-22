import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProfileForm from "./ProfileForm";

export default function CreateProfileScreen() {
  const { saveProfile } = useApp();
  const navigate = useNavigate();

  const handleSave = (p) => {
    saveProfile(p);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="relative w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-100 rounded-full text-sky-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            Profile Setup
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Set Up Your Profile</h2>
          <p className="text-slate-400 text-sm mt-1">Help us personalize your experience</p>
        </div>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/60 p-8 border border-white/60">
          <ProfileForm onSubmit={handleSave} submitLabel="Continue to Dashboard →" />
        </div>
      </div>
    </div>
  );
}
