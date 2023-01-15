import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBPPoXaNq9xzDDkjkFjleiOZfWk9Mwt878",
  authDomain: "chat-app-4254b.firebaseapp.com",
  projectId: "chat-app-4254b",
  storageBucket: "chat-app-4254b.appspot.com",
  messagingSenderId: "240861791528",
  appId: "1:240861791528:web:47842f4f182e4ae820bc1d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)