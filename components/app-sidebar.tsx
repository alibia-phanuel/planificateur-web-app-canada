import Image from "next/image";
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

// Menu principal
const itemsPricipalMenu = [
  {
    title: "Agenda",
    url: "/Agenda",
    icon: ClipboardList, // Liste de tâches
  },
  {
    title: "Mois",
    url: "/Mois",
    icon: Calendar, // Vue mensuelle
  },
  {
    title: "Budget",
    url: "/Budget",
    icon: DollarSign, // Gestion financière
  },
  {
    title: "Paramètres",
    url: "/Settings",
    icon: Settings, // Réglages
  },
];

// Menu optionnel
const itemsOptionalMenu = [
  {
    title: "Notifications",
    url: "/Notifications",
    icon: Bell, // Alertes et rappels
  },
  {
    title: "Premium",
    url: "/Premium",
    icon: Star, // Fonctionnalités premium
  },
  {
    title: "Aide & Support",
    url: "/Aide",
    icon: HelpCircle, // Assistance et FAQ
  },
];
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex justify-center items-center">
            <Image
              src="/images/logo&iones/logo.jpg"
              width={130}
              height={130}
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
          <SidebarMenuItem>Footer</SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
