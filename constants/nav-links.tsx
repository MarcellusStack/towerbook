import {
  IconLayoutDashboard,
  IconCheckupList,
  IconBuildingBroadcastTower,
  IconClipboardPlus,
  IconUserSearch,
  IconUsersGroup,
  IconUsers,
  IconClipboard,
  IconCalendarPin,
} from "@tabler/icons-react";

export type NavLinkProps = {
  id: string;
  href: string;
  icon: React.ReactNode;
  name: string;
};

export const navLinks: NavLinkProps[] = [
  {
    id: "nav-GD5KD7GNBB",
    href: "/dashboard",
    icon: (
      <IconLayoutDashboard
        style={{ width: "70%", height: "70%" }}
        stroke={1.5}
      />
    ),
    name: "Dashboard",
  },
  {
    id: "nav-2TCR0AX9Z2",
    href: "/towers",
    icon: (
      <IconBuildingBroadcastTower
        style={{ width: "70%", height: "70%" }}
        stroke={1.5}
      />
    ),
    name: "Türme",
  },
  {
    id: "nav-KCA6IGWBSW",
    href: "/protocols",
    icon: (
      <IconClipboard style={{ width: "70%", height: "70%" }} stroke={1.5} />
    ),
    name: "Protokolle",
  },
  {
    id: "nav-U24ETU174O",
    href: "/users",
    icon: <IconUsers style={{ width: "70%", height: "70%" }} stroke={1.5} />,
    name: "Benutzer",
  },
  {
    id: "nav-ZCQ3ZSEKLJ",
    href: "/duty-plan",
    icon: (
      <IconCalendarPin style={{ width: "70%", height: "70%" }} stroke={1.5} />
    ),
    name: "Dienstplan",
  },
];
