import { useState } from "react";
import DoctorCard from "./DoctorCard";
import { doctors } from "../data/doctors";

export default function DoctorsList() {
  const [search, setSearch] = useState("");

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-sky-500 to-cyan-500 rounded-3xl p-6 mb-6 text-white shadow-xl shadow-sky-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full" style={{ transform: "translate(30%, -40%)" }} />
        <div className="absolute bottom-0 right-20 w-24 h-24 bg-white/10 rounded-full" style={{ transform: "translateY(30%)" }} />
        <div className="relative">
          <p className="text-sky-100 text-sm font-medium mb-1">Good day 👋</p>
          <h2 className="text-2xl font-bold mb-1">Find Your Doctor</h2>
          <p className="text-sky-100 text-sm mb-4">Connect with top specialists instantly</p>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search doctors or specialties..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-sky-200 text-sm border border-white/30 focus:outline-none focus:border-white/60 transition-all"
            />
          </div>
        </div>
      </div>

      {filtered.length > 0
        ? <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{filtered.map(d => <DoctorCard key={d.id} doctor={d} />)}</div>
        : <div className="text-center py-16 text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">No doctors found</p>
          </div>}
    </div>
  );
}
