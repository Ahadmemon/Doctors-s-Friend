import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const normalizeToken = (t) => {
  if (!t) return "";
  try {
    const s = typeof t === "string" ? t : String(t);
    return s.startsWith("Bearer ") ? s.slice(7) : s;
  } catch {
    return "";
  }
};

export const AuthProvider = ({ children }) => {
  const initialUser = (() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const initialTokenPresent = !!localStorage.getItem("token");

  const [user, setUser] = useState(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(initialTokenPresent);

  const login = (userData, token) => {
    const cleanToken = normalizeToken(token);

    // Extract real user
    console.log(userData);

    const cleanUser = userData?.user ?? userData;

    setUser(cleanUser);
    setIsAuthenticated(!!cleanToken);

    try {
      localStorage.setItem("user", JSON.stringify(cleanUser));
      localStorage.setItem("token", cleanToken);
    } catch (e) {
      console.warn("Failed to persist auth to localStorage", e);
    }
  };

  const register = (userData, token) => {
    login(userData, token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (e) {
      console.warn("Failed to clear localStorage on logout", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// const normalizeToken = (t) => {
//   if (!t) return "";
//   try {
//     const s = typeof t === "string" ? t : String(t);
//     return s.startsWith("Bearer ") ? s.slice(7) : s;
//   } catch {
//     return "";
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const initialUser = (() => {
//     try {
//       const raw = localStorage.getItem("user");
//       return raw ? JSON.parse(raw) : null;
//     } catch {
//       return null;
//     }
//   })();

//   const initialTokenPresent = !!localStorage.getItem("token");

//   const [user, setUser] = useState(initialUser);
//   const [isAuthenticated, setIsAuthenticated] = useState(initialTokenPresent);

//   const login = (userData, token) => {
//     const clean = normalizeToken(token);
//     setUser(userData);
//     setIsAuthenticated(!!clean);
//     try {
//       localStorage.setItem("user", JSON.stringify(userData));
//       localStorage.setItem("token", clean);
//     } catch (e) {
//       console.warn("Failed to persist auth to localStorage", e);
//     }
//   };

//   const register = (userData, token) => {
//     login(userData, token);
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     try {
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     } catch (e) {
//       console.warn("Failed to clear localStorage on logout", e);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, isAuthenticated, login, register, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// };
