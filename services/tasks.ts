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
import { TaskStatus } from "@/lib/constants";
import { convertToTimestamp } from "@/lib/helpers/date";

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
  callback: React.Dispatch<React.SetStateAction<Task[]>>
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
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
  const q = query(tasksRef);
  const unsub = subscribeToTasks(q, setTasks);

  return () => unsub();
}

export const afterDragUpdate = async (
  taskId: string,
  newStatus: TaskStatus
) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskRef);

    if (!taskSnap.exists()) {
      throw new Error("Task not found");
    }

    const taskData = taskSnap.data();

    const {
      current_status: prevStatus,
      timeline: { actualWorkPeriods: workPeriods, planned },
      statusHistory: history,
    } = taskData as Task;

    history.push({
      timestamp: Timestamp.now(),
      trigger: ActionTrigger.USER_DRAG,
      status: newStatus,
    });

    if (newStatus === "IN_PROGRESS" && prevStatus !== "IN_PROGRESS") {
      workPeriods.push({
        start: Timestamp.now(),
        end: null,
        duration: 0,
      });
    } else if (prevStatus === "IN_PROGRESS" && newStatus !== "IN_PROGRESS") {
      const activePeriod = workPeriods.findLast((p) => p.end === null);
      if (activePeriod && activePeriod.start) {
        activePeriod.end = Timestamp.now();
        activePeriod.duration = Date.now() / 1000 - activePeriod.start.seconds;
      }
    }

    const current_status = newStatus;
    await updateDoc(taskRef, {
      current_status,
      "timeline.actualWorkPeriods": workPeriods,
      "statusHistory": history,
    });
  } catch (error) {
    console.error("Error updating task", error);
  }
};

export async function addTask(fields: TaskInputFields) {
  try {
    const {
      timeline: { planned, actualWorkPeriods },
    } = fields;
    await addDoc(tasksRef, {
      ...fields,
      timeline: {
        planned: {
          start: planned?.start ? convertToTimestamp(planned?.start) : null,
          end: planned?.start ? convertToTimestamp(planned?.end) : null,
        },
        actualWorkPeriods,
      },
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function deleteTask(taskId: string) {
  try {
    const tasksRef = doc(db, "tasks", taskId);
    await deleteDoc(tasksRef);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
