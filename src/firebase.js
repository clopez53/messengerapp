import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRf8ig547l8poEmZIoUBjyPk_ZIt2dMrY",
    authDomain: "messenger-app-929f5.firebaseapp.com",
    databaseURL: "https://messenger-app-929f5.firebaseio.com",
    projectId: "messenger-app-929f5",
    storageBucket: "messenger-app-929f5.appspot.com",
    messagingSenderId: "378597220047",
    appId: "1:378597220047:web:2e77ec7295ca639940a1ba",
    measurementId: "G-J69HPLLSWJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;