export const status = {
  open: { color: "gray", label: "offen" },
  ongoing: { color: "yellow", label: "in Bearbeitung" },
  revision: { color: "orange", label: "in Revision" },
  completed: { color: "green", label: "abgeschlossen" },
  incomplete: { color: "red", label: "unvollständig" },
};

export const revisionModels = [
  {
    type: "firstaidoperation",
    model: "firstAidOperation",
    url: "/protocols/first-aid-operation/",
  },
  {
    type: "groupregistration",
    model: "groupRegistration",
    url: "/protocols/group-registration/",
  },
  {
    type: "towerday",
    model: "towerDay",
    url: "/tower-days/",
  },
  { type: "searchlist", model: "searchList", url: "/protocols/search-list/" },
];

export const towerStatus = [
  { value: "lifeguard_on_duty", label: "Wasserrettung im Dienst" },
  {
    value: "use_caution_when_swimming",
    label: "Baden und Schwimmen gefährlich",
  },
  { value: "beach_closed", label: "Baden und Schwimmen verboten" },
];

export const authRoutes = [
  "sign-in",
  "sign-up",
  "sign-out",
  "verify",
  "forgot-password",
  "reset-password",
];

export const protectedRoutes = [
  "/accomodations",
  "/dashboard",
  "/protocols",
  "/settings",
  "/tower-days",
  "/towers",
  "/users",
];
