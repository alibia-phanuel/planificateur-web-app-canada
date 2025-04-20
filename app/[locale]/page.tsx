"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  email: z.string().email({ message: "L'email n'est pas valide." }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
});

export default function Home() {
  const t = useTranslations("auth");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
            <h1 className="text-[40px] max-md:text-[30px]">{t("welcome")}</h1>
            <p>{t("today")}</p>
            <p>{t("signin.title")}</p>
          </div>
          <div className="flex justify-center items-center gap-2 mt-4">
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
                        <Input placeholder="Votre Email ..." {...field} />
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
                          placeholder="Votre mot de passe ..."
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
