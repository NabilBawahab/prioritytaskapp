"use client";

import type { ProfileResponse } from "@/type/type";
import {
  BotMessageSquare,
  CalendarPlus,
  LayoutDashboard,
  List,
  UserRound,
} from "lucide-react";
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
      <div className="flex flex-col justify-between border-r border-gray-200 py-4 px-3">
        <section className="space-y-4">
          <SidebarItem
            text="Dashboard"
            href="/dashboard"
            icon={<LayoutDashboard />}
            active={pathname === "/dashboard"}
          />
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
          <SidebarItem
            text="Taska AI"
            href="/dashboard/taska-ai"
            icon={<BotMessageSquare />}
            active={pathname.startsWith("/dashboard/taska-ai")}
          />
        </section>
        <section className="space-y-2 px-3">
          <div className="text-slate-800">
            <h3>{user?.username}</h3>
            <p>{user?.email}</p>
          </div>
          <div className="mx-auto w-2/3">
            <button
              className="w-full bg-red-500 text-white py-1 px-2 rounded-2xl hover:bg-red-600 transition-colors duration-300 hover:cursor-pointer text-sm "
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </section>
      </div>
      <div className="p-4 bg-gray-100 w-full overflow-auto h-full">
        {children}
      </div>
    </div>
  );
}
