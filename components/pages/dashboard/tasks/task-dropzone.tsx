"use client";

import React, { useContext, useEffect, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { Task, TaskContainer, TaskDragData } from "@/types/task";
import { deleteTask, getTasks, onTasksUpdate } from "@/services/tasks";
import { TaskStatus as Status } from "@/lib/constants";
import TaskSection from "@/components/pages/dashboard/tasks/task-section";
import BoardSection from "@/components/pages/dashboard/tasks/board/board-section";
import { TaskContext } from "@/contexts/taskContext";
import { getStatusCounts, getTimeline } from "@/lib/helpers/data";

export default function TaskDropzone() {
  const { setChartData } = useContext(TaskContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [containers, setContainers] = useState<TaskContainer>({
    BACKLOG: [],
    TODO: [],
    IN_PROGRESS: [],
    COMPLETED: [],
  });

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    onTasksUpdate(setTasks);
  }, []);

  useEffect(() => {
    if(tasks.length > 0) console.log(tasks)
    // const { counts } = getStatusCounts(tasks);
    // const timeline = getTimeline(tasks);
    // console.log(timeline, tasks)
    // setChartData({ counts, timeline });
  }, [tasks]);

  useEffect(() => {
    setContainers({
      BACKLOG: tasks.filter(
        ({ statusHistory: sh }) => sh[sh.length - 1].status === Status.BACKLOG
      ),
      TODO: tasks.filter(
        ({ statusHistory: sh }) => sh[sh.length - 1].status === Status.TODO
      ),
      IN_PROGRESS: tasks.filter(
        ({ statusHistory: sh }) =>
          sh[sh.length - 1].status === Status.IN_PROGRESS
      ),
      COMPLETED: tasks.filter(
        ({ statusHistory: sh }) => sh[sh.length - 1].status === Status.COMPLETED
      ),
    });
  }, [tasks]);

  const loadTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const handleDragOver = (event: any) => {
    setContainers((items) => move(items, event));
  };

  const handleDropEnd = (event: any) => {
    const { source, target } = event.operation;
    const { data } = source as { data: TaskDragData };
    if (data && "task" in data) {
      const { task } = data;
      if (target && target.id === "TRASH_ZONE") {
        deleteTask(task.id);
      }
    }
  };

  return (
    <DragDropProvider onDragOver={handleDragOver} onDragEnd={handleDropEnd}>
      <TaskSection tasks={containers.BACKLOG} />
      <BoardSection tasks={containers} />
    </DragDropProvider>
  );
}
