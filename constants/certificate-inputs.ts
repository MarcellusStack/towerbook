export const certificateInputs = [
  {
    section: "Schimmen",
    sectionAnchor: "swim",
    inputs: [
      {
        label: "Rettungsschwimmer",
        inputProp: "lifeguardLicense",
        inputExpirationProp: "lifeguardLicenseExpiration",
      },
      {
        label: "Schnorchel",
        inputProp: "snorkelLicense",
        inputExpirationProp: "snorkelLicenseExpiration",
      },
      {
        label: "Rettungsschwimmer im Wasserrettungsdienst",
        inputProp: "lifeguardWaterRescueService",
        inputExpirationProp: "lifeguardWaterRescueServiceExpiration",
      },
      {
        label: "Wasserretter",
        inputProp: "waterRescuer",
        inputExpirationProp: "waterRescuerExpiration",
      },
      {
        label: "Fließwasserretter",
        inputProp: "riverRescuer",
        inputExpirationProp: "riverRescuerExpiration",
      },
    ],
  },
  {
    section: "Medizinisch",
    sectionAnchor: "medical",
    inputs: [
      {
        label: "Sanitätsausbildung",
        inputProp: "medicalTraining",
        inputExpirationProp: "medicalTrainingExpiration",
      },
      {
        label: "Rettungshelfer",
        inputProp: "paramedicHelper",
        inputExpirationProp: "paramedicHelperExpiration",
      },
      {
        label: "Rettungssanitäter",
        inputProp: "paramedic",
        inputExpirationProp: "paramedicExpiration",
      },
      {
        label: "Rettungsassistent",
        inputProp: "paramedicAssistance",
        inputExpirationProp: "paramedicAssistanceExpiration",
      },
      {
        label: "Notfallsanitäter",
        inputProp: "paramedicEmergency",
        inputExpirationProp: "paramedicEmergencyExpiration",
      },
      {
        label: "Arzt",
        inputProp: "physician",
        inputExpirationProp: "physicianExpiration",
      },
      {
        label: "Notarzt",
        inputProp: "physicianEmergency",
        inputExpirationProp: "physicianEmergencyExpiration",
      },
    ],
  },
  {
    section: "Führungsausbildung",
    sectionAnchor: "leadership-training",
    inputs: [
      {
        label: "Truppführer",
        inputProp: "squadLeader",
        inputExpirationProp: "squadLeaderExpiration",
      },
      {
        label: "Gruppenführer",
        inputProp: "groupLeader",
        inputExpirationProp: "groupLeaderExpiration",
      },
      {
        label: "Wachleiter",
        inputProp: "guardLeader",
        inputExpirationProp: "guardLeaderExpiration",
      },
      {
        label: "Zugführer",
        inputProp: "trainLeader",
        inputExpirationProp: "trainLeaderExpiration",
      },
    ],
  },
  {
    section: "Fahrzeug-Qualifikation",
    sectionAnchor: "vehicle-qualification",
    inputs: [
      {
        label: "KFZ Führerschein Klasse",
        inputProp: "carDrivingLicense",
        inputExpirationProp: "carDrivingLicenseExpiration",
      },
      {
        label: "Blaulichtunterweisung",
        inputProp: "blueLightInstruction",
        inputExpirationProp: "blueLightInstructionExpiration",
      },
      {
        label: "Bootsführer See",
        inputProp: "boatmanLake",
        inputExpirationProp: "boatmanLakeExpiration",
      },
      {
        label: "Bootsführer Fließgewässer",
        inputProp: "boatmanInland",
        inputExpirationProp: "boatmanInlandExpiration",
      },
      {
        label: "Rettungsbootführer",
        inputProp: "lifeboatOperator",
        inputExpirationProp: "lifeboatOperatorExpiration",
      },
      {
        label: "RWC-Pilot Stage",
        inputProp: "rwcPilotStage",
        inputExpirationProp: "rwcPilotStageExpiration",
      },
    ],
  },
  {
    section: "Funkzeugnisse",
    sectionAnchor: "radio-certificate",
    inputs: [
      {
        label: "SRC- Schein",
        inputProp: "srcCertificate",
        inputExpirationProp: "srcCertificateExpiration",
      },
      {
        label: "BOS- Schein",
        inputProp: "bosCertificate",
        inputExpirationProp: "bosCertificateExpiration",
      },
    ],
  },
  {
    section: "Sonstige Qualifikation",
    sectionAnchor: "other-qualification",
    inputs: [
      {
        label: "Drohnenklasse",
        inputProp: "droneClass",
        inputExpirationProp: "droneClassExpiration",
      },
      {
        label: "Ehrenamtsdatenblatt",
        inputProp: "volunteerDataSheet",
        inputExpirationProp: "volunteerDataSheetExpiration",
      },
      {
        label: "Jugendleiter Karte",
        inputProp: "youthLeaderCard",
        inputExpirationProp: "youthLeaderCardExpiration",
      },
      {
        label: "Führungszeugnis",
        inputProp: "criminalRecord",
        inputExpirationProp: "criminalRecordExpiration",
      },
    ],
  },
  {
    section: "Ausbilder Qualifikation",
    sectionAnchor: "instructor-qualification",
    inputs: [
      {
        label: "Ausbilder Schwimmen",
        inputProp: "instructorSwimmer",
        inputExpirationProp: "instructorSwimmerExpiration",
      },
      {
        label: "Ausbilder Rettungsschwimmen",
        inputProp: "lifeguardInstructor",
        inputExpirationProp: "lifeguardInstructorExpiration",
      },
      {
        label: "Ausbilder Wasserretter",
        inputProp: "instructorWaterRescuer",
        inputExpirationProp: "instructorWaterRescuerExpiration",
      },
      {
        label: "Ausbilder Sanitätsdienst",
        inputProp: "instructorMedicalService",
        inputExpirationProp: "instructorMedicalServiceExpiration",
      },
    ],
  },
  {
    section: "Unterweisungen",
    sectionAnchor: "instructions",
    inputs: [
      {
        label: "Wachgänger",
        inputProp: "guardWalker",
        inputExpirationProp: "guardWalkerExpiration",
      },
      {
        label: "Boot",
        inputProp: "boat",
        inputExpirationProp: "boatExpiration",
      },
      {
        label: "KFZ",
        inputProp: "car",
        inputExpirationProp: "carExpiration",
      },
      {
        label: "RWC",
        inputProp: "rwc",
        inputExpirationProp: "rwcExpiration",
      },
      {
        label: "Wachleiter",
        inputProp: "guardLeaderInstruction",
        inputExpirationProp: "guardLeaderInstructionExpiration",
      },
    ],
  },
];
