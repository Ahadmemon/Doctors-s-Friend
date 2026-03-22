import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function DoctorCard({ doctor }) {
  const { setSelectedDoctor } = useApp();
  const navigate = useNavigate();

  const handleChat = () => {
    setSelectedDoctor(doctor);
    navigate(`/chat/${doctor.id}`);
  };

  return (
    <div
      onClick={handleChat}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 cursor-pointer hover:shadow-lg hover:shadow-sky-100 hover:-translate-y-1 transition-all duration-200 group"
    >
      <div className="flex justify-end mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ${doctor.available ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${doctor.available ? "bg-emerald-500" : "bg-slate-400"}`} />
          {doctor.available ? "Available" : "Busy"}
        </span>
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-sky-50 border-2 border-sky-100 group-hover:border-sky-300 transition-colors">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=e0f2fe&color=0284c7&rounded=true&size=80`; }}
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-bold text-slate-800 text-sm leading-tight">{doctor.name}</h3>
        <p className="text-sky-500 text-xs font-medium mt-0.5">{doctor.specialty}</p>
        <p className="text-slate-400 text-xs mt-1 leading-snug">{doctor.qualification}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-sky-500 text-xs font-semibold group-hover:text-sky-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Chat with Doctor
      </div>
    </div>
  );
}
