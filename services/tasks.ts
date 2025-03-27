import { tasksCollection } from "@/config/firebase";
import { Task } from "@/types/task";
import { DocumentData, Query, getDocs } from "firebase/firestore";

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
