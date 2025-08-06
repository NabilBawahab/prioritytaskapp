"use client";
import {
  LayoutDashboard,
  User,
  Plus,
  CheckSquare,
  Bot,
  Moon,
  Sun,
  Power,
  CheckCircle,
  Clock,
  MoreHorizontal,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfileResponse } from "@/type/type";
import { logout } from "@/actions/logout";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Create Task",
    url: "/dashboard/create",
    icon: Plus,
  },
  {
    title: "Task List",
    url: "/dashboard/tasks",
    icon: CheckSquare,
  },
  {
    title: "Amy (AI)",
    url: "/dashboard/amy-ai",
    icon: Bot,
  },
];

export function AppSidebar({ user }: { user: ProfileResponse }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Sidebar variant="inset" className="border-r">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CheckSquare className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">PriorityTask</span>
            <span className="truncate text-xs text-muted-foreground">
              Task Management
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>
                {user.username
                  .split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.username}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-8 w-8"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Power size={16} className="text-destructive-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="text-red-600 w-fit text-center mx-auto"
                onClick={logout}
              >
                Logout
                <Power size={16} className="text-destructive-foreground" />
              </DropdownMenuItem>
              <DropdownMenuItem className="w-fit text-center mx-auto">
                Cancel <X size={16} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Power size={16} className="text-destructive-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="px-4 py-3 rounded-lg shadow-md bg-popover transition-all duration-300 ease-out
             data-[state=closed]:opacity-0 data-[state=closed]:translate-y-3
             data-[state=open]:opacity-100 data-[state=open]:translate-y-0"
              align="end"
              sideOffset={24}
            >
              <Button
                variant="ghost"
                size="sm"
                className="hover:cursor-pointer hover:text-destructive-foreground"
                onClick={logout}
              >
                <Power />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:cursor-pointer hover:text-destructive-foreground"
                onClick={() => setOpen(false)}
              >
                No
              </Button>
            </PopoverContent>
          </Popover> */}
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
