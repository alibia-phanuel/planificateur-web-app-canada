"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslations } from "next-intl";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AnimatePresence, motion } from "framer-motion";
import { AppContent } from "@/context/AppContext";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const t = useTranslations("forgotPassword");
  const router = useRouter();
  const context = useContext(AppContent);
  if (!context) throw new Error("AppContent non fourni");
  const { backendUrl } = context;

  const [step, setStep] = useState<"email" | "otp" | "newPassword">("email");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const emailSchema = z.object({
    email: z.string().email(t("invalidEmail")),
  });

  const otpSchema = z.object({
    otp: z.string().length(6, t("invalidOtp")),
  });

  const newPasswordSchema = z
    .object({
      password: z.string().min(6, t("shortPassword")),
      confirmPassword: z.string().min(6, t("shortConfirm")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("passwordMismatch"),
    });

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const newPasswordForm = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const handleEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
    try {
      toast.info(t("sendingEmail"));
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        {
          email: values.email,
        }
      );

      if (data.success) {
        toast.success(t(data.message)); // Exemple: t("forgotPassword.otpSent")
        setEmail(values.email);
        setStep("otp");
      } else {
        toast.error(t(data.message)); // Exemple: t("forgotPassword.userNotFound")
      }
    } catch (error: any) {
      toast.error(t(error.response?.data?.message) || t("otpSendError"));
    }
  };

  const handleOtpSubmit = async () => {
    toast.info(t("verifying"));
    const result = otpSchema.safeParse({ otp });
    if (!result.success) {
      toast.error(result.error.errors[0].message); // Ce message est déjà traduit via Zod + t()
      return;
    }
    try {
      // Exemple : appel API ici
      setStep("newPassword");
      toast.success(t("valid"));
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("invalid"));
    }
  };

  const handleNewPasswordSubmit = async (
    values: z.infer<typeof newPasswordSchema>
  ) => {
    toast.info(t("resetting"));
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        {
          email,
          otp,
          newPassword: values.password,
        }
      );
      if (data.success) {
        toast.success(data.message); // message déjà traduit côté backend si besoin
        router.push("/");
      } else {
        toast.error(data.message); // idem
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("error"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <AnimatePresence mode="wait">
        {step === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-md w-full p-6 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md min-w-[500px]"
          >
            <h1 className="text-2xl font-bold text-center mb-4">
              {t("title")}
            </h1>
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t("emailLabel")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("emailPlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-[#4a9cac]">
                  {t("send")}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}

        {step === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-md w-full p-6 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md min-w-[500px]"
          >
            <h1 className="text-2xl font-bold text-center mb-4">
              {t("otpTitle")}
            </h1>
            <p className="text-center mb-6">{t("otpInstruction")}</p>
            <div className="flex justify-center items-center mb-6">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
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
            <Button onClick={handleOtpSubmit} className="w-full bg-[#4a9cac]">
              {t("verify")}
            </Button>
          </motion.div>
        )}

        {step === "newPassword" && (
          <motion.div
            key="newPassword"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-md w-full p-6 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md min-w-[500px]"
          >
            <h1 className="text-2xl font-bold text-center mb-4">
              {t("newPasswordTitle")}
            </h1>
            <Form {...newPasswordForm}>
              <form
                onSubmit={newPasswordForm.handleSubmit(handleNewPasswordSubmit)}
              >
                <FormField
                  control={newPasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t("newPasswordLabel")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("passwordPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={newPasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>{t("confirmPasswordLabel")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("confirmPasswordPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-[#4a9cac]">
                  {t("change")}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResetPasswordForm;
