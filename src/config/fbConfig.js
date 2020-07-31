import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyB8y9zOAvp8FxC5xUzUXJaXviPMAWl1oK8",
  authDomain: "marioplan-app-9bfcc.firebaseapp.com",
  databaseURL: "https://marioplan-app-9bfcc.firebaseio.com",
  projectId: "marioplan-app-9bfcc",
  storageBucket: "marioplan-app-9bfcc.appspot.com",
  messagingSenderId: "747523256325",
  appId: "1:747523256325:web:184302a146f5c44d"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

const storage = firebase.storage();

export {
  storage, firebase as default
}
