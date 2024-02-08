import {
  IconFirstAidKit,
  IconUserSearch,
  IconWriting,
} from "@tabler/icons-react";

export const protocolLinks = [
  {
    id: "first-aid-operation-protocol",
    link: "/protocols/first-aid-operation",
    name: "Erste-Hilfe-Einsatz",
    icon: <IconFirstAidKit />,
  },
  {
    id: "group-registration-protocol",
    link: "/protocols/group-registration",
    name: "Dokumentation Kinder Gruppen",
    icon: <IconWriting />,
  },
  {
    id: "search-list-protocol",
    link: "/protocols/search-list",
    name: "Personen Suchliste",
    icon: <IconUserSearch />,
  },
];
