import { notFound } from "next/navigation";
import { getTowerDayTodo } from "@/server/queries/get-tower-day-todo";
import { TowerDayTodoForm } from "@/components/forms/tower-day-todo-form";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const towerday = await getTowerDayTodo(id, ["admin"]);

  if (!towerday) {
    notFound();
  }

  return <TowerDayTodoForm towerday={towerday} />;
}
