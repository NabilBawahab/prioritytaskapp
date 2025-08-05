import { auth } from "@/lib/auth";
import { TaskList } from "./_components/task-list";

export default async function page() {
  const user = await auth();
  const data = user?.data;
  if (typeof data === "undefined" || data.length === 0) {
    return <div>There is no data</div>;
  }

  return <TaskList data={data} />;
}
