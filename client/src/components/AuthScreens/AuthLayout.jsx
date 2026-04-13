import { Activity } from "lucide-react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* Soft background texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #e0f2fe 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-105">
        {/* Top branding strip */}
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <div className="bg-sky-600 w-8 h-8 rounded-lg flex items-center justify-center shadow-sm shadow-sky-300">
            <Activity size={17} className="text-white" strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-slate-800 font-bold text-sm leading-none">
              Doctor's Friend
            </p>
            <p className="text-slate-400 text-[10px] mt-0.5 leading-none">
              Patient Records System
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 px-8 py-8">
          {children}
        </div>

        {/* Bottom trust line */}
        <div className="flex items-center justify-center gap-4 mt-5">
          {["HIPAA Compliant", "256-bit SSL", "SOC 2 Certified"].map((t) => (
            <span
              key={t}
              className="text-[10px] text-slate-400 flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-slate-300 inline-block" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
