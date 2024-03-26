import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Keine gültige E-Mail.",
  }),
  password: z
    .string()
    .min(6, { message: "Passwort muss mindestens 6 Zeichen lang sein." }),
});

export const organizationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name muss mindestens 3 Zeichen lang sein." }),
});

export const requestCancelBookingSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  cancelComment: z.string().min(1, { message: "Bemerkung wird benötigt" }),
});

export const shiftSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  startTime: z.date(),
  endTime: z.date(),
  type: z.string().min(1, { message: "Schicht Typ wird benötigt" }),
  user: z.object({
    id: z.string().min(1, { message: "User Id wird benötigt" }),
    firstName: z.string().min(1, { message: "Vorname wird benötigt" }),
    lastName: z.string().min(1, { message: "Nachname wird benötigt" }),
  }),
});

export const bookSchema = z.object({
  date: z.date(),
  accomodationId: z.string().min(1, { message: "Unterkunft Id wird benötigt" }),
  users: z.array(z.string()),
});

export const multipleBookSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  accomodationId: z.string().min(1, { message: "Unterkunft Id wird benötigt" }),
  users: z.array(z.string()),
});

export const baseUserSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Name muss mindestens 3 Zeichen lang sein." }),
  lastName: z
    .string()
    .min(3, { message: "Name muss mindestens 3 Zeichen lang sein." }),
  email: z.string().email({ message: "Ungültige E-Mail Adresse" }),
});

export const signUpSchema = z.intersection(
  baseUserSchema,
  z.object({
    password: z
      .string()
      .min(6, { message: "Passwort muss mindestens 6 Zeichen lang sein." }),
  })
);

export const onboardingSchema = z.object({
  firstName: z.string().min(1, { message: "Vorname wird benötigt" }),
  lastName: z.string().min(1, { message: "Nachname wird benötigt" }),
  birthDate: z.date(),
});

export const towerDayWatchmanPlanSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  guardLeader: z.string().min(1, { message: "Wachleiter wird benötigt" }),
  towerLeader: z.string().min(1, { message: "Turmleiter wird benötigt" }),
  watchman: z.array(
    z.object({ id: z.string(), firstName: z.string(), lastName: z.string() })
  ),
});

export const towerDayTodoSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  todo: z.array(
    z.object({
      id: z.string(),
      todo: z.string(),
      comment: z.string(),
      checked: z.boolean(),
    })
  ),
});

export const towerDayMaterialSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  material: z.array(
    z.object({
      id: z.string(),
      material: z.string(),
      checked: z.string(),
      comment: z.string(),
    })
  ),
});

export const towerDayIncidentSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  incident: z.array(
    z.object({
      id: z.string(),
      event: z.string(),
      description: z.string(),
    })
  ),
});

export const towerDayDutyPlanSchema = z.object({
  towerDayId: z.string().min(1, { message: "Id wird benötigt" }),
  towerId: z.string().min(1, { message: "Id wird benötigt" }),
  dutyPlanId: z.string().min(1, { message: "Id wird benötigt" }),
  shifts: z.array(shiftSchema),
});

export const dutyPlanSchema = z.object({
  towerId: z.string().min(1, { message: "Id wird benötigt" }),
  towerDayId: z.string().min(1, { message: "Id wird benötigt" }),
  date: z.date(),
});

export const towerDayWeatherSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  weather: z.array(
    z.object({
      id: z.string(),
      time: z.string(),
      air_in_celsius: z.string(),
      water_in_celsius: z.string(),
      wind_in_bft: z.string(),
      wind_direction: z.string(),
    })
  ),
});

export const towerDayFormStatusSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  form: z.string().min(1, { message: "Formular wird benötigt" }),
});

