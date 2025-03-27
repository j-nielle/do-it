import { firestore, tasksCollection } from "@/config/firebase";
import { Task, UpdateTaskFields } from "@/types/task";
import {
  DocumentData,
  Query,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export async function index(query?: Query): Promise<Task[]> {
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

export async function updateTask(
  taskId: string,
  updatedFields: UpdateTaskFields
) {
  const taskRef = doc(firestore, "tasks", taskId);

  try {
    await updateDoc(taskRef, updatedFields);
    console.log("Task updated successfully");
  } catch (error) {
    console.error("Error updating task: ", error);
  }
}
