import app from './app';
import 'firebase/auth';
import * as firebase from 'firebase/app';

export const auth = app.auth();

export interface IUser {
	displayName: string;
	isStaff: boolean;
	isAdmin: boolean;
	photoURL: string;
	uid: string;
	email: string;
	emailVerified: boolean;
}

const googleProvider = new firebase.auth.GoogleAuthProvider();
export function signInWithGoogle()
{
	return auth.signInWithPopup(googleProvider);
}

export function signOut()
{
	return auth.signOut();
}