export const accountSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Name muss mindestens 3 Zeichen lang sein." }),
  lastName: z
    .string()
    .min(3, { message: "Name muss mindestens 3 Zeichen lang sein." }),
  gender: z.string().nullable(),
  salutation: z.string().nullable(),
  title: z.string().nullable(),
  birthName: z.string().nullable(),
  birthDate: z.date().nullable(),
  birthPlace: z.string().nullable(),
  street: z.string().nullable(),
  houseNumber: z.string().nullable(),
  zipCode: z.string().nullable(),
  location: z.string().nullable(),
  phone: z.string().nullable(),
  drkMember: z.boolean().nullable(),
  drkEmployee: z.boolean().nullable(),
  drkMemberLocation: z.string().nullable(),
  emergencyContactLastName: z.string().nullable(),
  emergencyContactFirstName: z.string().nullable(),
  emergencyContactPhone: z.string().nullable(),
  bankName: z.string().nullable(),
  iban: z.string().nullable(),
  bic: z.string().nullable(),
  differentBankholder: z.string().nullable(),
});

export const userAccountSchema = z.intersection(
  accountSchema,
  z.object({
    userId: z.string().min(1, { message: "User Id wird benötigt" }),
  })
);

export const userPermissionsSchema = z.object({
  id: z.string().min(1, { message: "User Id wird benötigt" }),
  permissions: z.array(
    z.object({ id: z.string().min(1), name: z.string().min(1) })
  ),
});

export const uploadFileSchema = z.object({
  file: z.string().min(1, { message: "Datei wird benötigt" }),
  fileName: z.string().min(1, { message: "Dateiname wird benötigt" }),
  userId: z.string().min(1, { message: "User Id wird benötigt" }),
});

export const downloadFileSchema = z.object({
  fileName: z.string().min(1, { message: "Dateiname wird benötigt" }),
});

export const createUserSchema = z.object({
  email: z.string().email({
    message: "Keine gültige E-Mail",
  }),
  password: z.string().min(8, {
    message: "Passwort wird benötigt und muss mindestens 8 Zeichen lang sein",
  }),
  firstName: z.string().min(1, { message: "Vorname wird benötigt" }),
  lastName: z.string().min(1, { message: "Nachname wird benötigt" }),
  birthDate: z.date({ invalid_type_error: "Geburtsdatum wird benötigt" }),
  permissionId: z.string().min(1, { message: "Berechtigung wird benötigt" }),
});

export const inviteUserSchema = z.object({
  email: z.string().email({
    message: "Keine gültige E-Mail",
  }),
  permissionId: z
    .string()
    .min(1, { message: "Bitte fügen Sie eine Berechtigung hinzu" }),
});

export const createAccomodationSchema = z.object({
  number: z.coerce
    .number()
    .min(1, { message: "Bitte fügen sie eine Nummer hinzu." }),
  name: z.string().min(1, { message: "Bitte fügen sie einen Namen hinzu." }),
  street: z.string().min(1, { message: "Bitte fügen sie eine Straße hinzu." }),
  zipCode: z
    .string()
    .min(1, { message: "Bitte fügen sie eine Postleitzahl hinzu." }),
  location: z
    .string()
    .min(1, { message: "Bitte fügen sie einen Standort hinzu." }),
  availableBeds: z.coerce
    .number()
    .min(1, { message: "Bitte fügen sie Betten hinzu." }),
});

export const updateAccomodationSchema = z.object({
  id: z.string().min(1, { message: "Bitte fügen sie eine Id hinzu." }),
  number: z.coerce
    .number()
    .min(1, { message: "Bitte fügen sie eine Nummer hinzu." }),
  name: z.string().min(1, { message: "Bitte fügen sie einen Namen hinzu." }),
  street: z.string().min(1, { message: "Bitte fügen sie eine Straße hinzu." }),
  zipCode: z
    .string()
    .min(1, { message: "Bitte fügen sie eine Postleitzahl hinzu." }),
  location: z
    .string()
    .min(1, { message: "Bitte fügen sie einen Standort hinzu." }),
  availableBeds: z.coerce
    .number()
    .min(1, { message: "Bitte fügen sie Betten hinzu." }),
});

export const createTowerSchema = z.object({
  name: z.string().min(1, { message: "Bitte fügen sie einen Namen hinzu." }),
  main: z.boolean(),
  type: z.string().min(1, { message: "Bitte fügen sie ein Typ hinzu." }),
  number: z
    .string()
    .min(1, { message: "Bitte fügen sie eine Turmnummer hinzu." }),
  location: z
    .string()
    .min(1, { message: "Bitte fügen sie einen Standort hinzu." }),
});

