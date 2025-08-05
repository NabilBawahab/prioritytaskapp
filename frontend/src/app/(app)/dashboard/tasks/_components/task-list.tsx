"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Flag,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import type { Task } from "@/type/type";

interface TaskDummy {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed" | "overdue";
  priority: "low" | "medium" | "high" | "urgent";
  assignee: string;
  dueDate: string;
  tags: string[];
  completed: boolean;
}

export function TaskList({ tasks }: { tasks: Task }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [dummyTasks, setDummyTask] = useState<TaskDummy[]>([
    {
      id: 1,
      title: "Design new landing page",
      description:
        "Create a modern and responsive landing page for the new product launch",
      status: "completed",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2024-01-15",
      tags: ["Design", "Frontend"],
      completed: true,
    },
    {
      id: 2,
      title: "Review code changes",
      description:
        "Review and approve the latest pull requests from the development team",
      status: "in-progress",
      priority: "medium",
      assignee: "Jane Smith",
      dueDate: "2024-01-16",
      tags: ["Development", "Review"],
      completed: false,
    },
    {
      id: 3,
      title: "Update documentation",
      description:
        "Update the API documentation with the latest changes and examples",
      status: "todo",
      priority: "low",
      assignee: "Mike Johnson",
      dueDate: "2024-01-17",
      tags: ["Documentation"],
      completed: false,
    },
    {
      id: 4,
      title: "Client meeting preparation",
      description:
        "Prepare presentation materials for the upcoming client meeting",
      status: "in-progress",
      priority: "high",
      assignee: "Sarah Wilson",
      dueDate: "2024-01-18",
      tags: ["Meeting", "Presentation"],
      completed: false,
    },
    {
      id: 5,
      title: "Database optimization",
      description:
        "Optimize database queries to improve application performance",
      status: "overdue",
      priority: "urgent",
      assignee: "John Doe",
      dueDate: "2024-01-12",
      tags: ["Database", "Performance"],
      completed: false,
    },
    {
      id: 6,
      title: "User testing session",
      description:
        "Conduct user testing sessions for the new feature implementation",
      status: "todo",
      priority: "medium",
      assignee: "Jane Smith",
      dueDate: "2024-01-20",
      tags: ["Testing", "UX"],
      completed: false,
    },
  ]);

  const toggleTaskCompletion = (taskId: number) => {
    setDummyTask(
      dummyTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              status: !task.completed ? "completed" : "todo",
            }
          : task,
      ),
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "ALL" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DONE":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "IN_PROGRESS":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return (
          <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
        );
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "FIRST":
        return "destructive";
      case "SECOND":
        return "destructive";
      case "THIRD":
        return "secondary";
      case "FOURTH":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DONE":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Task List</h1>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">All Tasks</h2>
            <p className="text-muted-foreground">
              Manage and track your tasks efficiently
            </p>
          </div>
          <Link href="/dashboard/create">
            <Button className="hover:cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="TODO">To Do</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="DONE">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Flag className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Priority</SelectItem>
                  <SelectItem value="FIRST">First priority</SelectItem>
                  <SelectItem value="SECOND">Second priority</SelectItem>
                  <SelectItem value="THIRD">Third priority</SelectItem>
                  <SelectItem value="FOURTH">Fourth priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Task Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Tasks
                  </p>
                  <p className="text-2xl font-bold">{tasks.length}</p>
                </div>
                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed
                  </p>
                  <p className="text-2xl font-bold">
                    {tasks.filter((task) => task.status === "DONE").length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      tasks.filter((task) => task.status === "IN_PROGRESS")
                        .length
                    }
                  </p>
                </div>
                <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Overdue
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      tasks.filter(
                        (task) => new Date(task.dueDate) < new Date(),
                      ).length
                    }
                  </p>
                </div>
                <div className="h-8 w-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task List */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks ({filteredTasks.length})</CardTitle>
            <CardDescription>
              {filteredTasks.length === tasks.length
                ? "All your tasks"
                : `Filtered results (${filteredTasks.length} of ${tasks.length})`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {/* <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                  /> */}

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <h3
                        className={`font-medium ${
                          task.status === "DONE"
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {task.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant={getPriorityColor(task.priority)}
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>

                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(task.status)}`}
                      >
                        {task.status.replace("-", " ")}
                      </Badge>

                      {/* {task.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))} */}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {task.assignee}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {task.dueDate}
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Task</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Assign to...</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}

              {filteredTasks.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ||
                    statusFilter !== "all" ||
                    priorityFilter !== "all"
                      ? "Try adjusting your filters to see more tasks."
                      : "Create your first task to get started."}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
