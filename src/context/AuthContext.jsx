import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const AUTH_KEY = "@nomzy_auth";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // true while reading storage

  // On mount — restore persisted auth state
  useEffect(() => {
    AsyncStorage.getItem(AUTH_KEY)
      .then((val) => setIsLoggedIn(val === "true"))
      .catch(() => setIsLoggedIn(false))
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = async () => {
    try {
      await AsyncStorage.setItem(AUTH_KEY, "true");
    } catch {
      // Keep login usable if native persistence is temporarily unavailable.
    }
    setIsLoggedIn(true);
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
    } catch {
      // Local auth state still needs to clear even if persistence fails.
    }
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