export const updateTowerSchema = z.object({
  id: z.string().min(1, { message: "Bitte fügen sie eine Id hinzu" }),
  name: z.string().min(1, { message: "Bitte fügen sie einen Namen hinzu" }),
  main: z.boolean(),
  type: z.string().min(1, { message: "Bitte fügen sie ein Typ hinzu" }),
  number: z
    .string()
    .min(1, { message: "Bitte fügen sie eine Turmnummer hinzu" }),
  location: z
    .string()
    .min(1, { message: "Bitte fügen sie einen Standort hinzu" }),
});

export const updatePermissionSchemaForm = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  name: z.string().min(1, { message: "Bitte fügen sie einen Namen hinzu" }),
  description: z
    .string()
    .min(1, { message: "Bitte fügen sie eine Beschreibung hinzu" }),
});

export const towerStatusSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  status: z.enum(
    ["lifeguard_on_duty", "use_caution_when_swimming", "beach_closed"],
    {
      errorMap: () => ({
        message: "Status wird benötigt",
      }),
    }
  ),
});

export const openTowerdaySchema = z.object({
  id: z.string().min(1, {
    message: "Id wird benötigt",
  }),
  startedAt: z.string().min(1, { message: "Öffnungszeit wird benötigt" }),
});

export const createTowerDaySchema = z.object({
  createdAt: z.date({ invalid_type_error: "Bitte fügen sie ein Datum hinzu." }),
  guardLeader: z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),

    firstName: z
      .string()
      .min(1, { message: "Bitte fügen sie einen Vornamen hinzu." }),
    lastName: z
      .string()
      .min(1, { message: "Bitte fügen sie einen Nachnamen hinzu." }),
  }),
  towerLeader: z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),

    firstName: z
      .string()
      .min(1, { message: "Bitte fügen sie einen Vornamen hinzu." }),
    lastName: z
      .string()
      .min(1, { message: "Bitte fügen sie einen Nachnamen hinzu." }),
  }),
  towerId: z.string().min(1),
  addTodo: z.boolean(),
  addMaterial: z.boolean(),
  addWeather: z.boolean(),
});

export const updatePermissionSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  name: z.string().min(1, { message: "Bitte fügen sie einen Namen hinzu" }),
  description: z
    .string()
    .min(1, { message: "Bitte fügen sie eine Beschreibung hinzu" }),
  isAdmin: z.boolean(),
  createOrganization: z.boolean(),
  readOrganization: z.boolean(),
  updateOrganization: z.boolean(),
  deleteOrganization: z.boolean(),
  createInvitation: z.boolean(),
  readInvitation: z.boolean(),
  updateInvitation: z.boolean(),
  deleteInvitation: z.boolean(),
  createTower: z.boolean(),
  readTower: z.boolean(),
  updateTower: z.boolean(),
  deleteTower: z.boolean(),
  createTowerday: z.boolean(),
  readTowerday: z.boolean(),
  updateTowerday: z.boolean(),
  deleteTowerday: z.boolean(),
  completeTowerday: z.boolean(),
  completeTowerdaySection: z.boolean(),
  resetTowerdaySection: z.boolean(),
  createDutyplan: z.boolean(),
  readDutyplan: z.boolean(),
  updateDutyplan: z.boolean(),
  deleteDutyplan: z.boolean(),
  createUser: z.boolean(),
  readUser: z.boolean(),
  updateUser: z.boolean(),
  deleteUser: z.boolean(),
  createProtocol: z.boolean(),
  readProtocol: z.boolean(),
  updateProtocol: z.boolean(),
  deleteProtocol: z.boolean(),
  completeProtocol: z.boolean(),
  createRevision: z.boolean(),
  readRevision: z.boolean(),
  updateRevision: z.boolean(),
  deleteRevision: z.boolean(),
  createAccomodation: z.boolean(),
  readAccomodation: z.boolean(),
  updateAccomodation: z.boolean(),
  deleteAccomodation: z.boolean(),
  createBooking: z.boolean(),
  readBooking: z.boolean(),
  updateBooking: z.boolean(),
  deleteBooking: z.boolean(),
  createPermission: z.boolean(),
  readPermission: z.boolean(),
  updatePermission: z.boolean(),
  deletePermission: z.boolean(),
});

