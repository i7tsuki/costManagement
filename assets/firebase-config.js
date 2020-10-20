import Firebase from 'firebase'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbXZ6ATk8am-dmCxZDpMhVBdEgRLEHT3M",
  authDomain: "costmanagement-fff7d.firebaseapp.com",
  databaseURL: "https://costmanagement-fff7d.firebaseio.com",
  projectId: "costmanagement-fff7d",
  storageBucket: "costmanagement-fff7d.appspot.com",
  messagingSenderId: "300867361719",
  appId: "1:300867361719:web:721dd42a49deff95792632",
  measurementId: "G-QDH4C9DXD9"
};
// Initialize Firebase
if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig);
}


export default Firebase;