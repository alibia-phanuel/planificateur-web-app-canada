import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

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

export function AppSidebar() {
  const t = useTranslations("menu");

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
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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
          <SidebarGroupLabel>Compte et Services</SidebarGroupLabel>
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
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2 items-center justify-center p-1 rounded cursor-pointer  bg-white text-black dark:bg-[#030712] dark:text-white">
            <Avatar className="flex justify-center items-center  p-[3px] ">
              <AvatarImage src="/images/profile.png" />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-bold text-xl text-gray-500   dark:text-white lowercase ">
                alibia
              </p>
              <p className="text-sm">phanuel.alibia@gmail.com</p>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
