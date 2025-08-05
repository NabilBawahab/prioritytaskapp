import { auth } from "@/lib/auth";
import { TaskList } from "./_components/task-list";

export default async function page() {
  const user = await auth();
  const tasks = user?.data;
  if (typeof tasks === "undefined" || tasks.length === 0) {
    return <div>There is no data</div>;
  }

  return <TaskList tasks={tasks} />;
}
