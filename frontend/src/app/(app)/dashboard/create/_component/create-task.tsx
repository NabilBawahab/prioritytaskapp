"use client";

import type { CreateTaskInput } from "@/type/type";
import { startTransition, useActionState, useState } from "react";
import { createTaskAction } from "../action";

export function CreateTask() {
  const [state, formAction, pending] = useActionState(createTaskAction, null);

  const [tasks, setTasks] = useState([
    {
      title: "",
      description: "",
      priority: "FIRST",
      status: "TODO",
      dueDate: "",
    },
  ]);

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
  };

  const handleChange = (
    index: number,
    field: keyof CreateTaskInput,
    value: string,
  ) => {
    const changedTask = [...tasks];
    changedTask[index][field] = value;
    setTasks(changedTask);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("tasks", JSON.stringify(tasks));
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <>
      {tasks.map((task, index) => (
        <div key={index} className="grid grid-cols-1 space-y-4">
          <p>{index + 1}</p>
          <input
            placeholder="Task title"
            value={task.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
          />
          <textarea
            placeholder="Task description"
            value={task.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
          />
          <select
            onChange={(e) => handleChange(index, "priority", e.target.value)}
          >
            <option value="FIRST">FIRST</option>
            <option value="SECOND">SECOND</option>
            <option value="THIRD">THIRD</option>
            <option value="FOURTH">FOURTH</option>
          </select>
          <input
            type="datetime-local"
            onChange={(e) => handleChange(index, "dueDate", e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={handleAddTask}
        className="bg-blue-500 px-2 py-1 rounded-lg text-white hover:cursor-pointer active:bg-blue-600 transition-colors duration-300"
      >
        Add new task
      </button>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 px-2 py-1 rounded-lg text-white hover:cursor-pointer active:bg-blue-600 transition-colors duration-300"
      >
        Save
      </button>
      {!state?.success && <div>{state?.message}</div>}
    </>
  );
}
