import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDL-pRCDWW-FhvgJM0TWcNPEmL6WUmUa_o",
  authDomain: "membroscongregadosnext.firebaseapp.com",
  databaseURL: "https://membroscongregadosnext-default-rtdb.firebaseio.com",
  projectId: "membroscongregadosnext",
  storageBucket: "membroscongregadosnext.firebasestorage.app",
  messagingSenderId: "748612217876",
  appId: "1:748612217876:web:2f81ec8b559953e9fe4b01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };
