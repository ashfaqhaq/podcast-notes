import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCZ1fNWeo_QnUMF5-UMyMZS9pfE-A02Vyo",
  authDomain: "watch-notes-f9e99.firebaseapp.com",
  projectId: "watch-notes-f9e99",
  storageBucket: "watch-notes-f9e99.appspot.com",
  messagingSenderId: "671071932576",
  appId: "1:671071932576:web:25228e7e5cf7125f1879c5",
  measurementId: "G-40YCD2R67V"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
window.firebase = firebaseApp
const auth = firebase.auth();
var storage = firebase.storage();
export { db, auth , storage };
