import { useState } from "react";
import { useApp } from "../context/AppContext";
import ProfileForm from "./ProfileForm";

const INFO_ITEMS = [
  { label: "Email",   src: "user",    d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { label: "Age",     key: "age",     suffix: " yrs", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "Mobile",  key: "mobile",  d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
  { label: "Gender",  key: "gender",  d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { label: "Address", key: "address", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
];

export default function ProfileScreen() {
  const { profile, updateProfile, user } = useApp();
  const [editing, setEditing] = useState(false);

  const getValue = (item) => {
    if (item.src === "user") return user?.email;
    const v = profile?.[item.key];
    return v ? (item.suffix ? v + item.suffix : v) : "—";
  };

  if (editing) {
    return (
      <div className="p-6 max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setEditing(false)}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-bold text-slate-800">Edit Profile</h2>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <ProfileForm
            initial={profile}
            onSubmit={(p) => { updateProfile(p); setEditing(false); }}
            submitLabel="Save Changes"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-sky-500 to-cyan-500 rounded-3xl p-6 text-white mb-5 shadow-xl shadow-sky-200 flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/20 border-2 border-white/40 flex-shrink-0 flex items-center justify-center">
          {profile?.photo
            ? <img src={profile.photo} alt="" className="w-full h-full object-cover" />
            : <svg className="w-10 h-10 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">Patient</p>
          <h3 className="text-2xl font-bold truncate">{profile?.fullName || user?.name}</h3>
          <p className="text-white/80 text-sm mt-0.5 truncate">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        {INFO_ITEMS.map(item => (
          <div key={item.label} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.d} />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-400 font-medium">{item.label}</p>
              <p className="text-slate-800 text-sm font-medium truncate">{getValue(item)}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setEditing(true)}
        className="w-full py-3.5 rounded-2xl font-semibold text-sky-600 text-sm bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Profile
      </button>
    </div>
  );
}
