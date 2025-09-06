"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Calendar,
  Award,
  Settings,
  Camera,
  User2,
} from "lucide-react";
import { ProfileResponse, Task } from "@/type/type";
import { useActionState, useEffect } from "react";
import { editProfileAction } from "../action";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

const now = new Date();

export default function ProfilePage({
  user,
  tasks,
}: {
  user: ProfileResponse;
  tasks: Task[];
}) {
  const [state, formAction, pending] = useActionState(editProfileAction, null);

  const router = useRouter();

  const sortedTasks = tasks.sort((a, b) => {
    const miliSecondA = new Date(a.updatedAt).getTime();
    const milisecondB = new Date(b.updatedAt).getTime();

    const updateTimeDiff = milisecondB - miliSecondA;

    return updateTimeDiff;
  });

  const slicedTasks = sortedTasks.slice(0, 10);

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state]);
  const achievements = [
    { title: "Task Master", description: "Completed 100+ tasks", icon: "🏆" },
    {
      title: "Streak Champion",
      description: "7-day completion streak",
      icon: "🔥",
    },
    {
      title: "Early Bird",
      description: "Completed tasks before deadline",
      icon: "🌅",
    },
    {
      title: "Team Player",
      description: "Collaborated on 50+ tasks",
      icon: "🤝",
    },
  ];

  const stats = [
    { label: "Total Tasks", value: tasks.length },
    {
      label: "Tasks Completed",
      value: tasks.filter((task) => task.status === "DONE").length,
    },
    {
      label: "Tasks Overdue",
      value: tasks.filter(
        (task) => task.status !== "DONE" && new Date(task.dueDate) < now,
      ).length,
    },
  ];

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Profile</h1>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    {user.avatarUrl ? (
                      <AvatarImage src={user.avatarUrl} />
                    ) : (
                      <AvatarFallback className="text-lg">
                        {user.name
                          .split(" ")
                          .map((word) => word[0].toUpperCase())
                          .join("")}
                      </AvatarFallback>
                    )}

                    {/* <AvatarFallback className="text-lg">
                      {user.name
                        .split(" ")
                        .map((word) => word[0].toUpperCase())
                        .join("")}
                    </AvatarFallback> */}
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-transparent"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Basic
                </Badge>
              </div>

              <div className="flex-1 space-y-4">
                <div className="mx-auto w-fit text-center lg:text-left lg:mx-0">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and information
              </CardDescription>
            </CardHeader>
            <form action={formAction}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Name</Label>
                  <div className="flex">
                    <User2 className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                    <Input id="name" name="name" defaultValue={user.name} />
                  </div>
                  {/* <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div> */}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex">
                    <Mail className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      disabled
                    />
                  </div>
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex">
                    <Phone className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div> */}

                {/* <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex">
                    <MapPin className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                    <Input id="location" defaultValue="San Francisco, CA" />
                  </div>
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    name="bio"
                    defaultValue={user.bio}
                  />
                </div>

                <Button className="w-full hover:cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </form>
          </Card>

          {/* Achievements */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>
                Your accomplishments and milestones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card> */}
        </div>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your recent actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {slicedTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 pb-3 border-b last:border-b-0"
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      task.status === "DONE"
                        ? "bg-green-500"
                        : task.status === "TODO"
                        ? "bg-blue-500"
                        : task.status === "IN_PROGRESS" && "bg-yellow-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">
                      {task.status === "DONE"
                        ? `Completed task '${task.title}'`
                        : task.status === "TODO"
                        ? `Created new task '${task.title}'`
                        : task.status === "IN_PROGRESS" &&
                          `Working on a task '${task.title}'`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(task.updatedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {/*[
                {
                  action: "Completed task 'Design new landing page'",
                  time: "2 hours ago",
                  type: "completed",
                },
                {
                  action: "Created new task 'Review code changes'",
                  time: "4 hours ago",
                  type: "created",
                },
                {
                  action: "Updated profile information",
                  time: "1 day ago",
                  type: "updated",
                },
                {
                  action: "Joined project 'Mobile App Redesign'",
                  time: "2 days ago",
                  type: "joined",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 pb-3 border-b last:border-b-0"
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      activity.type === "completed"
                        ? "bg-green-500"
                        : activity.type === "created"
                        ? "bg-blue-500"
                        : activity.type === "updated"
                        ? "bg-yellow-500"
                        : "bg-purple-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              )) */}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
