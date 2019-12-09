import firebase from 'firebase/app';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBOa2JE6cWwrN-5NgiTItXTkP3a47w7xVs",
    databaseURL: "https://lqv-remtori.firebaseio.com",
    storageBucket: "lqv-remtori.appspot.com",
    authDomain: "lqv-remtori.firebaseapp.com",
    messagingSenderId: "363928283563",
    projectId: "lqv-remtori"
});

window.firebase = app;

export default app;