export const createTowerDaysSchema = z.object({
  createdAt: z.date({ invalid_type_error: "Bitte fügen sie ein Datum hinzu." }),

  guardLeader: z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
    firstName: z
      .string()
      .min(1, { message: "Bitte fügen sie einen Vornamen hinzu." }),
    lastName: z
      .string()
      .min(1, { message: "Bitte fügen sie einen Nachnamen hinzu." }),
  }),
  towerdays: z.array(
    z.object({
      tower: z.object({
        id: z.string().min(1, { message: "Id wird benötigt" }),
        name: z
          .string()
          .min(1, { message: "Bitte fügen sie einen Namen hinzu." }),
        number: z
          .string()
          .min(1, { message: "Bitte fügen sie eine Turmnummer hinzu." }),
      }),
      towerLeader: z.object({
        id: z.string().min(1, { message: "Id wird benötigt" }),
        firstName: z
          .string()
          .min(1, { message: "Bitte fügen sie einen Vornamen hinzu." }),
        lastName: z
          .string()
          .min(1, { message: "Bitte fügen sie einen Nachnamen hinzu." }),
      }),
    })
  ),
  addTodo: z.boolean(),
  addMaterial: z.boolean(),
  addWeather: z.boolean(),
});

export const createSearchListSchema = z.object({
  date: z.date({ invalid_type_error: "Bitte fügen sie ein Datum hinzu." }),
  timeSearched: z
    .string()
    .min(1, { message: "Bitte fügen sie eine Zeit hinzu." }),
  firstName: z
    .string()
    .min(1, { message: "Bitte fügen sie einen Vornamen hinzu." }),
  lastName: z
    .string()
    .min(1, { message: "Bitte fügen sie einen Nachnamen hinzu." }),
  towerId: z.string().min(1),
});

export const createFirstAidOperationSchema = z.object({
  type: z.string().min(1, { message: "Bitte fügen sie ein Typ hinzu." }),
  date: z.date({ invalid_type_error: "Bitte fügen sie ein Datum hinzu." }),
  startTime: z.string().min(1, { message: "Bitte fügen sie eine Zeit hinzu." }),
  guardLeader: z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
    firstName: z.string(),
    lastName: z.string(),
  }),
  towerId: z.string().min(1),
});

export const updateFirstAidOperationSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  type: z.string().min(1, { message: "Bitte fügen sie ein Typ hinzu." }),
  date: z.date({ invalid_type_error: "Bitte fügen sie ein Datum hinzu." }),
  startTime: z.string().min(1, { message: "Bitte fügen sie eine Zeit hinzu." }),
  guardLeader: z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
    firstName: z.string(),
    lastName: z.string(),
  }),
  towerId: z.string().min(1),
});

export const updateTowerFirstAidOperationSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  type: z.string().min(1, { message: "Bitte fügen sie ein Typ hinzu." }),
  date: z.date({ invalid_type_error: "Bitte fügen sie ein Datum hinzu." }),
  startTime: z.string().min(1, { message: "Bitte fügen sie eine Zeit hinzu." }),
  guardLeader: z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
    firstName: z.string(),
    lastName: z.string(),
  }),
});

export const createGroupRegistrationSchema = z.object({
  date: z.date({ invalid_type_error: "Bitte fügen sie ein Datum hinzu." }),
  time: z.string().min(1, { message: "Bitte fügen sie eine Zeit hinzu." }),
  name: z
    .string()
    .min(1, { message: "Bitte fügen sie eine Gruppennamen hinzu." }),
  count: z
    .string()
    .min(1, { message: "Bitte fügen sie eine Gruppenanzahl hinzu." }),
  supervisorFirstName: z
    .string()
    .min(1, { message: "Bitte fügen sie einen Vornamen hinzu." }),
  supervisorLastName: z
    .string()
    .min(1, { message: "Bitte fügen sie einen Nachnamen hinzu." }),
  towerId: z.string().min(1),
});

