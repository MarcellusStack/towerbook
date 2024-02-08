import {
  IconLayoutDashboard,
  IconBuildingBroadcastTower,
  IconUsers,
  IconClipboard,
  IconCalendarPin,
  IconBroadcast,
  IconBed,
  IconUserShield,
} from "@tabler/icons-react";

export type NavLinkProps = {
  id: string;
  href: string;
  icon: React.ReactNode;
  name: string;
  disabled?: boolean;
};

export const navLinks: NavLinkProps[] = [
  {
    id: "nav-GD5KD7GNBB",
    href: "/dashboard",
    icon: <IconLayoutDashboard stroke={1.5} />,
    name: "Dashboard",
  },
  {
    id: "nav-2TCR0AX9Z2",
    href: "/towers",
    icon: <IconBuildingBroadcastTower stroke={1.5} />,
    name: "Türme",
  },
  {
    id: "nav-2TABHEZ5AS",
    href: "/tower-days",
    icon: <IconBroadcast stroke={1.5} />,
    name: "Turmtage",
  },

  {
    id: "nav-KCA6IGWBSW",
    href: "/protocols",
    icon: <IconClipboard stroke={1.5} />,
    name: "Protokolle",
  },
  {
    id: "nav-U24ETU174O",
    href: "/users",
    icon: <IconUsers stroke={1.5} />,
    name: "Benutzer",
  },
  {
    id: "nav-UHDSGAS5HJ",
    href: "/permissions",
    icon: <IconUserShield stroke={1.5} />,
    name: "Berechtigungen",
  },

  {
    id: "nav-ZCQ3ZSEKLJ",
    href: "/duty-plans",
    icon: <IconCalendarPin stroke={1.5} />,
    name: "Monatsplan",
    disabled: true,
  },
  {
    id: "nav-HEGSGR52GS",
    href: "/accomodations",
    icon: <IconBed stroke={1.5} />,
    name: "Unterkünfte",
  },
];
