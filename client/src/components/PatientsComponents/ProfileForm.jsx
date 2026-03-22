import { useState, useRef } from "react";
import { ic } from "../auth/ui";

const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"];

export default function ProfileForm({ initial = {}, onSubmit, submitLabel = "Save" }) {
  const fileRef = useRef();
  const [photo, setPhoto] = useState(initial.photo || null);
  const [form, setForm] = useState({
    fullName: initial.fullName || "",
    address:  initial.address  || "",
    age:      initial.age      || "",
    mobile:   initial.mobile   || "",
    gender:   initial.gender   || "",
  });
  const [errors, setErrors] = useState({});

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.address.trim())  e.address  = "Address is required";
    if (!form.age)             e.age      = "Age is required";
    else if (isNaN(form.age) || +form.age < 1 || +form.age > 120) e.age = "Enter valid age";
    if (!form.mobile)          e.mobile   = "Mobile is required";
    else if (!/^\d{10}$/.test(form.mobile)) e.mobile = "Enter valid 10-digit number";
    if (!form.gender)          e.gender   = "Please select a gender";
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    onSubmit({ ...form, photo });
  };

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  return (
    <div className="space-y-5">
      {/* Photo upload */}
      <div className="flex flex-col items-center">
        <div
          onClick={() => fileRef.current.click()}
          className="relative w-24 h-24 rounded-2xl overflow-hidden cursor-pointer group border-2 border-dashed border-sky-300 hover:border-sky-500 bg-sky-50 transition-all"
        >
          {photo
            ? <img src={photo} alt="" className="w-full h-full object-cover" />
            : <div className="w-full h-full flex flex-col items-center justify-center">
                <svg className="w-8 h-8 text-sky-300 group-hover:text-sky-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs text-sky-400 mt-1">Upload</span>
              </div>}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        <p className="text-xs text-slate-400 mt-2">Tap to upload photo</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">Full Name</label>
        <input type="text" value={form.fullName} onChange={set("fullName")} placeholder="John Doe" className={ic} />
        {errors.fullName && <p className="text-rose-500 text-xs mt-1">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">Address</label>
        <textarea value={form.address} onChange={set("address")} placeholder="123, Street, City, State" rows={2} className={ic + " resize-none"} />
        {errors.address && <p className="text-rose-500 text-xs mt-1">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Age</label>
          <input type="number" value={form.age} onChange={set("age")} placeholder="28" className={ic} />
          {errors.age && <p className="text-rose-500 text-xs mt-1">{errors.age}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Mobile Number</label>
          <input type="tel" value={form.mobile} onChange={set("mobile")} placeholder="9876543210" className={ic} />
          {errors.mobile && <p className="text-rose-500 text-xs mt-1">{errors.mobile}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">Gender</label>
        <div className="flex flex-wrap gap-2">
          {GENDERS.map(g => (
            <button
              key={g}
              onClick={() => setForm(f => ({ ...f, gender: g }))}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                form.gender === g
                  ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white border-transparent shadow-md shadow-sky-100"
                  : "bg-slate-50 text-slate-500 border-slate-200 hover:border-sky-300 hover:text-sky-500"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        {errors.gender && <p className="text-rose-500 text-xs mt-1">{errors.gender}</p>}
      </div>

      <button
        onClick={submit}
        className="w-full py-3.5 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 shadow-lg shadow-sky-200 transition-all active:scale-[0.98]"
      >
        {submitLabel}
      </button>
    </div>
  );
}
