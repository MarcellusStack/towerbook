"use client";
import { SearchListForm } from "@/components/forms/search-list-form";
import { FormLoader } from "@/components/loader/form-loader";
import { useParams } from "next/navigation";
import React from "react";
import { useGetSearchList } from "@/app/(dashboard)/protocols/search-list/[id]/_data";

export const SearchList = () => {
  const { id } = useParams();
  const { data: searchlist, isPending } = useGetSearchList(id as string);

  if (isPending || !searchlist) return <FormLoader />;
  return <SearchListForm searchlist={searchlist} />;
};
