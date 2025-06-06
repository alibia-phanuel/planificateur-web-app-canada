/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { ReactNode, useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import useAuthTranslations from "../hooks/useAuthTranslations";

interface AppContextType {
  backendUrl: string | undefined;
  isLoggedin: boolean;
  setIsLoggeding: (value: boolean) => void;
  userData: any;
  setUserData: (data: any) => void;
  getUserData: () => Promise<void>;
  isLoading: boolean; // 👈 nouveau
}
export const AppContent = createContext<AppContextType | undefined>(undefined);

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  axios.defaults.withCredentials = true;
  const [isLoading, setIsLoading] = useState(true); // 👈

  const [isLoggedin, setIsLoggeding] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // 🔄 Lecture des données depuis localStorage au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const storedLoggedIn = localStorage.getItem("isLoggedin");

    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    if (storedLoggedIn === "true") {
      setIsLoggeding(true);
    }

    getAuthState(); // 👈
  }, []);

  // 💾 Enregistre les données quand elles changent
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("isLoggedin", isLoggedin.toString());
  }, [isLoggedin]);
  const t = useAuthTranslations(); // Utilisation du custom hook

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        withCredentials: true,
      });

      if (data.success) {
        setIsLoggeding(true);
        getUserData();
      } else {
        setIsLoggeding(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsLoggeding(false);
    } finally {
      setIsLoading(false); // 👈 On a terminé la vérif
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(t(data.messageKey)); // Utilisation de la clé envoyée par le backend
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        t("userFetchError") // Fallback générique pour les erreurs inattendues
      );
    }
  };

  const value: AppContextType = {
    backendUrl,
    isLoggedin,
    setIsLoggeding,
    userData,
    setUserData,
    getUserData,
    isLoading,
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};
