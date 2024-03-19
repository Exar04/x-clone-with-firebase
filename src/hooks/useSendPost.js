import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/authContext";
export const useSendPost = () => {
  const { currentUser } = useAuth();
  const postCollectionRef = collection(db, "posts");
  const sendPost = async (text) => {
    await addDoc(postCollectionRef, {
      userId: currentUser.uid,
      data: text,
      images: [],
      createdAt: serverTimestamp(),
    });
    alert("successfully sent post")
  };
  return { sendPost };
};
