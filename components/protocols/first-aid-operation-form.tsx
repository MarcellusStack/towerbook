"use client";
import React from "react";
import { TableOfContents } from "@components/table-of-contents";
import { FirstAidOperationBigForm } from "@components/forms/first-aid-operation-big-form";
import { FirstAidOperationSmallForm } from "@components/forms/first-aid-operation-small-form";
import { useParams } from "next/navigation";
import { useGetFirstAidOperation } from "@/data/protocols";
import { FormLoader } from "@components/loader/form-loader";

const bigLinks = [
  { label: "Einsatz Informationen", link: "#operation-infos" },
  { label: "Insert your title here", link: "#insert-your-title-here" },
  { label: "Alarmierung durch", link: "#alarm" },
  { label: "Eingesetzte Kräfte", link: "#forces-deployed" },
  { label: "Eingesetzte Rettungsmittel", link: "#rescue-equipment-used" },
  { label: "weitere Einsatzkräfte", link: "#additional-emergency-services" },
  { label: "Einsatzart", link: "#type-of-use" },
  { label: "Erkrankungen", link: "#diseases" },
  { label: "Notfallgeschehen", link: "#emergency-event" },
  { label: "Verletzungen", link: "#diseases" },
  { label: "Messwerte", link: "#measurements" },
  { label: "Bewusstsein", link: "#conciousness" },
  { label: "Atmung", link: "#breathing" },
  { label: "Kreislauf", link: "#circuit" },
  { label: "Schmerzen", link: "#pain" },
  { label: "Maßnahmen", link: "#measures" },
  { label: "Ergebnis", link: "#result" },
  { label: "Übergabe an", link: "#handover-to" },
  { label: "Ersthelfer / Zeuge", link: "#first-responder-witness" },
];

const smallLinks = [
  { label: "Patient", link: "#patient" },
  { label: "Einsatz Informationen", link: "#operation-infos" },
  { label: "Hergang des Unfalls", link: "#emergency-event" },
  { label: "Messwerte", link: "#measurements" },
  { label: "Maßnahmen", link: "#measures" },
];

export const FirstAidOperationForm = () => {
  const { id } = useParams();
  const { data: operation, isPending } = useGetFirstAidOperation(id as string);

  if (isPending || !operation) return <FormLoader />;

  return (
    <>
      {operation.type === "big" ? (
        <>
          <FirstAidOperationBigForm operation={operation} />
          <TableOfContents links={bigLinks} />
        </>
      ) : (
        <>
          <FirstAidOperationSmallForm operation={operation} />
          <TableOfContents links={smallLinks} />
        </>
      )}
    </>
  );
};
