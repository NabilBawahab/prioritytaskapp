import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LayoutClient from "./layout-client";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();

  if (!user) {
    redirect("/login");
  }

  // console.log("User data:", user);
  return <LayoutClient user={user}>{children}</LayoutClient>;
}
