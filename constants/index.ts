export const status = {
  open: { color: "gray", label: "offen" },
  ongoing: { color: "yellow", label: "in Bearbeitung" },
  revision: { color: "orange", label: "in Revision" },
  completed: { color: "green", label: "abgeschlossen" },
  incomplete: { color: "red", label: "unvollständig" },
};

export const bookingStatus = {
  open: { color: "gray", label: "offen" },
  confirmed: { color: "green", label: "bestätigt" },
  request_canceled: { color: "yellow", label: "Stornierungsanfrage" },
  canceled: { color: "red", label: "storniert" },
};

export const tableColumnProps = {
  resizable: true,
  toggleable: true,
  draggable: true,
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

export const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/sign-out",
  "/verify",
  "/forgot-password",
  "/reset-password",
];

export const protectedRoutes = [
  "/onboarding",
  "/organization",
  "/accomodations",
  "/dashboard",
  "/protocols",
  "/settings",
  "/tower-days",
  "/towers",
  "/users",
];

export const permissions = [
  {
    name: "Organisation",
    permissions: [
      "createOrganization",
      "readOrganization",
      "updateOrganization",
      "deleteOrganization",
    ],
  },
  {
    name: "Einladung",
    permissions: [
      "createInvitation",
      "readInvitation",
      "updateInvitation",
      "deleteInvitation",
    ],
  },
  {
    name: "Turm",
    permissions: ["createTower", "readTower", "updateTower", "deleteTower"],
  },
  {
    name: "Turm Tag",
    permissions: [
      "createTowerday",
      "readTowerday",
      "updateTowerday",
      "deleteTowerday",
      "completeTowerdaySection",
      "completeTowerday",
    ],
  },
  {
    name: "Dienstplan",
    permissions: [
      "createDutyplan",
      "readDutyplan",
      "updateDutyplan",
      "deleteDutyplan",
    ],
  },
  {
    name: "Benutzer",
    permissions: ["createUser", "readUser", "updateUser", "deleteUser"],
  },
  {
    name: "Protokoll",
    permissions: [
      "createProtocol",
      "readProtocol",
      "updateProtocol",
      "deleteProtocol",
      "completeProtocol",
    ],
  },
  {
    name: "Revision",
    permissions: [
      "createRevision",
      "readRevision",
      "updateRevision",
      "deleteRevision",
    ],
  },
  {
    name: "Unterkunft",
    permissions: [
      "createAccomodation",
      "readAccomodation",
      "updateAccomodation",
      "deleteAccomodation",
    ],
  },
  {
    name: "Buchen/Reservierung(Unterkunft)",
    permissions: [
      "createBooking",
      "readBooking",
      "updateBooking",
      "deleteBooking",
    ],
  },
  {
    name: "Berechtigung",
    permissions: [
      "createPermission",
      "readPermission",
      "updatePermission",
      "deletePermission",
    ],
  },
];

export const userCertificateLinks = [
  { label: "Schwimmen", link: "#swim" },
  { label: "Medizinisch", link: "#medical" },
  { label: "Führungsausbildung", link: "#leadership-training" },
  { label: "Fahrzeug-Qualifikation", link: "#vehicle-qualification" },
  { label: "Funkzeugnisse", link: "#radio-certificate" },
  { label: "Sonstige Qualifikationen", link: "#other-qualification" },
  { label: "Ausbilder Qualifikation", link: "#instructor-qualification" },
  { label: "Unterweisungen", link: "#instructions" },
];

export const userLinks = [
  { label: "Stammdaten", link: "#base-data" },
  { label: "Notfallkontakt", link: "#emergency-contact" },
  { label: "Bankverbindung", link: "#bank-details" },
];
