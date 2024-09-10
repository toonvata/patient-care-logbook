import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBjKHqXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "patient-care-logbook-XXXXX.firebaseapp.com",
  projectId: "patient-care-logbook-XXXXX",
  storageBucket: "patient-care-logbook-XXXXX.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "1:XXXXXXXXXXXX:web:XXXXXXXXXXXXXXXXXXXXXXXX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);