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
import { Task, TaskInputFields } from "@/types/task";
import { TaskStatus } from "@/lib/constants";
import { convertToTimestamp } from "@/lib/helpers/date";

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
  const q = query(collection(db, "tasks"));
  const unsub = subscribeToTasks(q, setTasks);

  return () => unsub();
}

export async function afterDragUpdate(
  taskId: string,
  status: TaskStatus,
  fields: Pick<Task, "duration" | "statusHistory">
) {
  try {
    const taskRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskRef);

    if (!taskSnap.exists()) {
      throw new Error("Task not found");
    }

    const taskData = taskSnap.data();
    const actualStart = taskData.duration.actual.start;
    const actualEnd = taskData.duration.actual.end;

    const {
      statusHistory,
      duration: { actual },
    } = fields;

    if (!actual) return;

    if (statusHistory && statusHistory.length > 0) {
      const recentStatus = statusHistory[statusHistory.length - 1].status;
      if (recentStatus !== status) {
        statusHistory?.push({
          timestamp: Timestamp.now(),
          status,
        });
      }
    }

    if (status === TaskStatus.IN_PROGRESS && !actualStart) {
      actual.start = Timestamp.now();
    } else if (status === TaskStatus.COMPLETED && !actualEnd) {
      const now = Timestamp.now();
      if (!actualStart) {
        actual.start = now;
      }
      actual.end = now;
    }

    await updateDoc(taskRef, fields);
  } catch (error) {
    console.error("Error updating task: ", error);
  }
}

export async function addTask(fields: TaskInputFields) {
  try {
    const tasksRef = collection(db, "tasks");
    const { statusHistory, duration } = fields;
    const { start, end } = duration.planned ?? { start: null, end: null };

    const recentStatus = statusHistory[statusHistory.length - 1].status;

    let actualStart = null;
    let actualEnd = null;

    if (recentStatus === TaskStatus.IN_PROGRESS) {
      actualStart = Timestamp.now();
    } else if (recentStatus === TaskStatus.COMPLETED) {
      actualStart = Timestamp.now();
      actualEnd = actualStart;
    }

    await addDoc(tasksRef, {
      ...fields,
      duration: {
        planned: {
          start: start ? convertToTimestamp(start) : null,
          end: end ? convertToTimestamp(end) : null,
        },
        actual: {
          start: actualStart,
          end: actualEnd,
        },
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
    console.log("Document deleted");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
