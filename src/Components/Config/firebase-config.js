import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD-MdXG7MGe3a3CtlItZ2xFa4vuiL8OLFY",
    authDomain: "proshare-f25cd.firebaseapp.com",
    projectId: "proshare-f25cd",
    storageBucket: "proshare-f25cd.appspot.com",
    messagingSenderId: "641029913690",
    appId: "1:641029913690:web:10ba2a71928a1dbd146c63",
    measurementId: "G-0NGS2C229G"
  };
  
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;