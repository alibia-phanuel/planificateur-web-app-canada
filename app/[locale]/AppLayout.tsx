"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideSidebarRoutes = [
    "/fr",
    "/en",
    "/fr/Register",
    "/en/Register",
    "/fr/ForgotPassword",
    "/en/ForgotPassword",
  ];

  return (
    <SidebarProvider>
      {!hideSidebarRoutes.includes(pathname) && <AppSidebar />}
      <main className="flex w-full relative">
        {!hideSidebarRoutes.includes(pathname) && (
          <SidebarTrigger
            title="menu"
            className="bg-[#4a9cac] cursor-pointer  top-5 mx-4 text-white shadow-2xl absolute "
          />
        )}
        {children}
      </main>
    </SidebarProvider>
  );
}
