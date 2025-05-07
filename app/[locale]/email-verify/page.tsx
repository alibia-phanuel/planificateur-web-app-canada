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
    if (isLoggedin && userData && userData.isAccountVerified) {
      router.push("/Agenda");
    }
  }, [isLoggedin, userData, router]);
  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="container flex justify-center items-center flex-col h-full">
        <OptForm />
      </div>
    </div>
  );
};

export default EmailVerify;
