import type { LucideIcon } from "lucide-react";
import { Users, BarChart3, Clapperboard, Settings, Trello } from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Team",
    href: "/team",
    icon: Users,
  },
  {
    title: "Tactical Board",
    href: "/tactical-board",
    icon: Trello,
  },
  {
    title: "Stats",
    href: "/stats",
    icon: BarChart3,
  },
  {
    title: "Clips",
    href: "/clips",
    icon: Clapperboard,
  },
  {
    title: "Configuration",
    href: "/config",
    icon: Settings,
  },
];
