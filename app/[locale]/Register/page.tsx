"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslations } from "next-intl";
// ✅ Schéma de validation avec Zod
const formSchema = z
  .object({
    nom: z.string().min(2, {
      message: "Le nom doit contenir au moins 2 caractères.",
    }),
    email: z.string().email({ message: "L'email n'est pas valide." }),
    password: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères.",
    }),
    confirmPassword: z.string().min(6, {
      message:
        "Le mot de passe de confirmation doit contenir au moins 6 caractères.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export default function Register() {
  const t = useTranslations("Register");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex justify-center items-center py-8 px-4 md:h-[calc(100vh)] max-md:min-h-screen w-full">
      <div className="container flex gap-4 items-center border h-full shadow rounded">
        <div className="w-1/2 max-md:w-full h-full flex flex-col items-center justify-between">
          <div className="w-[75%] relative md:top-20">
            <div className="bg-[url('/images/time.png')] md:hidden p-4 h-full min-h-[250px] max-md:h-[150px] bg-yellow-300 rounded-lg flex-1 bg-cover bg-center bg-no-repeat"></div>
            <h1 className="text-[40px] max-md:text-[30px]">
              {t("welcome")} 👋
            </h1>
            <p className="mb-10">{t("infos")}</p>
          </div>

          <div className=" justify-center items-center gap-2 mt-4 flex flex-col px-4 text-center">
            <LanguageSelector />
            <p>{t("language")} </p>
          </div>
          <div className="w-[75%] my-4 mt-8 relative md:bottom-15">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                {/* Champ Nom */}
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t("form_name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("placeholder_name")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Champ Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t("form_Email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("placeholder_eMAIL")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Champ Mot de passe */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t("form_password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("placeholder_password")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Champ Confirmation Mot de passe */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t("form_Cpasword")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("placeholder_Cpassword")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="bg-[#4a9cac] w-full cursor-pointer"
                >
                  {t("connect")}
                </Button>
              </form>
            </Form>
            <p className="text-center my-4">
              {t("connect_to")}{" "}
              <Link href="/" className="underline">
                {t("log")}
              </Link>
            </p>
          </div>

          <div className="text-center text-[#303030] italic my-4 text-[15px]">
            {t("footer")}
          </div>
        </div>
        <div className="bg-[url('/images/time.png')] max-md:hidden p-4 h-full rounded-lg flex-1 bg-cover bg-center bg-no-repeat"></div>
      </div>
    </div>
  );
}
