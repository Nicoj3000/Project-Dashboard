import { LucideIcon } from "lucide-react";

export type SidebarItemProps = {
  item: {
    icon: LucideIcon;
    label: string;
    href: string;
  };
  key: string;
};
