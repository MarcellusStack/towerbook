import { GridCol, Grid } from "@mantine/core";
import { notFound } from "next/navigation";
import { UserPermissionForm } from "@components/forms/user-permission-form";
import { getUserPermission } from "@server/queries/get-user-permission";
import { getTowers } from "@server/queries/get-towers";
import { TableOfContents } from "@/components/table-of-contents";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await getUserPermission(id, ["admin"]);
  const towers = await getTowers(undefined, ["admin"]);

  if (!user) {
    notFound();
  }

  return (
    <Grid>
      <GridCol span={10}>
        <UserPermissionForm user={user} towers={towers ?? []} />
      </GridCol>
      <GridCol span={2}>
        <TableOfContents />
      </GridCol>
    </Grid>
  );
}
