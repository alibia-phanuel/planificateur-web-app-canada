/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AppContent } from "@/context/AppContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // ✅ import

const OtpForm = () => {
  const [otp, setOtp] = useState("");
  const context = useContext(AppContent);
  const router = useRouter(); // ✅ instancier le router
  if (!context) throw new Error("AppContent non fourni");
  const { backendUrl, getUserData, userData, isLoggedin } = context;
  /**
   * Gère les changements dans le champ de saisie de l'OTP.
   * Met à jour la valeur de l'OTP et affiche la valeur actuelle dans la console.
   * Si l'OTP est entièrement saisi (6 chiffres), l'envoie à l'API de vérification.
   * Affiche un message de succès et redirige vers la page de connexion en cas de vérification réussie.
   * Affiche une notification d'erreur en cas de problème lors de la vérification.
   *
   * @param value - La valeur actuelle de l'OTP saisie par l'utilisateur.
   */

  const handleChange = async (value: string) => {
    try {
      setOtp(value);

      if (value.length === 6) {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/verify-account`,
          {
            id: userData.id,
            otp: value,
          }
        );
        if (data.success) {
          toast.success(t("accountVerified"));
          getUserData();
          router.push("/Agenda");
        } else {
          toast.error(t(data.message)); // Assure-toi que `data.message` est bien une des clés de `verifyEmail`
        }
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "otpVerificationError";

      // Utilisation de la clé si elle est traduisible, sinon message brut
      toast.error(t(msg) || msg);
    }
  };

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) {
      router.push("/");
    }
  }, [isLoggedin, userData, router]);
  const t = useTranslations("verifyEmail");
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-40">
        {t("title")}
      </h1>
      <p className="text-center mb-6 text-gray-40">{t("verify")}</p>

      <div className="flex justify-center items-center">
        <InputOTP maxLength={6} value={otp} onChange={handleChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
};

export default OtpForm;
