// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDvAU1VKmeJqtPTXmzUoRnc-SIayyblBOA',
  authDomain: 'react-curso-173b2.firebaseapp.com',
  projectId: 'react-curso-173b2',
  storageBucket: 'react-curso-173b2.appspot.com',
  messagingSenderId: '401174126646',
  appId: '1:401174126646:web:b0db88720b38f6d705b897',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
