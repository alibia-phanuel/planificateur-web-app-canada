/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import { FaChevronDown } from "react-icons/fa"; // or any other icon
import { LogOut, MailCheck } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Calendar,
  ClipboardList,
  DollarSign,
  Bell,
  Star,
  HelpCircle,
  Settings,
} from "lucide-react";
import { useContext, useState } from "react";
import { AppContent } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export function AppSidebar() {
  const t = useTranslations("menu");
  const [menuOpen, setMenuOpen] = useState(false);
  const context = useContext(AppContent);
  const router = useRouter(); // ✅ instantiate the router
  if (!context) throw new Error("AppContent not provided");
  const { userData, backendUrl, setUserData, setIsLoggeding } = context;

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`,
        { userId: userData.id }
      );

      if (data.success) {
        router.push("/email-verify");
        toast.success(t(data.messageKey));
      } else {
        toast.error(t(data.messageKey));
      }
    } catch (error: any) {
      console.error(error);
      toast.error(t("otpSendError")); // generic fallback
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);

      if (data.success) {
        setIsLoggeding(false);
        setUserData(null);
        toast.success(t(data.messageKey)); // translate message
        router.push("/");
      } else {
        toast.error(t(data.messageKey)); // translate error message
      }
    } catch (error: any) {
      console.error(error);
      toast.error(t("logoutError")); // generic fallback if server error
    }
  };
  const itemsPricipalMenu = [
    {
      title: t("agenda"),
      url: "/Agenda",
      icon: ClipboardList,
    },
    {
      title: t("month"),
      url: "/Mois",
      icon: Calendar,
    },
    {
      title: t("budget"),
      url: "/Budget",
      icon: DollarSign,
    },
    {
      title: t("settings"),
      url: "/Settings",
      icon: Settings,
    },
  ];
  const itemsOptionalMenu = [
    {
      title: t("notifications"),
      url: "/Notifications",
      icon: Bell,
    },
    {
      title: t("premium"),
      url: "/Premium",
      icon: Star,
    },
    {
      title: t("help_support"),
      url: "/Aide",
      icon: HelpCircle,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex gap-2 items-center justify-center p-1 rounded cursor-pointer dark:bg-[#f1f0f0]">
            <Image
              src="/images/logo&iones/logo.svg"
              width={120}
              height={120}
              alt="Picture of the author"
            />
          </SidebarGroupContent>
          <SidebarGroupLabel>{t("application")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsPricipalMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>{t("account_and_services")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsOptionalMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* here the footer */}
        {userData && (
          <SidebarMenu>
            <SidebarMenuItem className="flex gap-2 items-center justify-center p-1 rounded cursor-pointer bg-white text-black dark:bg-[#030712] dark:text-white">
              <div
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Avatar className="flex justify-center items-center p-[3px]">
                  <AvatarImage src="/images/profile.png" />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-bold text-xl text-gray-500 dark:text-white lowercase">
                    {userData.name}
                  </p>
                  <p className="text-sm">{userData.email}</p>
                </div>
                <FaChevronDown
                  className={`transition-transform ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {menuOpen && (
                <div className="absolute bottom-[100%] right-0 left-0 z-10 mt-2   bg-white text-black dark:bg-[#030712] dark:text-white border p-2 min-w-[190px] shadow-md">
                  <ul>
                    {!userData.isAccountVerified && (
                      <li
                        onClick={sendVerificationOtp}
                        className="py-1 px-2 cursor-pointer text-sm flex items-center gap-2"
                      >
                        <MailCheck size={16} />
                        {t("verify_email")}
                      </li>
                    )}
                    <li
                      onClick={logout}
                      className="py-1 px-2 cursor-pointer text-sm flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      {t("logout")}
                    </li>
                  </ul>
                </div>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
