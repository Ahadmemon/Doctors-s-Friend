import { createContext, useContext, useState } from "react";

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <Ctx.Provider value={{
      user,
      profile,
      selectedDoctor,
      setSelectedDoctor,
      login:         (u) => setUser(u),
      logout:        ()  => { setUser(null); setProfile(null); setSelectedDoctor(null); },
      saveProfile:   (p) => setProfile(p),
      updateProfile: (p) => setProfile(p),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
