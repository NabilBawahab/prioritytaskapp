"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import type { ProfileResponse, Task } from "@/type/type";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";

const now = new Date();

export function Dashboard({
  user,
  tasks,
}: {
  user: ProfileResponse;
  tasks: Task[];
}) {
  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      description: "All time tasks created",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Completed",
      value: tasks.filter((task) => task.status === "DONE").length,
      description: "Tasks finished",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "In Progress",
      value: tasks.filter(
        (task) => task.status === "IN_PROGRESS" || task.status === "TODO",
      ).length,
      description: "Currently working on",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "Overdue",
      value: tasks.filter(
        (task) => task.status !== "DONE" && new Date(task.dueDate) < now,
      ).length,
      description: "Need attention",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20",
    },
  ];

  const completedTasks =
    (tasks.filter((task) => task.status === "DONE").length / tasks.length) *
    100;

  const todayTasks = tasks.filter((task) => {
    const taskDueDate = new Date(task.dueDate);
    const tasks =
      taskDueDate.getFullYear() === now.getFullYear() &&
      taskDueDate.getMonth() === now.getMonth() &&
      taskDueDate.getDate() === now.getDate();
    return tasks;
  });

  const getStatusColor = (priority: string) => {
    switch (priority) {
      case "FIRST":
        return "bg-red-500";
      case "SECOND":
        return "bg-orange-500";
      case "THIRD":
        return "bg-yellow-500";
      default:
        return "bg-white";
    }
  };

  const sortedTasks = tasks.sort((a, b) => {
    const dateSort =
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();

    return dateSort;
  });

  const recentTasks = [
    {
      id: 1,
      title: "Design new landing page",
      status: "completed",
      priority: "high",
      dueDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Review code changes",
      status: "in-progress",
      priority: "medium",
      dueDate: "2024-01-16",
    },
    {
      id: 3,
      title: "Update documentation",
      status: "pending",
      priority: "low",
      dueDate: "2024-01-17",
    },
    {
      id: 4,
      title: "Client meeting preparation",
      status: "in-progress",
      priority: "high",
      dueDate: "2024-01-18",
    },
  ];

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back, {user.name} 👋
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your tasks today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Progress
              </CardTitle>
              <CardDescription>Your task completion rate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completed Tasks</span>
                  <span>{completedTasks.toFixed(2)} %</span>
                </div>
                <Progress value={completedTasks} className="h-2" />
              </div>
              {/* <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Weekly Goal</span>
                  <span>18/20</span>
                </div>
                <Progress value={90} className="h-2" />
              </div> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Tasks scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:grid md:grid-cols-2">
                {todayTasks.map((task) => (
                  <div key={task.id} className="flex gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${getStatusColor(
                        task.priority,
                      )} mt-0.5`}
                    />
                    <div>
                      <p className="italic text-slate-500 text-[8px]">task</p>
                      <span className="text-sm">{task.title}</span>
                      <p className="italic text-slate-500 text-[8px]">
                        due date
                      </p>
                      <span className="text-sm">
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <p className="italic text-slate-500 text-[8px]">
                        priority
                      </p>
                      <span className="text-sm">{`${task.priority.charAt(
                        0,
                      )}${task.priority
                        .slice(1)
                        .toLowerCase()} Priority`}</span>
                    </div>
                  </div>
                ))}

                {/* <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">Morning standup - 9:00 AM</span>
                </div> */}
                {/* <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="text-sm">Code review - 2:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-sm">Client call - 4:00 PM</span>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your latest task activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        task.status === "DONE"
                          ? "bg-green-500"
                          : task.status === "IN_PROGRESS" ||
                            task.status === "TODO"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Due:{" "}
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        task.priority === "FIRST"
                          ? "destructive"
                          : task.priority === "SECOND"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                    <Badge variant="outline">{task.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
