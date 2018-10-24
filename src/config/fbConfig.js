import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'



// Initialize Firebase
var config = {
  apiKey: "AIzaSyB0xS8hCnmyGQcYM53T_bB3MUHPndZshUs",
  authDomain: "dp-portfolio.firebaseapp.com",
  databaseURL: "https://dp-portfolio.firebaseio.com",
  projectId: "dp-portfolio",
  storageBucket: "dp-portfolio.appspot.com",
  messagingSenderId: "679574357287"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 