export const deleteUserSchema = z.object({
  userId: z.string().min(1, { message: "User Id wird benötigt" }),
});

export const deleteSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
});

export const certificateSchema = z.object({
  lifeguardLicense: z.string().nullable(),
  lifeguardLicenseExpiration: z.date().nullable(),
  snorkelLicense: z.string().nullable(),
  snorkelLicenseExpiration: z.date().nullable(),
  lifeguardWaterRescueService: z.string().nullable(),
  lifeguardWaterRescueServiceExpiration: z.date().nullable(),
  waterRescuer: z.string().nullable(),
  waterRescuerExpiration: z.date().nullable(),
  riverRescuer: z.string().nullable(),
  riverRescuerExpiration: z.date().nullable(),
  medicalTraining: z.string().nullable(),
  medicalTrainingExpiration: z.date().nullable(),
  paramedicHelper: z.string().nullable(),
  paramedicHelperExpiration: z.date().nullable(),
  paramedic: z.string().nullable(),
  paramedicExpiration: z.date().nullable(),
  paramedicAssistance: z.string().nullable(),
  paramedicAssistanceExpiration: z.date().nullable(),
  paramedicEmergency: z.string().nullable(),
  paramedicEmergencyExpiration: z.date().nullable(),
  physician: z.string().nullable(),
  physicianExpiration: z.date().nullable(),
  physicianEmergency: z.string().nullable(),
  physicianEmergencyExpiration: z.date().nullable(),
  squadLeader: z.string().nullable(),
  squadLeaderExpiration: z.date().nullable(),
  groupLeader: z.string().nullable(),
  groupLeaderExpiration: z.date().nullable(),
  guardLeader: z.string().nullable(),
  guardLeaderExpiration: z.date().nullable(),
  trainLeader: z.string().nullable(),
  trainLeaderExpiration: z.date().nullable(),
  carDrivingLicense: z.string().nullable(),
  carDrivingLicenseExpiration: z.date().nullable(),
  blueLightInstruction: z.string().nullable(),
  blueLightInstructionExpiration: z.date().nullable(),
  boatmanLake: z.string().nullable(),
  boatmanLakeExpiration: z.date().nullable(),
  boatmanInland: z.string().nullable(),
  boatmanInlandExpiration: z.date().nullable(),
  lifeboatOperator: z.string().nullable(),
  lifeboatOperatorExpiration: z.date().nullable(),
  rwcPilotStage: z.string().nullable(),
  rwcPilotStageExpiration: z.date().nullable(),
  fasty: z.string().nullable(),
  fastyExpiration: z.date().nullable(),
  srcCertificate: z.string().nullable(),
  srcCertificateExpiration: z.date().nullable(),
  bosCertificate: z.string().nullable(),
  bosCertificateExpiration: z.date().nullable(),
  droneClass: z.string().nullable(),
  droneClassExpiration: z.date().nullable(),
  volunteerDataSheet: z.string().nullable(),
  volunteerDataSheetExpiration: z.date().nullable(),
  youthLeaderCard: z.string().nullable(),
  youthLeaderCardExpiration: z.date().nullable(),
  instructorSwimmer: z.string().nullable(),
  instructorSwimmerExpiration: z.date().nullable(),
  lifeguardInstructor: z.string().nullable(),
  lifeguardInstructorExpiration: z.date().nullable(),
  instructorWaterRescuer: z.string().nullable(),
  instructorWaterRescuerExpiration: z.date().nullable(),
  instructorMedicalService: z.string().nullable(),
  instructorMedicalServiceExpiration: z.date().nullable(),
  guardWalker: z.string().nullable(),
  guardWalkerExpiration: z.date().nullable(),
  boat: z.string().nullable(),
  boatExpiration: z.date().nullable(),
  car: z.string().nullable(),
  carExpiration: z.date().nullable(),
  rwc: z.string().nullable(),
  rwcExpiration: z.date().nullable(),
  guardLeaderInstruction: z.string().nullable(),
  guardLeaderInstructionExpiration: z.date().nullable(),
});

