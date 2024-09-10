import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  // ตรงนี้คือ configuration ที่คุณได้อัปเดตแล้ว
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ฟังก์ชันสำหรับตรวจสอบการเชื่อมต่อ
export const checkFirebaseConnection = async () => {
  try {
    await db.collection('test').doc('test').set({ test: true });
    await db.collection('test').doc('test').delete();
    console.log('Firebase connection successful');
    return true;
  } catch (error) {
    console.error('Firebase connection failed:', error);
    return false;
  }
};

// Uncomment the line below if you want to use Firebase emulator
// connectFirestoreEmulator(db, 'localhost', 8080);