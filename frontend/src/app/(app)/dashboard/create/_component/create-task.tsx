"use client";

import type React from "react";

import { startTransition, useActionState, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Plus,
  CalendarIcon,
  Clock,
  Flag,
  CheckCircle,
  FilePlus,
  Ghost,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CreateTaskInput } from "@/type/type";
import { createTaskAction } from "../action";

export function CreateTask() {
  const [multipleTask, setMultipleTask] = useState(false);
  const [tasks, setTasks] = useState<CreateTaskInput[]>([
    {
      title: "",
      description: "",
      priority: "FIRST",
      status: "TODO",
      dueDate: "",
    },
  ]);
  const [state, formAction, pending] = useActionState(
    createTaskAction,
    undefined,
  );

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        title: "",
        description: "",
        priority: "FIRST",
        status: "TODO",
        dueDate: "",
      },
    ]);
    setMultipleTask(true);
  };

  const handleFieldChange = (
    index: number,
    field: keyof CreateTaskInput,
    value: string,
  ) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index: number) => {
    const deleteTask = tasks.filter((_, i) => index !== i);
    setTasks(deleteTask);

    if (deleteTask.length === 1) {
      setMultipleTask(false);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("tasks", JSON.stringify(tasks));

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Create Task</h1>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Create New Task
            </h2>
            <p className="text-muted-foreground">
              Add a new task to your workflow and stay organized.
            </p>
          </div>
          <div
            className={`flex flex-col gap-4 ${
              multipleTask && "lg:grid lg:grid-cols-2"
            }`}
          >
            {tasks.map((task, index) => {
              return (
                <div key={index} className="space-y-2 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 text-muted-foreground hover:text-destructive rounded-full"
                    onClick={() => handleDeleteTask(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Task Details
                      </CardTitle>
                      <CardDescription>
                        Provide the basic information for your task
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Task Title *</Label>
                        <Input
                          id="title"
                          placeholder="Enter task title..."
                          required
                          value={task.title}
                          onChange={(e) =>
                            handleFieldChange(index, "title", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your task in detail..."
                          rows={4}
                          value={task.description}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select
                          value={task.priority}
                          onValueChange={(value) =>
                            handleFieldChange(index, "priority", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <Flag className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FIRST">
                              First Priority
                            </SelectItem>
                            <SelectItem value="SECOND">
                              Second Priority
                            </SelectItem>
                            <SelectItem value="THIRD">
                              Third Priority
                            </SelectItem>
                            <SelectItem value="FOURTH">
                              Fourth Priority
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Assignment & Scheduling */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Scheduling
                      </CardTitle>
                      <CardDescription>Set your task deadlines</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Due Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !task.dueDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {task.dueDate
                                ? format(new Date(task.dueDate), "PPP")
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                task.dueDate
                                  ? new Date(task.dueDate)
                                  : undefined
                              }
                              onSelect={(selectedDate) => {
                                handleFieldChange(
                                  index,
                                  "dueDate",
                                  selectedDate?.toISOString() ?? "",
                                );
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
          {!state?.success ? (
            <div className="text-red-500">{state?.message}</div>
          ) : (
            <div className="text-blue-500">{state?.message}</div>
          )}
          <div className="flex gap-3">
            <Button
              type="button"
              className="flex-1 hover:cursor-pointer"
              onClick={handleSubmit}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Create Task
            </Button>
            <Button
              type="button"
              variant="outline"
              className="hover:cursor-pointer"
              onClick={handleAddTask}
            >
              <FilePlus />
              Add more Task
            </Button>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
