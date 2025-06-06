"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppContent } from "../context/AppContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const context = useContext(AppContent);
  const router = useRouter();

  const isLoggedin = context?.isLoggedin ?? false;
  const isLoading = context?.isLoading ?? true;

  // ✅ useEffect est toujours appelé, même si le contexte est undefined
  useEffect(() => {
    if (!isLoading && !isLoggedin) {
      router.replace("/"); // redirection vers login
    }
  }, [isLoading, isLoggedin, router]);

  if (isLoading) {
    return (
      <div className="text-center p-4 flex items-center justify-center w-full">
        <p>⏳ Vérification de la session...</p>
      </div>
    );
  }

  if (!isLoggedin) {
    return (
      <div className="text-center p-4 flex items-center justify-center  w-full">
        <p>🔒 Redirection en cours...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