export const userCertificateSchema = z.intersection(
  certificateSchema,
  z.object({
    userId: z.string().min(1, { message: "User Id wird benötigt" }),
  })
);

const signaturePointSchema = z.object({
  x: z.coerce.number(),
  y: z.coerce.number(),
  time: z.coerce.number(),
  color: z.string(),
});

const signatureArraySchema = z.array(signaturePointSchema);

const signatureSchema = z.array(signatureArraySchema);

export const searchListSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
  lifeguard: z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
    firstName: z
      .string()
      .min(1, { message: "Bitte fügen sie einen Vornamen hinzu." }),
    lastName: z
      .string()
      .min(1, { message: "Bitte fügen sie einen Nachnamen hinzu." }),
  }),

  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  age: z.string().nullable(),
  stature: z.string().nullable(),
  height: z.string().nullable(),
  clothing: z.string().nullable(),
  previousIllness: z.string().nullable(),
  firstNameReportingPerson: z.string().nullable(),
  lastNameReportingPerson: z.string().nullable(),
  phoneReportingPerson: z.string().nullable(),
  description: z.string().nullable(),
  lastSeen: z.string().nullable(),
  lastLocation: z.string().nullable(),
  informationPolice: z.string().nullable(),
  informationFireDepartment: z.string().nullable(),
  informationBeachVogt: z.string().nullable(),
  chainDiving: z.string().nullable(),
  searchQuad: z.string().nullable(),
  beachPatrol: z.string().nullable(),
  searchByBoat: z.string().nullable(),
  searchByDrone: z.string().nullable(),
  searchRWC: z.string().nullable(),
  supportOtherBeachArea: z.string().nullable(),
  timeFound: z.string().nullable(),
  handOverTo: z.string().nullable(),
  signature: signatureSchema,
});

