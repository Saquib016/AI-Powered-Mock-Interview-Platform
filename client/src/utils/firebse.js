import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "rizqinterview.firebaseapp.com",
  projectId: "rizqinterview",
  storageBucket: "rizqinterview.firebasestorage.app",
  messagingSenderId: "476297149484",
  appId: "1:476297149484:web:3e0fa508ceb77bafcee589"
};
 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export{auth,provider}