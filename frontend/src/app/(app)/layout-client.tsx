"use client";

import type { ProfileResponse } from "@/type/type";
import { CalendarPlus, List, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "../components/sidebaritem";
import { logout } from "@/actions/logout";

export default function LayoutClient({
  children,
  user,
}: {
  children: React.ReactNode;
  user: ProfileResponse | null;
}) {
  const pathname: string = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex flex-col justify-between border-r my-4 border-gray-200 py-4 px-3">
        <section className="space-y-4">
          <SidebarItem
            text="Profile"
            href="/dashboard/profile"
            icon={<UserRound />}
            active={pathname.startsWith("/dashboard/profile")}
          />
          <SidebarItem
            text="Create Task"
            href="/dashboard/create"
            icon={<CalendarPlus />}
            active={pathname.startsWith("/dashboard/create")}
          />
          <SidebarItem
            text="Tasks List"
            href="/dashboard/tasks"
            icon={<List />}
            active={pathname.startsWith("/dashboard/tasks")}
          />
        </section>
        <section>
          <div>{user?.username}</div>
          <p>{user?.email}</p>
          <button onClick={logout}>Logout</button>
        </section>
      </div>
      <div>{children}</div>
    </div>
  );
}