export const firstAidOperationBigSchema = z.object({
  id: z.string().min(1),
  healthInsurance: z.string().nullable(),
  lastName: z.string().nullable(),
  firstName: z.string().nullable(),
  address: z.string().nullable(),
  birthDate: z.date().nullable(),
  cashRegisterNumber: z.string().nullable(),
  insuranceNumber: z.string().nullable(),
  operationNumberControlCenter: z.string().nullable(),
  operationNumberWRD: z.string().nullable(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
  operationLocation: z.string().nullable(),
  guardLeader: z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
    firstName: z
      .string()
      .min(1, { message: "Bitte fügen sie einen Vornamen hinzu." }),
    lastName: z
      .string()
      .min(1, { message: "Bitte fügen sie einen Nachnamen hinzu." }),
  }),
  helper: z.array(
    z.object({ id: z.string(), firstName: z.string(), lastName: z.string() })
  ),
  signatureGuardLeader: signatureSchema,
  signatureFirstAider: signatureSchema,
  signatureSecondAider: signatureSchema,
  commissionedControlCenter: z.boolean(),
  emergencyMedicalIntervention: z.boolean(),
  transportAmbulance: z.boolean(),
  alertBathers: z.boolean(),
  alertPolice: z.boolean(),
  alertOwnObservation: z.boolean(),
  alertLeader: z.boolean(),
  usedGuardLeader: z.boolean(),
  usedLifeguard: z.boolean(),
  usedRescueAssistant: z.boolean(),
  usedGuardOperationManager: z.boolean(),
  countForces: z.string(),
  usedBoat: z.boolean(),
  usedQuad: z.boolean(),
  usedVehicle: z.boolean(),
  usedJetSki: z.boolean(),
  usedOtherResources: z.array(
    z.object({ id: z.string(), resource: z.string(), checked: z.boolean() })
  ),
  usedFireDepartment: z.boolean(),
  usedRescueService: z.boolean(),
  usedAirRescue: z.boolean(),
  usedNeighboringWRD: z.boolean(),
  usedPolice: z.boolean(),
  usedDGzRS: z.boolean(),
  usedDiver: z.boolean(),
  usedOther: z.array(
    z.object({ id: z.string(), resource: z.string(), checked: z.boolean() })
  ),
  swimmingAccident: z.boolean(),
  internalEmergency: z.boolean(),
  surgicalEmergency: z.boolean(),
  neurologicalEmergency: z.boolean(),
  firstResponderOperation: z.boolean(),
  otherAccident: z.array(
    z.object({ id: z.string(), resource: z.string(), checked: z.boolean() })
  ),
  asthma: z.boolean(),
  aspiration: z.boolean(),
  hyperventilation: z.boolean(),
  heartAttack: z.boolean(),
  rhythmDisorder: z.boolean(),
  hypertensiveCrisis: z.boolean(),
  shock: z.boolean(),
  bloodSugarImbalance: z.boolean(),
  drownAlmostDrown: z.boolean(),
  allergicReaction: z.boolean(),
  hypothermia: z.boolean(),
  poisoning: z.boolean(),
  seizure: z.boolean(),
  acuteAbdomen: z.boolean(),
  otherIllness: z.array(
    z.object({ id: z.string(), resource: z.string(), checked: z.boolean() })
  ),
  emergencyEvent: z.string().nullable(),
  injurySkullBrainFace: z.boolean(),
  injurySpine: z.boolean(),
  injuryChest: z.boolean(),
  injuryAbdomen: z.boolean(),
  injuryPelvis: z.boolean(),
  injuryExtremities: z.boolean(),
  sysBloodPressure: z.string().nullable(),
  diaBloodPressure: z.string().nullable(),
  oxygenSaturation: z.string().nullable(),
  pulse: z.string().nullable(),
  breahtingFrequency: z.string().nullable(),
  bloodSugar: z.string().nullable(),
  temperature: z.string().nullable(),
  consciousnessOriented: z.boolean(),
  consciousnessClouded: z.boolean(),
  consciousnessUnconscious: z.boolean(),
  breathingSpontaneouslyFreely: z.boolean(),
  breathingShortnessOfBreath: z.boolean(),
  breathingRespiratoryArrest: z.boolean(),
  circulationPulseRegularly: z.boolean(),
  circulationPulseIrregularly: z.boolean(),
  circulationCirculatoryArrest: z.boolean(),
  hurtSlightly: z.boolean(),
  hurtModerately: z.boolean(),
  hurtSeverely: z.boolean(),
  circulationIVAccess: z.boolean(),
  circulationMedication: z.boolean(),
  circulationResuscitation: z.boolean(),
  circulationAED: z.boolean(),
  circulationDefibrillation: z.boolean(),
  breathingProvideOxygen: z.boolean(),
  breathingMedication: z.boolean(),
  breathingSuction: z.boolean(),
  breathingIntubation: z.boolean(),
  breathingVentilation: z.boolean(),
  positionHigh: z.boolean(),
  positionShock: z.boolean(),
  positionStable: z.boolean(),
  positionFlat: z.boolean(),
  positionVacuumMattress: z.boolean(),
  woundCare: z.boolean(),
  sedation: z.boolean(),
  cervicalCollar: z.boolean(),
  cooling: z.boolean(),
  heatPreservation: z.boolean(),
  resultConditionImproved: z.boolean(),
  resultConditionUnchanged: z.boolean(),
  resultConditionDeteriorated: z.boolean(),
  resultDeathAtLocation: z.boolean(),
  handOverRTW: z.boolean(),
  handOverNEF: z.boolean(),
  handOverKTW: z.boolean(),
  handOverRTH: z.boolean(),
  firstResponderFirstName: z.string().nullable(),
  firstResponderLastName: z.string().nullable(),
  firstResponderAddress: z.string().nullable(),
});

