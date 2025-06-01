"use client";
import { useContext, useEffect } from "react";
import { AppContent } from "@/context/AppContext";
import { useRouter } from "next/navigation"; // ✅ import
import OptForm from "@/components/OptForm";

const EmailVerify = () => {
  const context = useContext(AppContent);
  const router = useRouter(); // ✅ instancier le router
  if (!context) throw new Error("AppContent non fourni");
  const { userData, isLoggedin } = context;

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté et si son compte est vérifié
    if (isLoggedin && userData && userData.isAccountVerified) {
      // Si l'utilisateur est connecté et vérifié, redirige vers /Agenda
      router.push("/Agenda");
    }
  }, [isLoggedin, userData, router]);

  // Si l'utilisateur est connecté et son compte vérifié, ne pas rendre le formulaire.
  if (isLoggedin && userData && userData.isAccountVerified) {
    return null; // Ou un message de redirection si tu préfères
  }

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="container flex justify-center items-center flex-col h-full">
        <OptForm />
      </div>
    </div>
  );
};

export default EmailVerify;
