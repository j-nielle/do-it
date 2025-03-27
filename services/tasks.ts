import {
  DocumentData,
  Query,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, tasksCollection } from "@/config/firebase";
import { Task, TaskFields } from "@/types/task";

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

export async function updateTask(taskId: string, fields: TaskFields) {
  const taskRef = doc(db, "tasks", taskId);

  try {
    await updateDoc(taskRef, {
      ...fields,
      updatedAt: serverTimestamp(),
    });
    console.log("Task updated successfully");
  } catch (error) {
    console.error("Error updating task: ", error);
  }
}

export async function addTask(fields: TaskFields) {
  try {
    const tasksRef = collection(db, "tasks");
    const docRef = await addDoc(tasksRef, {
      ...fields,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
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
