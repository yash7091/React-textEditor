


  import firebase from 'firebase';

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBgrG-xb3r56vtuod93VpWhlrdOV2djIL4",
  authDomain: "react-text-editor-a2f22.firebaseapp.com",
  projectId: "react-text-editor-a2f22",
  storageBucket: "react-text-editor-a2f22.appspot.com",
  messagingSenderId: "96217630819",
  appId: "1:96217630819:web:b3ddb20113e55441aa5056",
  measurementId: "G-2QN2JRWHH7"

   });
   export const db = firebaseApp.firestore();
   export const auth = firebase.auth();
   export default firebaseApp;