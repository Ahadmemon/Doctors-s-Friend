import { useState, useRef } from "react";
import AuthLayout from "../AuthScreens/AuthLayout";
import Input from "../UI/InputBox";
import { updateDoctor } from "../../api/doctor.api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfileScreen({ initial = {} }) {
  const fileRef = useRef();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(initial.photo || null);

  const [form, setForm] = useState({
    registrationNumber: initial.registrationNumber || "",
    qualification: initial.qualification || "",
    mobileNumber: initial.mobileNumber || "",
    specialty: initial.specialty || "",
    address: initial.address || "",
    profilePic: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Image upload
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);

    setForm((f) => ({ ...f, profilePic: file }));
  };

  // Input change
  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Validation
  const validate = () => {
    const e = {};

    if (!form.registrationNumber.trim())
      e.registrationNumber = "Registration number is required";

    if (!form.qualification.trim())
      e.qualification = "Qualification is required";

    if (!form.mobileNumber) e.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(form.mobileNumber))
      e.mobileNumber = "Enter valid 10-digit number";

    return e;
  };

  // Submit
  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("registrationNumber", form.registrationNumber);
      formDataToSend.append("qualification", form.qualification);
      formDataToSend.append("mobileNumber", form.mobileNumber);
      formDataToSend.append("specialty", form.specialty);
      formDataToSend.append("address", form.address);

      if (form.profilePic) {
        formDataToSend.append("profilePic", form.profilePic);
      }

      await updateDoctor(user._id, formDataToSend);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm space-y-5">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div
            onClick={() => fileRef.current.click()}
            className="relative w-24 h-24 rounded-2xl overflow-hidden cursor-pointer group border-2 border-dashed border-sky-300 hover:border-sky-500 bg-sky-50 transition-all"
          >
            {photo ? (
              <img src={photo} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sky-400 text-xs">
                Upload
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhoto}
          />

          <p className="text-xs text-slate-400 mt-2">Tap to upload photo</p>
        </div>

        {/* Registration Number */}
        <Input
          label="Registration Number"
          name="registrationNumber"
          value={form.registrationNumber}
          onChange={handleChange}
          placeholder="ABC 123 456"
          required
        />
        {errors.registrationNumber && (
          <p className="text-rose-500 text-xs -mt-3">
            {errors.registrationNumber}
          </p>
        )}

        {/* Qualification */}
        <Input
          label="Qualification"
          name="qualification"
          value={form.qualification}
          onChange={handleChange}
          placeholder="MBBS, MD"
          required
        />
        {errors.qualification && (
          <p className="text-rose-500 text-xs -mt-3">{errors.qualification}</p>
        )}

        {/* Mobile */}
        <Input
          label="Mobile Number"
          name="mobileNumber"
          value={form.mobileNumber}
          onChange={handleChange}
          placeholder="9876543210"
          required
        />
        {errors.mobileNumber && (
          <p className="text-rose-500 text-xs -mt-3">{errors.mobileNumber}</p>
        )}

        {/* Specialty */}
        <Input
          label="Specialty"
          name="specialty"
          value={form.specialty}
          onChange={handleChange}
          placeholder="General, Dentist, Cardiologist..."
        />

        {/* Address */}
        <Input
          label="Clinic Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="123 Main Street, City"
        />

        {/* Submit */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 shadow-lg shadow-sky-200 transition-all active:scale-[0.98]"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </AuthLayout>
  );
}
