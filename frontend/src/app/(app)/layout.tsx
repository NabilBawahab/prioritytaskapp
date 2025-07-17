import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await auth();

  if (!data) {
    redirect("/login");
  }

  console.log("User data:", data);
  return <div className="">{children}</div>;
}
