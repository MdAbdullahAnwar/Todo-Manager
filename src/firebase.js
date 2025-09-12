import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCNim_Z7mWfWJKn1a6z51L_GQfLQmudHI",
  authDomain: "todomanager-98de9.firebaseapp.com",
  projectId: "todomanager-98de9",
  storageBucket: "todomanager-98de9.firebasestorage.app",
  messagingSenderId: "167518125103",
  appId: "1:167518125103:web:5514b0fbf5728865f6dada"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
