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

import { db, tasksCollection } from "@/config/firebase";
import { ActionTrigger, Task, TaskInputFields } from "@/types/task";
import { TaskStatus as TS } from "@/lib/constants/task";
import { getDifference, isToday, toTimestamp } from "@/lib/helpers/date";
import { getProgress } from "@/lib/helpers/task";

export const tasksRef = collection(db, "tasks");

export async function getTasks(query?: Query): Promise<Task[]> {
  let querySnapshot = null;

  if (query) {
    querySnapshot = await getDocs(query);
  } else {
    querySnapshot = await getDocs(tasksCollection);
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

export function onTasksUpdate(
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
) {
  const q = query(tasksRef);
  const unsub = subscribeToTasks(q, setTasks);

  return () => unsub();
}

export const afterDragUpdate = async (taskId: string, newStatus: TS) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskRef);

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

    let progress = getProgress(newStatus);
    let planned = plannedDuration;
    let actual = actualDuration;

    const isStarting =
      newStatus === TS.IN_PROGRESS && prevStatus !== TS.IN_PROGRESS;
    const isCompleting =
      newStatus === TS.COMPLETED && prevStatus !== TS.COMPLETED;
    const isRevertingFromComplete =
      prevStatus === TS.COMPLETED && newStatus !== TS.COMPLETED;
    const isMovingToBacklog =
      prevStatus !== TS.BACKLOG && newStatus === TS.BACKLOG;
    const isMovingToTodo = prevStatus !== TS.TODO && newStatus === TS.TODO;

    if (isStarting) {
      actual = {
        start: Timestamp.now(),
        end: null,
        duration: 0,
      };
    }
    if (isCompleting) {
      actual = actual
        ? {
            ...actual,
            end: Timestamp.now(),
            duration:
              Timestamp.now().seconds -
              (actual.start?.seconds || Timestamp.now().seconds),
          }
        : {
            start: Timestamp.now(),
            end: Timestamp.now(),
            duration: 0,
          };
    }
    if (isRevertingFromComplete) {
      actual = actual
        ? {
            start: actual.start,
            end: null,
            duration: 0,
          }
        : {
            start: Timestamp.now(),
            end: null,
            duration: 0,
          };
    }
    if (isMovingToBacklog) {
      planned = null;
      actual = null;
    } else if (isMovingToTodo) {
      actual = null;
      if (planned && isToday(planned.start as Timestamp)) {
        // console.log("today is within the planned date range");
      }
    }

    return await updateDoc(taskRef, {
      status: newStatus,
      planned,
      actual,
      statusHistory: history,
      progress,
    });
  } catch (error) {
    console.error("Error in updating a task:", error);
    throw error;
  }
};

export async function addTask(fields: TaskInputFields) {
  try {
    const { planned: p, actual: a, status } = fields;

    const isProgressCompleted =
      status === TS.IN_PROGRESS || status === TS.COMPLETED;

    const planned = p?.start
      ? {
          start: toTimestamp(p.start),
          end: p.end ? toTimestamp(p.end) : null,
        }
      : null;

    const actual = a?.start
      ? {
          start: toTimestamp(a.start),
          end: a.end ? toTimestamp(a.end) : null,
          duration:
            isProgressCompleted && a.end ? getDifference(a.end, a.start) : 0,
        }
      : null;

    return await addDoc(tasksRef, {
      ...fields,
      planned,
      actual,
    });
  } catch (error) {
    console.error("Error in adding a task:", error);
    throw error;
  }
}

export async function updateTask(taskId: string, fields: TaskInputFields) {
  try {
    const taskRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskRef);

    if (!taskSnap.exists()) {
      throw new Error("Task not found");
    }

    const taskData = taskSnap.data();

    const newStatus = fields.status as TS;
    const { statusHistory: currentHistory, title } = fields;

    const {
      status: prevStatus,
      actual: prevActual,
      planned: prevPlanned,
    } = taskData as Task;

    currentHistory.push({
      timestamp: Timestamp.now(),
      trigger: ActionTrigger.USER_DRAG,
      status: newStatus,
    });

    let progress = getProgress(newStatus);
    let planned = prevPlanned;
    let actual = prevActual;

    const isStarting =
      newStatus === TS.IN_PROGRESS && prevStatus !== TS.IN_PROGRESS;
    const isCompleting =
      newStatus === TS.COMPLETED && prevStatus !== TS.COMPLETED;
    const isRevertingFromComplete =
      prevStatus === TS.COMPLETED && newStatus !== TS.COMPLETED;
    const isMovingToBacklog =
      prevStatus !== TS.BACKLOG && newStatus === TS.BACKLOG;
    const isMovingToTodo = prevStatus !== TS.TODO && newStatus === TS.TODO;

    if (isStarting) {
      actual = {
        start: Timestamp.now(),
        end: null,
        duration: 0,
      };
    }
    if (isCompleting) {
      actual = actual
        ? {
            ...actual,
            end: Timestamp.now(),
            duration:
              Timestamp.now().seconds -
              (actual.start?.seconds || Timestamp.now().seconds),
          }
        : {
            start: Timestamp.now(),
            end: Timestamp.now(),
            duration: 0,
          };
    }
    if (isRevertingFromComplete) {
      actual = actual
        ? {
            start: actual.start,
            end: null,
            duration: 0,
          }
        : {
            start: Timestamp.now(),
            end: null,
            duration: 0,
          };
    }
    if (isMovingToBacklog) {
      planned = null;
      actual = null;
    } else if (isMovingToTodo) {
      actual = null;
      if (planned && isToday(planned.start as Timestamp)) {
        // console.log("today is within the planned date range");
      }
    }

    // console.log({
    //   status: newStatus,
    //   planned,
    //   actual,
    //   currentHistory,
    //   progress,
    // });

    return await updateDoc(taskRef, {
      title,
      status: newStatus,
      planned,
      actual,
      statusHistory: currentHistory,
      progress,
    });
    // return await updateDoc(tasksRef, {
    //   ...fields,
    //   planned,
    //   actual,
    // });
  } catch (error) {
    console.error("Error in adding a task:", error);
    throw error;
  }
}

export async function deleteTask(taskId: string) {
  try {
    const tasksRef = doc(db, "tasks", taskId);

    return await deleteDoc(tasksRef);
  } catch (error) {
    console.error("Error in deleting a task:", error);
    throw error;
  }
}
