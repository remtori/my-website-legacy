import { app, firebase } from './app';
import 'firebase/auth';
import store from '~/store';

export const auth = app.auth();

auth.onAuthStateChanged(u => u
	? u.getIdTokenResult()
		.then(getUserFromITR)
		.then(user => store.setState({ auth: user }))

	: store.setState({ auth: null }),
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
