import { auth } from "@/lib/auth";
import { Dashboard } from "./_components/dashboard-component";
import type { ProfileResponse, Task } from "@/type/type";

export default async function Page() {
  const user = await auth();
  const tasks = user?.data;

  return <Dashboard user={user as ProfileResponse} tasks={tasks as Task[]} />;
}
