import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

export default function DashboardScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
      <Navbar />
      <main className="pb-10">
        <Outlet />
      </main>
    </div>
  );
}