export const firstAidOperationSmallSchema = z.object({
  id: z.string().min(1),
  lastName: z.string().nullable(),
  firstName: z.string().nullable(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
  operationLocation: z.string().nullable(),
  accidentTime: z.string().nullable(),
  guardLeader: z.object({
    id: z.string().min(1, { message: "Id wird benötigt" }),
    firstName: z
      .string()
      .min(1, { message: "Bitte fügen sie einen Vornamen hinzu." }),
    lastName: z
      .string()
      .min(1, { message: "Bitte fügen sie einen Nachnamen hinzu." }),
  }),
  helper: z.array(
    z.object({ id: z.string(), firstName: z.string(), lastName: z.string() })
  ),
  emergencyEvent: z.string().nullable(),
  sysBloodPressure: z.string().nullable(),
  diaBloodPressure: z.string().nullable(),
  oxygenSaturation: z.string().nullable(),
  pulse: z.string().nullable(),
  breahtingFrequency: z.string().nullable(),
  bloodSugar: z.string().nullable(),
  temperature: z.string().nullable(),
  woundBandaged: z.boolean(),
  splinterRemoved: z.boolean(),
  tickPulled: z.boolean(),
  plasterGlued: z.boolean(),
  woundEducation: z.boolean(),
  vaccinationStatus: z.boolean(),
  rinseWoundWithWater: z.boolean(),
  otherMeasure: z.array(
    z.object({ id: z.string(), resource: z.string(), checked: z.boolean() })
  ),
});

export const towerdayAdministrationTodoSchema = z.object({
  todo: z.array(
    z.object({
      id: z.string(),
      todo: z.string(),
      type: z.enum(["daily", "weekly", "monthly"], {
        errorMap: () => ({
          message: "Zeitraum wird benötigt",
        }),
      }),
      day: z.string(),
      date: z.union([z.string(), z.date()]),
    })
  ),
});

export const todoSchema = z.object({
  todos: z.array(
    z.object({
      id: z.string(),
      todo: z.string(),
      type: z.enum(["daily", "weekly", "monthly"], {
        errorMap: () => ({
          message: "Zeitraum wird benötigt",
        }),
      }),
      day: z.string(),
      date: z.union([z.string(), z.date()]),
    })
  ),
});

export const towerdayAdministrationMaterialSchema = z.object({
  material: z.array(
    z.object({
      id: z.string(),
      material: z.string(),
      type: z.enum(["daily", "weekly", "monthly"], {
        errorMap: () => ({
          message: "Zeitraum wird benötigt",
        }),
      }),
      day: z.string(),
      date: z.union([z.string(), z.date()]),
    })
  ),
});

export const materialsSchema = z.object({
  materials: z.array(
    z.object({
      id: z.string(),
      material: z.string(),
      type: z.enum(["daily", "weekly", "monthly"], {
        errorMap: () => ({
          message: "Zeitraum wird benötigt",
        }),
      }),
      day: z.string(),
      date: z.union([z.string(), z.date()]),
    })
  ),
});

export const towerdayAdministrationWeatherSchema = z.object({
  weather: z.array(
    z.object({
      id: z.string(),
      time: z.string(),
    })
  ),
});

export const weatherSchema = z.object({
  weather: z.array(
    z.object({
      id: z.string(),
      time: z.string(),
    })
  ),
});

export const beachSectionsSchema = z.object({
  beachSections: z.array(
    z.object({
      id: z.string(),
      sections: z.array(
        z.object({ id: z.string(), number: z.string(), symbol: z.string() })
      ),
      location: z.string(),
    })
  ),
});

export const resetPasswordSchema = z.object({
  userId: z.string().min(1, { message: "User Id wird benötigt" }),
  token: z.string().min(1, { message: "Token wird benötigt" }),
  password: z.string().min(6, {
    message: "Passwort muss mindestens 6 Zeichen lang sein",
  }),
});

export const passwordSchema = z.object({
  password: z.string().min(8, {
    message: "Passwort wird benötigt und muss mindestens 8 Zeichen lang sein",
  }),
});

export const createPermissionSchema = z.object({
  name: z.string().min(1, {
    message: "Name wird benötigt",
  }),
  description: z.string().min(1, {
    message: "Beschreibung wird benötigt",
  }),
});
