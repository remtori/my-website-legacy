import firebase from '../lib/firebase-init';
import 'firebase/auth';

const provider = new firebase.auth.GoogleAuthProvider();

export const isLoggedIn = _ => firebase.auth().currentUser.uid

export const doSignIn = _ => {
    return firebase.auth().signInWithPopup(provider)
        .then(
            _ => {
                const user = firebase.auth().currentUser;
                return {             
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    uid: user.uid,
                }
            },
            error => ({ error })
        );
}

export const doSignOut = _ => {
    return firebase.auth().signOut()
        .then(
            _ => ({}),
            error => ({ error })
        );
}