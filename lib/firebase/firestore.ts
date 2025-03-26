import { firestore } from "@/config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// TODO: test these functions

export const addTasks = async () => {
  try {
    const docRef = await addDoc(collection(firestore, "tasks"), {
      id: 1,
      title: "Lovelace",
      description: "asdasd",
      status: "DONE",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getTasks = async () => {
  const querySnapshot = await getDocs(collection(firestore, "tasks"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};
