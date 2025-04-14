import {
  DocumentData,
  Query,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

import { ActionTrigger, Task, TaskInputFields } from "@/types/task";
import { TaskStatus as TS } from "@/lib/constants/task";
import { getDifference, getTimestamp, getDuration } from "@/lib/helpers/date";
import { getProgress, updateTaskDuration } from "@/lib/helpers/task";
import { db } from "@/lib/firebase/client";

export const selectedTask = collection(db, "tasks");

export async function getTasks(query?: Query): Promise<Task[]> {
  let querySnapshot = null;

  if (query) {
    querySnapshot = await getDocs(query);
  } else {
    querySnapshot = await getDocs(collection(db, "tasks"));
  }

  const localTasks = querySnapshot.docs.map((doc: DocumentData) => {
    return { ...doc.data(), id: doc.id };
  });

  return localTasks as Task[];
}

export function subscribeToTasks(
  queryRef: Query,
  callback: React.Dispatch<React.SetStateAction<Task[]>>,
) {
  return onSnapshot(queryRef, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];

    callback(tasks);
  });
}

export async function addTask(fields: TaskInputFields) {
  try {
    const { planned: plannedDuration, actual: actualDuration, status } = fields;

    const isActive = [TS.IN_PROGRESS, TS.COMPLETED].includes(status as TS);
    const hasActualDuration = isActive && actualDuration?.end;

    const planned = plannedDuration?.start
      ? {
          start: getTimestamp(plannedDuration.start),
          end: getTimestamp(plannedDuration.end),
        }
      : null;

    const actual = actualDuration?.start
      ? {
          start: getTimestamp(actualDuration.start),
          end: getTimestamp(actualDuration.end),
          duration: hasActualDuration
            ? getDifference(actualDuration.end, actualDuration.start)
            : 0,
        }
      : null;

    return await addDoc(selectedTask, {
      ...fields,
      planned,
      actual,
    });
  } catch (error) {
    console.error("Error in adding a task:", error);
    throw error;
  }
}

export function onTasksUpdate(
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
) {
  const q = query(selectedTask);
  const unsub = subscribeToTasks(q, setTasks);

  return () => unsub();
}

export const afterDragUpdate = async (taskId: string, newStatus: TS) => {
  try {
    const selectedTask = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(selectedTask);

    if (!taskSnap.exists()) {
      throw new Error("Task not found");
    }

    const taskData = taskSnap.data();

    const {
      status: prevStatus,
      actual: actualDuration,
      planned: plannedDuration,
      statusHistory: history,
    } = taskData as Task;

    history.push({
      timestamp: Timestamp.now(),
      trigger: ActionTrigger.USER_DRAG,
      status: newStatus,
    });

    const { planned, actual } = updateTaskDuration(
      newStatus,
      prevStatus,
      plannedDuration,
      actualDuration,
    );

    return await updateDoc(selectedTask, {
      status: newStatus,
      planned,
      actual,
      statusHistory: history,
      progress: getProgress(newStatus),
    });
  } catch (error) {
    console.error("Error in updating a task:", error);
    throw error;
  }
};

export async function updateTask(taskId: string, fields: TaskInputFields) {
  try {
    const selectedTask = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(selectedTask);

    if (!taskSnap.exists()) {
      throw new Error("Task not found");
    }

    const taskData = taskSnap.data();

    const { status: prevStatus } = taskData as Task;

    const { planned, actual } = updateTaskDuration(
      fields.status as TS,
      prevStatus,
      getDuration(fields.planned),
      getDuration(fields.actual),
    );

    return await updateDoc(selectedTask, {
      ...fields,
      progress: getProgress(fields.status as TS),
      planned,
      actual,
    });
  } catch (error) {
    console.error("Error in adding a task:", error);
    throw error;
  }
}

export async function deleteTask(taskId: string) {
  try {
    const selectedTask = doc(db, "tasks", taskId);

    return await deleteDoc(selectedTask);
  } catch (error) {
    console.error("Error in deleting a task:", error);
    throw error;
  }
}
