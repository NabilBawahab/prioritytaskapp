import { auth } from "@/lib/auth";
import { TaskList } from "./_components/task-list";
import type { Task } from "@/type/type";

export default async function page() {
  const user = await auth();
  const tasks = user?.data;

  return <TaskList tasks={tasks as Task[]} />;
}
