import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBWQD11b6zEo-RlkSSCONZdXGkhw_CddLo",
  authDomain: "todoist-clonecoding-reacthooks.firebaseapp.com",
  databaseURL: "https://todoist-clonecoding-reacthooks.firebaseio.com",
  projectId: "todoist-clonecoding-reacthooks",
  storageBucket: "todoist-clonecoding-reacthooks.appspot.com",
  messagingSenderId: "497804591546",
  appId: "1:497804591546:web:0b274ffc52a0df1def9d83",
  measurementId: "G-9KE2F36MTE",
});

export { firebaseConfig as firebase };
