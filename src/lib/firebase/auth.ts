import { app, firebase } from './app';
import 'firebase/auth';

export const auth = app.auth();

const githubProvider = new firebase.auth.GithubAuthProvider();
export const signIn = () => auth.signInWithPopup(githubProvider);
export const signOut = () => auth.signOut();
