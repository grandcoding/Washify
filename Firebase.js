import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyV7xJejw3wZ46h1jL7WF2zrv8vsRet4c",
  authDomain: "laundry-application-76b18.firebaseapp.com",
  projectId: "laundry-application-76b18",
  storageBucket: "laundry-application-76b18.appspot.com",
  messagingSenderId: "883004945823",
  appId: "1:883004945823:web:aaa082c7ab86f9530db9aa",
  measurementId: "G-ZBYZ7QC1B6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app); //setting authentication
const db = getFirestore(); //setting database
export { auth, db };