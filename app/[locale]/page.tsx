/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AppContent } from "@/context/AppContext";
import { useRouter } from "next/navigation"; // ✅ import
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function Home() {
  const router = useRouter(); // ✅ instancier le router
  const context = useContext(AppContent);
  if (!context) throw new Error("AppContent non fourni");
  const { backendUrl, setIsLoggeding, getUserData } = context;
  const t = useTranslations("auth");

  const validationMessage = useTranslations("validation");
  const formSchema = z.object({
    email: z.string().email({ message: validationMessage("email_invalid") }),
    password: z.string().min(6, {
      message: validationMessage("password_min"),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
        email: values.email,
        password: values.password,
      });

      if (data.success) {
        setIsLoggeding(true);
        setTimeout(() => {
          getUserData();
          toast.success(validationMessage(data.messageKey)); // ✅ traduction
          router.push("/Agenda");
        }, 100);
      } else {
        toast.error(validationMessage(data.messageKey)); // ✅ traduction
      }
    } catch (error: any) {
      const messageKey = error.response?.data?.messageKey || "internalError";
      toast.error(validationMessage(messageKey)); // ✅ fallback error
    }
  }

  return (
    <div className="flex justify-center items-center py-8 px-4 md:h-[calc(100vh)] max-md:min-h-screen w-full">
      <div className="container flex gap-4 items-center border h-full shadow rounded">
        <div className="w-1/2 max-md:w-full h-full flex flex-col items-center justify-between">
          <div className="w-[75%] relative md:top-20">
            <div className="bg-[url('/images/time.png')] md:hidden p-4 h-full min-h-[250px] max-md:h-[150px] bg-yellow-300 rounded-lg flex-1 bg-cover bg-center bg-no-repeat"></div>
            <h1 className="text-[40px] max-md:text-[30px]">{t("welcome")}</h1>
            <p>{t("today")}</p>
            <p>{t("signin.title")}</p>
          </div>
          <div className=" justify-center items-center gap-2 mt-4 flex flex-col px-4 text-center">
            <LanguageSelector />
            <p>{t("selectLangue")}</p>
          </div>
          <div className="w-[75%] my-4 relative md:bottom-15">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t("form.email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.placeholder_eMAIL")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t("form.password")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.placeholder_password")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link href="/ForgotPassword" className="underline mb-4">
                  <FormDescription className="my-4">
                    {t("ForgotPassword")}
                  </FormDescription>
                </Link>

                <Button
                  type="submit"
                  className="bg-[#4a9cac] w-full cursor-pointer"
                >
                  {t("signinLink")}
                </Button>
              </form>
            </Form>

            <p className="text-center my-4">
              {t("signin.noAccount")}{" "}
              <Link href="/Register" className="underline">
                {t("signin.signupLink")}
              </Link>
            </p>
          </div>

          <div className="text-center text-[#303030] italic my-4 text-[15px]">
            {t("copyright")}
          </div>
        </div>
        <div className="bg-[url('/images/time.png')] max-md:hidden p-4 h-full rounded-lg flex-1 bg-cover bg-center bg-no-repeat"></div>
      </div>
    </div>
  );
}
