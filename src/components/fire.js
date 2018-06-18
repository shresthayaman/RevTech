import firebase from 'firebase';

const API_KEY = process.env.REACT_APP_API_KEY;
const SENDER_ID = process.env.REACT_APP_SENDER_ID;

const config = {
    apiKey: API_KEY,
    authDomain: "revtechconsulting.firebaseapp.com",
    databaseURL: "https://revtechconsulting.firebaseio.com",
    projectId: "revtechconsulting",
    storageBucket: "",
    messagingSenderId: SENDER_ID
};

const fire = firebase.initializeApp(config);
export default fire;