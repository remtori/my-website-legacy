import app from './app';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import store from '~/store';
import { USER_SIGN_IN, USER_SIGN_OUT } from '~/ducks/auth';

export const auth = app.auth();

auth.onAuthStateChanged(u => u
	? u.getIdTokenResult()
		.then(getUserFromITR)
		.then(user => store.dispatch({ type: USER_SIGN_IN, user }))

	: store.dispatch({ type: USER_SIGN_OUT }),
);

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signIn = () => auth.signInWithPopup(googleProvider);
export const signOut = () => auth.signOut();

function getUserFromITR(r: firebase.auth.IdTokenResult): User
{
	return ({
		displayName: auth.currentUser!.displayName,
		photoURL: auth.currentUser!.photoURL,
		email: auth.currentUser!.email,
		uid: auth.currentUser!.uid,
		isStaff: r?.claims.staff || false,
		isAdmin: r?.claims.admin || false,
	}) as User;
}
