import { auth } from "@/lib/auth";
import ProfilePage from "./_components/profile-page";
import { ProfileResponse, Task } from "@/type/type";

export default async function Page() {
  const user = await auth();

  return (
    <ProfilePage user={user as ProfileResponse} tasks={user?.data as Task[]} />
  );
}
