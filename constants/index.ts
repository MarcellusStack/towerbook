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
      { name: "Organisation erstellen", field: "createOrganization" },
      { name: "Organisation lesen", field: "readOrganization" },
      { name: "Organisation bearbeiten", field: "updateOrganization" },
      { name: "Organisation löschen", field: "deleteOrganization" },
    ],
  },
  {
    name: "Einladung",
    permissions: [
      {
        name: "Einladung erstellen",
        field: "createInvitation",
      },
      {
        name: "Einladung lesen",
        field: "readInvitation",
      },
      {
        name: "Einladung bearbeiten",
        field: "updateInvitation",
      },
      {
        name: "Einladung löschen",
        field: "deleteInvitation",
      },
    ],
  },
  {
    name: "Turm",
    permissions: [
      {
        name: "Turm erstellen",
        field: "createTower",
      },
      {
        name: "Turm lesen",
        field: "readTower",
      },
      {
        name: "Turm bearbeiten",
        field: "updateTower",
      },
      {
        name: "Turm löschen",
        field: "deleteTower",
      },
    ],
  },
  {
    name: "Turm Tag",
    permissions: [
      {
        name: "Turm Tag erstellen",
        field: "createTowerday",
      },
      { name: "Turm Tag lesen", field: "readTowerday" },
      { name: "Turm Tag bearbeiten", field: "updateTowerday" },
      { name: "Turm Tag löschen", field: "deleteTowerday" },
      { name: "Turm Tag abschließen", field: "completeTowerday" },
      {
        name: "Turm Tag Abschnitt abschließen",
        field: "completeTowerdaySection",
      },
      {
        name: "Turm Tag Abschnitt zurücksetzen",
        field: "resetTowerdaySection",
      },
    ],
  },
  {
    name: "Dienstplan",
    permissions: [
      {
        name: "Dienstplan erstellen",
        field: "createDutyplan",
      },
      { name: "Dienstplan lesen", field: "readDutyplan" },
      { name: "Dienstplan bearbeiten", field: "updateDutyplan" },
      { name: "Dienstplan löschen", field: "deleteDutyplan" },
    ],
  },
  {
    name: "Benutzer",
    permissions: [
      { name: "Benutzer erstellen", field: "createUser" },
      { name: "Benutzer lesen", field: "readUser" },
      { name: "Benutzer bearbeiten", field: "updateUser" },
      { name: "Benutzer löschen", field: "deleteUser" },
    ],
  },
  {
    name: "Protokoll",
    permissions: [
      { name: "Protokoll erstellen", field: "createProtocol" },
      { name: "Protokoll lesen", field: "readProtocol" },
      { name: "Protokoll bearbeiten", field: "updateProtocol" },
      { name: "Protokoll löschen", field: "deleteProtocol" },
      { name: "Protokoll abschließen", field: "completeProtocol" },
    ],
  },
  {
    name: "Revision",
    permissions: [
      {
        name: "Revision erstellen",
        field: "createRevision",
      },
      { name: "Revision lesen", field: "readRevision" },
      { name: "Revision bearbeiten", field: "updateRevision" },
      { name: "Revision löschen", field: "deleteRevision" },
    ],
  },
  {
    name: "Unterkunft",
    permissions: [
      { name: "Unterkunft erstellen", field: "createAccomodation" },
      { name: "Unterkunft lesen", field: "readAccomodation" },
      { name: "Unterkunft bearbeiten", field: "updateAccomodation" },
      { name: "Unterkunft löschen", field: "deleteAccomodation" },
    ],
  },
  {
    name: "Buchen/Reservierung(Unterkunft)",
    permissions: [
      { name: "Buchung erstellen", field: "createBooking" },
      { name: "Buchung lesen", field: "readBooking" },
      { name: "Buchung bearbeiten", field: "updateBooking" },
      { name: "Buchung löschen", field: "deleteBooking" },
    ],
  },
  {
    name: "Berechtigung",
    permissions: [
      {
        name: "Berechtigung erstellen",
        field: "createPermission",
      },
      { name: "Berechtigung lesen", field: "readPermission" },
      { name: "Berechtigung bearbeiten", field: "updatePermission" },
      { name: "Berechtigung löschen", field: "deletePermission" },
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
