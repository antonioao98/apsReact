import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: 'AIzaSyB-FKvIm3k_spPvGXczO-121blEa8WvKrk',
  authDomain: 'appfirebase-6c4de.firebaseapp.com',
  databaseURL: 'https://appfirebase-6c4de-default-rtdb.firebaseio.com',
  projectId: 'appfirebase-6c4de',
  storageBucket: 'appfirebase-6c4de.appspot.com',
  messagingSenderId: '122024535089',
  appId: '1:122024535089:web:bf7b7964ed12bb958aa110',
  measurementId: 'G-H1V69J9MTF',
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
