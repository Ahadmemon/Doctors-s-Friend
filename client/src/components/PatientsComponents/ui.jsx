export const ic = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition-all text-slate-800 placeholder-slate-400 text-sm";

export function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

export function PrimaryBtn({ loading, onClick, label, loadingLabel, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="w-full py-3.5 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 shadow-lg shadow-sky-200 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading
        ? <span className="flex items-center justify-center gap-2"><Spinner />{loadingLabel}</span>
        : label}
    </button>
  );
}
